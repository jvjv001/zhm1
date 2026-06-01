import React, { useState, useEffect, useRef } from 'react';
import { courseContent, projectsData, questionBank } from '../data';
import { useLearningStore } from '../store/useLearningStore';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  
  return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
};

const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes}分钟`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}小时${mins}分钟` : `${hours}小时`;
};

const groupActivitiesByDate = (activities) => {
  const grouped = {};
  activities.forEach(activity => {
    const date = new Date(activity.timestamp).toLocaleDateString('zh-CN');
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(activity);
  });
  return grouped;
};

export const Profile = () => {
  const {
    userName,
    setUserName,
    userAvatar,
    setUserAvatar,
    completedCourses,
    completedProjects,
    quizScores,
    consecutiveDays,
    totalStudyMinutes,
    getAchievements,
    resetProgress,
    exportLearningData,
    activityLog
  } = useLearningStore();

  const fileInputRef = useRef(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [notification, setNotification] = useState(null);
  const [prevUnlockedBadges, setPrevUnlockedBadges] = useState([]);

  const achievements = getAchievements();
  
  const courseProgress = Math.round((completedCourses.length / courseContent.length) * 100);
  const projectProgress = Math.round((completedProjects.length / projectsData.length) * 100);
  
  const quizScoresList = Object.values(quizScores);
  const averageQuizScore = quizScoresList.length > 0
    ? Math.round(quizScoresList.reduce((sum, s) => sum + s.score, 0) / quizScoresList.length)
    : 0;

  // 检测新解锁的徽章
  useEffect(() => {
    const currentlyUnlocked = achievements.filter(b => b.unlocked).map(b => b.id);
    
    if (prevUnlockedBadges.length > 0) {
      const newBadges = currentlyUnlocked.filter(id => !prevUnlockedBadges.includes(id));
      if (newBadges.length > 0) {
        const newBadge = achievements.find(b => b.id === newBadges[0]);
        if (newBadge) {
          showBadgeNotification(newBadge);
        }
      }
    }
    
    setPrevUnlockedBadges(currentlyUnlocked);
  }, [completedCourses, completedProjects, quizScores]);

  const showBadgeNotification = (badge) => {
    setNotification(badge);
    setTimeout(() => setNotification(null), 5000);
  };

  const getBadgeGradient = (color) => {
    switch(color) {
      case 'gold':
        return 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)';
      case 'silver':
        return 'linear-gradient(135deg, #c0c0c0 0%, #a0a0a0 100%)';
      case 'bronze':
        return 'linear-gradient(135deg, #cd7f32 0%, #b8860b 100%)';
      case 'purple':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      default:
        return 'linear-gradient(135deg, #888 0%, #666 100%)';
    }
  };

  const getActivityTitle = (activity) => {
    if (activity.type === 'course') {
      const course = courseContent.find(c => c.id === activity.topicId);
      return course ? course.title : activity.topicId;
    } else if (activity.type === 'project') {
      const project = projectsData.find(p => p.id === activity.projectId);
      return project ? project.title : activity.projectId;
    } else if (activity.type === 'quiz') {
      const course = courseContent.find(c => c.id === activity.topicId);
      return course ? course.title : activity.topicId;
    }
    return activity.title;
  };

  const getActivityIcon = (activity) => {
    if (activity.type === 'course') return '📚';
    if (activity.type === 'project') return '💻';
    if (activity.type === 'quiz') return '📝';
    return '📋';
  };

  const getActivityDescription = (activity) => {
    if (activity.type === 'course') return '完成课程';
    if (activity.type === 'project') return '完成项目';
    if (activity.type === 'quiz') return `完成测验，得分 ${activity.score}分`;
    return '学习活动';
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportJSON = () => {
    const data = exportLearningData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `panda-learn-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    const reportContent = generatePDFReport();
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `panda-learn-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generatePDFReport = () => {
    const achievements = getAchievements();
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    
    let report = '═══════════════════════════════════════\n';
    report += '       Pandas数据分析学习平台 - 学习报告\n';
    report += '═══════════════════════════════════════\n\n';
    report += `导出时间：${new Date().toLocaleString('zh-CN')}\n\n`;
    
    report += '【基本信息】\n';
    report += `学生姓名：${userName}\n`;
    report += `学习天数：${consecutiveDays}天\n`;
    report += `总学习时长：${formatDuration(totalStudyMinutes)}\n`;
    report += `首次学习日期：${firstStudyDate || '暂无'}\n`;
    report += `最后学习日期：${lastStudyDate || '暂无'}\n\n`;
    
    report += '【学习进度】\n';
    report += `课程完成：${completedCourses.length}/${courseContent.length} (${courseProgress}%)\n`;
    report += `项目完成：${completedProjects.length}/${projectsData.length} (${projectProgress}%)\n`;
    report += `测验平均分：${averageQuizScore}分\n\n`;
    
    report += '【成就徽章】\n';
    report += `已解锁：${unlockedCount}/${achievements.length}\n`;
    achievements.forEach(badge => {
      report += `${badge.unlocked ? '✓' : '○'} ${badge.icon} ${badge.name}\n`;
    });
    report += '\n';
    
    report += '【已完成课程】\n';
    if (completedCourses.length === 0) {
      report += '暂无\n';
    } else {
      completedCourses.forEach(id => {
        const course = courseContent.find(c => c.id === id);
        if (course) report += `• ${course.title}\n`;
      });
    }
    report += '\n';
    
    report += '【已完成项目】\n';
    if (completedProjects.length === 0) {
      report += '暂无\n';
    } else {
      completedProjects.forEach(id => {
        const project = projectsData.find(p => p.id === id);
        if (project) report += `• ${project.icon} ${project.title}\n`;
      });
    }
    report += '\n';
    
    report += '【测验成绩】\n';
    if (quizScoresList.length === 0) {
      report += '暂无\n';
    } else {
      Object.entries(quizScores).forEach(([topicId, data]) => {
        const course = courseContent.find(c => c.id === topicId);
        const title = course ? course.title : topicId;
        report += `• ${title}：${data.score}分\n`;
      });
    }
    report += '\n';
    
    report += '═══════════════════════════════════════\n';
    report += '           感谢使用 Pandas学习平台！\n';
    report += '═══════════════════════════════════════\n';
    
    return report;
  };

  const handleResetProgress = () => {
    if (confirm('确定要重置所有学习进度吗？此操作不可撤销！')) {
      resetProgress();
      setShowResetConfirm(false);
      alert('学习进度已重置！');
    }
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setIsEditingName(false);
    }
  };

  const groupedActivities = groupActivitiesByDate(activityLog);
  const firstStudyDate = useLearningStore.getState().firstStudyDate;
  const lastStudyDate = useLearningStore.getState().lastStudyDate;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* 徽章解锁通知 */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '20px 24px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
          zIndex: 1000,
          animation: 'slideIn 0.5s ease-out',
          maxWidth: '350px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <span style={{ fontSize: '32px' }}>{notification.icon}</span>
            <div>
              <div style={{
                fontSize: '14px',
                opacity: 0.9,
                marginBottom: '2px'
              }}>
                🎉 恭喜解锁新徽章！
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 700
              }}>
                {notification.name}
              </div>
            </div>
          </div>
          <div style={{
            fontSize: '13px',
            opacity: 0.9,
            paddingLeft: '44px'
          }}>
            {notification.description}
          </div>
        </div>
      )}
      
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
          {/* 头像区域 */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: userAvatar 
                  ? `url(${userAvatar}) center/cover` 
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '56px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'transform 0.3s ease',
                border: '4px solid white'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {!userAvatar && '🐼'}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              style={{ display: 'none' }}
            />
            <div style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              border: '2px solid white'
            }}>
              📷
            </div>
          </div>

          <div style={{ flex: 1 }}>
            {isEditingName ? (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    fontSize: '20px',
                    fontWeight: 600,
                    border: '2px solid #667eea',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleSaveName}
                  style={{ padding: '8px 16px' }}
                >
                  保存
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsEditingName(false);
                    setTempName(userName);
                  }}
                  style={{ padding: '8px 16px' }}
                >
                  取消
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ color: '#333', margin: 0 }}>{userName}</h2>
                <button
                  onClick={() => setIsEditingName(true)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    padding: '4px'
                  }}
                >
                  ✏️
                </button>
              </div>
            )}
            <p style={{ color: '#666', marginTop: '8px', fontSize: '14px' }}>
              数据分析学习达人
            </p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{
                padding: '8px 16px',
                background: '#f3e5f5',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#667eea' }}>
                  {consecutiveDays}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>连续学习天数</div>
              </div>
              <div style={{
                padding: '8px 16px',
                background: '#e3f2fd',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#1976d2' }}>
                  {formatDuration(totalStudyMinutes)}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>总学习时长</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="card">
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>📚 课程进度</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#667eea', marginBottom: '8px' }}>
            {completedCourses.length}/{courseContent.length}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${courseProgress}%` }} />
          </div>
          <div style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>
            {courseProgress}% 已完成
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>💻 项目进度</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#667eea', marginBottom: '8px' }}>
            {completedProjects.length}/{projectsData.length}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${projectProgress}%` }} />
          </div>
          <div style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>
            {projectProgress}% 已完成
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>📝 测验成绩</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: averageQuizScore >= 80 ? '#4caf50' : averageQuizScore >= 60 ? '#ff9800' : '#f44336', marginBottom: '8px' }}>
            {averageQuizScore}分
          </div>
          <div style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>
            完成 {quizScoresList.length}/{questionBank.length} 个测验
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ color: '#333', marginBottom: '20px' }}>🏆 获得徽章</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {achievements.map((badge, i) => (
            <div
              key={badge.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 20px',
                borderRadius: '12px',
                background: badge.unlocked 
                  ? getBadgeGradient(badge.color)
                  : 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
                color: badge.unlocked ? 'white' : '#666',
                minWidth: '140px',
                textAlign: 'center',
                boxShadow: badge.unlocked 
                  ? '0 4px 16px rgba(0,0,0,0.2)'
                  : '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (badge.unlocked) {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {!badge.unlocked && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  fontSize: '14px',
                  opacity: 0.6
                }}>
                  🔒
                </div>
              )}
              <span style={{
                fontSize: '36px',
                filter: badge.unlocked ? 'none' : 'grayscale(100%)',
                opacity: badge.unlocked ? 1 : 0.5
              }}>
                {badge.icon}
              </span>
              <div style={{
                fontWeight: 600,
                fontSize: '14px'
              }}>
                {badge.name}
              </div>
              <div style={{
                fontSize: '11px',
                opacity: 0.8,
                lineHeight: 1.4
              }}>
                {badge.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ color: '#333', marginBottom: '20px' }}>📋 学习历史</h3>
        
        {activityLog.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📚</div>
            <p style={{ fontSize: '16px' }}>还没有学习记录</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>开始学习后，这里将显示您的学习历程</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {Object.entries(groupedActivities).map(([date, activities]) => (
              <div key={date}>
                <h4 style={{ 
                  color: '#667eea', 
                  marginBottom: '12px', 
                  fontSize: '15px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #667eea'
                }}>
                  📅 {date}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #e9ecef'
                      }}
                    >
                      <span style={{ fontSize: '24px' }}>
                        {getActivityIcon(activity)}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: '#333', marginBottom: '2px' }}>
                          {getActivityTitle(activity)}
                        </div>
                        <div style={{ fontSize: '13px', color: '#666' }}>
                          {getActivityDescription(activity)}
                        </div>
                      </div>
                      <div style={{ fontSize: '12px', color: '#999' }}>
                        {new Date(activity.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h3 style={{ color: '#333', marginBottom: '20px' }}>⚙️ 数据管理</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary"
            onClick={handleExportJSON}
          >
            📤 导出JSON报告
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleExportPDF}
          >
            📄 导出文本报告
          </button>
          <button
            onClick={() => setShowResetConfirm(true)}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              background: '#feebee',
              color: '#c62828'
            }}
          >
            🗑️ 重置学习进度
          </button>
        </div>
        {showResetConfirm && (
          <div style={{
            marginTop: '16px',
            padding: '16px',
            background: '#fff3cd',
            borderRadius: '8px',
            border: '1px solid #ffc107'
          }}>
            <p style={{ marginBottom: '12px', color: '#856404' }}>
              ⚠️ 确定要重置所有学习进度吗？此操作将删除所有学习记录，不可恢复！
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                className="btn btn-primary"
                onClick={handleResetProgress}
              >
                确定重置
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowResetConfirm(false)}
              >
                取消
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
