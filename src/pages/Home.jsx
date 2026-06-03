import React, { useState } from 'react';
import { courseContent } from '../data';

export const Home = ({ setActivePage }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  // 热门项目数据
  const popularProjects = [
    {
      id: 1,
      title: '猜数字小游戏',
      description: '学习随机数生成和条件判断',
      icon: '🎲',
      difficulty: '入门'
    },
    {
      id: 2,
      title: '排行榜排序实现',
      description: '掌握多条件排序算法',
      icon: '🏆',
      difficulty: '初级'
    },
    {
      id: 3,
      title: '日历生成工具',
      description: '日期计算与格式化输出',
      icon: '📅',
      difficulty: '初级'
    }
  ];

  // 平台特色
  const features = [
    {
      icon: '📖',
      title: '完整课程体系',
      description: '12个知识点，从入门到进阶',
      color: '#667eea'
    },
    {
      icon: '💻',
      title: '10个实战项目',
      description: '真实数据集，边学边练',
      color: '#764ba2'
    },
    {
      icon: '⚡',
      title: '在线代码运行',
      description: '无需安装，浏览器直接运行Python',
      color: '#f093fb'
    },
    {
      icon: '📝',
      title: '练习测评系统',
      description: '每章配套练习，巩固知识点',
      color: '#4facfe'
    }
  ];

  // 学习数据
  const stats = [
    { number: '12', label: '知识点', suffix: '个' },
    { number: '10', label: '编程项目', suffix: '个' },
    { number: '120', label: '练习题', suffix: '+道' }
  ];

  return (
    <div style={styles.container}>
      {/* Hero区域 */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>商务数据分析在线教育平台</h1>
          <p style={styles.heroSubtitle}>从零开始，掌握Pandas数据分析核心技能</p>
          <div style={styles.heroButtons}>
            <button
              onClick={() => setActivePage('course')}
              style={styles.primaryButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
              }}
            >
              开始学习
            </button>
            <button
              onClick={() => setActivePage('projects')}
              style={styles.secondaryButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }}
            >
              查看项目
            </button>
          </div>
        </div>
        <div style={styles.heroDecoration}>
          <div style={styles.decorativeCircle1}></div>
          <div style={styles.decorativeCircle2}></div>
          <div style={styles.decorativeCircle3}></div>
        </div>
      </section>

      {/* 平台特色 */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>平台特色</h2>
        <div style={styles.featureGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
              }}
            >
              <div style={{
                ...styles.featureIcon,
                background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}99 100%)`
              }}>
                {feature.icon}
              </div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 学习数据统计 */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statItem}>
              <div style={styles.statNumber}>{stat.number}<span style={styles.statSuffix}>{stat.suffix}</span></div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 热门项目预览 */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>热门项目</h2>
        <div style={styles.projectGrid}>
          {popularProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              style={{
                ...styles.projectCard,
                ...(selectedProject?.id === project.id ? styles.projectCardActive : {})
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 16px 50px rgba(102, 126, 234, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
              }}
            >
              <div style={styles.projectIcon}>{project.icon}</div>
              <h3 style={styles.projectTitle}>{project.title}</h3>
              <p style={styles.projectDesc}>{project.description}</p>
              <span style={styles.projectDifficulty}>{project.difficulty}</span>
            </div>
          ))}
        </div>
        
        {/* 项目详情面板 */}
        {selectedProject && (
          <div style={styles.projectDetailPanel}>
            <div style={styles.projectDetailHeader}>
              <div style={styles.projectDetailIcon}>{selectedProject.icon}</div>
              <div style={styles.projectDetailTitleArea}>
                <h2 style={styles.projectDetailTitle}>{selectedProject.title}</h2>
                <span style={styles.projectDetailDifficulty}>{selectedProject.difficulty}</span>
              </div>
            </div>
            <p style={styles.projectDetailDesc}>{selectedProject.description}</p>
            <div style={styles.projectDetailActions}>
              <button
                onClick={() => setActivePage('projects')}
                style={styles.projectDetailButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.2)';
                }}
              >
                查看完整项目 →
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                style={styles.projectDetailCloseButton}
              >
                关闭
              </button>
            </div>
          </div>
        )}
        
        <div style={styles.viewMoreContainer}>
          <button
            onClick={() => setActivePage('projects')}
            style={styles.viewMoreButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.2)';
            }}
          >
            查看全部项目 →
          </button>
        </div>
      </section>

      {/* 底部间距 */}
      <div style={{ height: '60px' }}></div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f8f9fc'
  },
  // Hero区域
  hero: {
    position: 'relative',
    padding: '80px 24px 100px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #9b59b6 100%)',
    overflow: 'hidden'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2
  },
  heroTitle: {
    fontSize: 'clamp(32px, 5vw, 52px)',
    fontWeight: 700,
    color: 'white',
    marginBottom: '20px',
    lineHeight: 1.3,
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  },
  heroSubtitle: {
    fontSize: 'clamp(18px, 3vw, 24px)',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '40px',
    fontWeight: 400
  },
  heroButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  primaryButton: {
    padding: '16px 40px',
    background: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
  },
  secondaryButton: {
    padding: '16px 40px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  heroDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  decorativeCircle1: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    top: '-100px',
    right: '-50px'
  },
  decorativeCircle2: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.08)',
    bottom: '-50px',
    left: '10%'
  },
  decorativeCircle3: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)',
    top: '50%',
    left: '5%'
  },
  // 通用section
  section: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 24px'
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#333',
    textAlign: 'center',
    marginBottom: '40px'
  },
  // 平台特色
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px'
  },
  featureCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '32px 24px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    cursor: 'default'
  },
  featureIcon: {
    width: '72px',
    height: '72px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    margin: '0 auto 20px'
  },
  featureTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#333',
    marginBottom: '8px'
  },
  featureDesc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.6
  },
  // 学习数据统计
  statsSection: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '50px 24px',
    margin: '20px 0'
  },
  statsContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '30px',
    textAlign: 'center'
  },
  statItem: {
    color: 'white'
  },
  statNumber: {
    fontSize: 'clamp(36px, 5vw, 48px)',
    fontWeight: 700,
    lineHeight: 1.2
  },
  statSuffix: {
    fontSize: 'clamp(20px, 3vw, 28px)'
  },
  statLabel: {
    fontSize: '16px',
    opacity: 0.9,
    marginTop: '8px'
  },
  // 热门项目
  projectGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px'
  },
  projectCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '32px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
  },
  projectCardActive: {
    border: '3px solid #667eea',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)'
  },
  projectIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  projectTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#333',
    marginBottom: '8px'
  },
  projectDesc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.6,
    marginBottom: '16px'
  },
  projectDifficulty: {
    display: 'inline-block',
    padding: '4px 12px',
    background: '#f3e5f5',
    color: '#764ba2',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500
  },
  // 项目详情面板
  projectDetailPanel: {
    marginTop: '32px',
    background: 'white',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 8px 40px rgba(102, 126, 234, 0.15)',
    border: '2px solid #667eea'
  },
  projectDetailHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px'
  },
  projectDetailIcon: {
    fontSize: '56px',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px'
  },
  projectDetailTitleArea: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  },
  projectDetailTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#333',
    margin: 0
  },
  projectDetailDifficulty: {
    padding: '6px 16px',
    background: '#f3e5f5',
    color: '#764ba2',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 600
  },
  projectDetailDesc: {
    fontSize: '16px',
    color: '#666',
    lineHeight: 1.8,
    marginBottom: '24px'
  },
  projectDetailActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  projectDetailButton: {
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)'
  },
  projectDetailCloseButton: {
    padding: '14px 32px',
    background: '#f5f5f5',
    color: '#666',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  viewMoreContainer: {
    textAlign: 'center',
    marginTop: '40px'
  },
  viewMoreButton: {
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)'
  }
};
