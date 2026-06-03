import React, { useState, useEffect, useRef } from 'react';
import { courseContent } from '../data';
import { useLearningStore } from '../store/useLearningStore';

export const CourseLearning = ({ onNavigateToProjects }) => {
  const [selectedTopic, setSelectedTopic] = useState(courseContent[0]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [expandedExplanations, setExpandedExplanations] = useState({});
  const [showQuickNav, setShowQuickNav] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [runningCode, setRunningCode] = useState(null);
  const [consoleContent, setConsoleContent] = useState([]);
  const [consoleExpanded, setConsoleExpanded] = useState(false);
  const [explanationModal, setExplanationModal] = useState({ isOpen: false, example: null });
  const [toast, setToast] = useState({ show: false, message: '' });
  const codeRefs = useRef([]);
  const contentRef = useRef(null);
  const codeExamplesRef = useRef([]);

  // Toast 显示函数
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2000);
  };

  // 每个知识点的独立进度数据
  const [topicProgress, setTopicProgress] = useState(() => {
    const saved = localStorage.getItem('pandas_topic_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const { 
    completedCourses, 
    markCourseComplete, 
    quizAnswers, 
    saveQuizAnswer,
    clearTopicAnswers,
    addActivity
  } = useLearningStore();

  const isCompleted = (topicId) => completedCourses.includes(topicId);

  // 获取指定知识点的进度
  const getTopicSteps = (topicId) => {
    return topicProgress[topicId] || {
      step1_theory: false,  // 看过理论
      step2_code: false,    // 运行过代码
      step3_quiz: false     // 完成练习
    };
  };

  // 更新指定知识点的进度
  const updateTopicStep = (topicId, stepKey, value) => {
    const newProgress = {
      ...topicProgress,
      [topicId]: {
        ...getTopicSteps(topicId),
        [stepKey]: value
      }
    };
    setTopicProgress(newProgress);
    localStorage.setItem('pandas_topic_progress', JSON.stringify(newProgress));
  };

  // 计算指定知识点的进度百分比
  const getTopicProgressPercentage = (topicId) => {
    const steps = getTopicSteps(topicId);
    const completedCount = Object.values(steps).filter(Boolean).length;
    return Math.round((completedCount / 3) * 100);
  };

  const getTopicAnswers = (topicId) => {
    return quizAnswers[topicId] || {};
  };

  const handleMarkComplete = () => {
    if (!isCompleted(selectedTopic.id)) {
      markCourseComplete(selectedTopic.id);
      addActivity({
        type: 'course',
        action: 'complete',
        topicId: selectedTopic.id,
        title: selectedTopic.title
      });
    }
  };

  const handleResetQuiz = () => {
    if (confirm('确定要重置本章节的所有答题记录吗？')) {
      clearTopicAnswers(selectedTopic.id);
      // 重置后也要重置练习进度
      updateTopicStep(selectedTopic.id, 'step3_quiz', false);
    }
  };

  const getTopicProgress = () => {
    const answers = getTopicAnswers(selectedTopic.id);
    const totalQuestions = selectedTopic.questions.length;
    const answeredQuestions = Object.keys(answers).length;
    const correctCount = Object.values(answers).filter(a => a.isCorrect).length;
    
    return {
      total: totalQuestions,
      answered: answeredQuestions,
      correct: correctCount,
      percentage: totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0
    };
  };

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(index);
      showToast('✅ 已复制');
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleOpenInEditor = () => {
    if (onNavigateToProjects) {
      onNavigateToProjects();
    }
  };

  const simulatePandasOutput = (code) => {
    const outputs = [];
    
    if (code.includes('pd.Series')) {
      outputs.push('>>> 执行代码...');
      outputs.push('>>> 创建 Series 对象');
      if (code.includes('index=[')) {
        outputs.push('0    100');
        outputs.push('1    200');
        outputs.push('2    150');
        outputs.push('3    250');
      } else {
        outputs.push('0    100');
        outputs.push('1    200');
        outputs.push('2    150');
        outputs.push('3    250');
      }
      outputs.push('Name: 销量, dtype: int64');
    } else if (code.includes('pd.DataFrame')) {
      outputs.push('>>> 执行代码...');
      outputs.push('>>> 创建 DataFrame 对象');
      outputs.push('   产品    销量    价格');
      outputs.push('0  苹果   120    5.5');
      outputs.push('1  香蕉   200    3.2');
      outputs.push('2  橙子   150    4.8');
    } else if (code.includes('print')) {
      if (code.includes('销量')) {
        outputs.push('销量数据:');
        outputs.push('0    120');
        outputs.push('1    200');
        outputs.push('2    150');
        outputs.push('Name: 销量, dtype: int64');
      } else if (code.includes('产品')) {
        outputs.push('产品数据:');
        outputs.push('     产品    销量    价格');
        outputs.push('0   苹果   120    5.5');
        outputs.push('1   香蕉   200    3.2');
        outputs.push('2   橙子   150    4.8');
      } else {
        outputs.push('Hello World!');
      }
    } else if (code.includes('groupby')) {
      outputs.push('>>> 执行分组操作...');
      outputs.push('>>> 按门店分组');
      outputs.push('门店    销售额');
      outputs.push('北京店   2700');
      outputs.push('上海店   1700');
      outputs.push('广州店   1500');
    } else if (code.includes('plot')) {
      outputs.push('>>> 生成图表...');
      outputs.push('>>> 图表类型: line');
      outputs.push('>>> 图表显示在浏览器中');
    } else {
      outputs.push('>>> 代码执行完成！');
      outputs.push('>>> 这是模拟输出，实际运行请在本地 Python 环境中执行');
    }
    
    return outputs;
  };

  const handleRunCode = (example, index) => {
    setRunningCode(index);
    
    // 标记当前知识点的步骤2完成（运行过代码）
    const currentSteps = getTopicSteps(selectedTopic.id);
    if (!currentSteps.step2_code) {
      updateTopicStep(selectedTopic.id, 'step2_code', true);
    }
    
    const newConsoleEntries = [
      { type: 'command', content: '>>> 开始执行代码...' },
      { type: 'code', content: example.code },
      { type: 'separator', content: '═══════════════════════════' },
    ];
    
    setTimeout(() => {
      const simulatedOutput = simulatePandasOutput(example.code);
      
      simulatedOutput.forEach(line => {
        newConsoleEntries.push({ type: 'output', content: line });
      });
      
      newConsoleEntries.push({ type: 'success', content: '>>> 执行成功！' });
      
      setConsoleContent(prev => [...prev, ...newConsoleEntries]);
      setConsoleExpanded(true);
      setRunningCode(null);
      showToast('▶️ 代码运行成功');
      
      addActivity({
        type: 'code',
        action: 'run',
        topicId: selectedTopic.id,
        title: example.title || '代码示例'
      });
    }, 800);
  };

  const handleClearConsole = () => {
    setConsoleContent([]);
  };

  const handleOpenExplanation = (example) => {
    setExplanationModal({ isOpen: true, example });
  };

  const handleCloseExplanation = () => {
    setExplanationModal({ isOpen: false, example: null });
  };

  const toggleExplanation = (index) => {
    setExpandedExplanations(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setShowQuickNav(false);
      setSidebarOpen(false);
    }
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setExpandedExplanations({});
    setSidebarOpen(false);
  };

  const quickNavItems = [
    { id: 'objectives', label: '🎯 学习目标', icon: '🎯' },
    { id: 'content', label: '📚 详细讲解', icon: '📖' },
    { id: 'code-examples', label: '💻 代码示例', icon: '💻' },
    { id: 'quiz', label: '📝 练习题', icon: '📝' }
  ];

  // 获取当前知识点的步骤状态
  const currentSteps = getTopicSteps(selectedTopic.id);

  // 标记理论步骤完成 - 当用户停留在知识点页面时自动记录
  useEffect(() => {
    if (!currentSteps.step1_theory) {
      updateTopicStep(selectedTopic.id, 'step1_theory', true);
    }
  }, [selectedTopic.id]);

  // 代码高亮初始化和更新
  useEffect(() => {
    if (window.hljs) {
      // 初始化 highlight.js
      window.hljs.highlightAll();
    }
  }, [selectedTopic, explanationModal.isOpen]);

  const progress = getTopicProgress();

  return (
    <>
      {/* 汉堡菜单按钮 */}
      <button
        className={`hamburger-menu ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="切换菜单"
      >
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* 侧边栏遮罩 */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="two-columns" ref={contentRef}>
        {/* 左侧目录 */}
        <div className={`card ${sidebarOpen ? 'open' : ''}`} style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '16px', color: '#333' }}>📚 课程目录</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {courseContent.map((topic, index) => {
              const topicSteps = getTopicSteps(topic.id);
              const completedCount = Object.values(topicSteps).filter(Boolean).length;
              const topicPercentage = Math.round((completedCount / 3) * 100);

              return (
                <button
                  key={topic.id}
                  id={`topic-${topic.id}`}
                  onClick={() => handleTopicSelect(topic)}
                  style={{
                    padding: '12px 16px',
                    border: 'none',
                    borderRadius: '8px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    background: selectedTopic.id === topic.id 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : isCompleted(topic.id) ? '#e8f5e9' : '#f5f5f5',
                    color: selectedTopic.id === topic.id ? 'white' : '#333',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{isCompleted(topic.id) ? '✅' : `${index + 1}.`}</span>
                    <span style={{ flex: 1 }}>{topic.title}</span>
                    {completedCount > 0 && (
                      <span style={{
                        fontSize: '11px',
                        padding: '2px 6px',
                        background: selectedTopic.id === topic.id ? 'rgba(255,255,255,0.3)' : '#667eea',
                        color: selectedTopic.id === topic.id ? 'white' : 'white',
                        borderRadius: '10px'
                      }}>
                        {topicPercentage}%
                      </span>
                    )}
                  </div>
                  {completedCount > 0 && (
                    <div style={{
                      height: '4px',
                      background: selectedTopic.id === topic.id ? 'rgba(255,255,255,0.3)' : '#e0e0e0',
                      borderRadius: '2px',
                      marginTop: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${topicPercentage}%`,
                        height: '100%',
                        background: selectedTopic.id === topic.id ? 'white' : '#667eea',
                        borderRadius: '2px',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  )}
                  {Object.keys(quizAnswers[topic.id] || {}).length > 0 && (
                    <div style={{ fontSize: '11px', opacity: 0.8, paddingLeft: '24px' }}>
                      {Object.values(quizAnswers[topic.id]).filter(a => a.isCorrect).length}/{topic.questions.length} 题已做对
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 右侧内容 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {selectedTopic && (
            <>
              {/* 面包屑导航 */}
              <div className="card">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#666',
                  flexWrap: 'wrap'
                }}>
                  <span 
                    style={{ cursor: 'pointer', color: '#667eea' }}
                    onClick={() => {}}
                  >
                    首页
                  </span>
                  <span style={{ color: '#ccc' }}>›</span>
                  <span style={{ color: '#667eea' }}>课程学习</span>
                  <span style={{ color: '#ccc' }}>›</span>
                  <span style={{ fontWeight: 500, color: '#333' }}>
                    {selectedTopic.title}
                  </span>
                </div>
              </div>

              {/* 快速跳转按钮 */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowQuickNav(!showQuickNav)}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    background: showQuickNav ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                    border: '2px solid #667eea',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: showQuickNav ? 'white' : '#667eea',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span>📍 快速跳转</span>
                  <span style={{ transform: showQuickNav ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                    ▼
                  </span>
                </button>
                
                {showQuickNav && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: '8px',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    zIndex: 100,
                    overflow: 'hidden'
                  }}>
                    {quickNavItems.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        style={{
                          width: '100%',
                          padding: '14px 20px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          fontSize: '15px',
                          color: '#333',
                          transition: 'background 0.2s',
                          borderBottom: index < quickNavItems.length - 1 ? '1px solid #f0f0f0' : 'none',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <span style={{ fontSize: '20px' }}>{item.icon}</span>
                        <span style={{ flex: 1 }}>{item.label}</span>
                        <span style={{ color: '#999', fontSize: '12px' }}>跳转 →</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 学习目标 */}
              <div className="card" id="objectives">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <h2 style={{ color: '#333', marginBottom: '8px' }}>{selectedTopic.title}</h2>
                    
                    {/* 学习进度条 - 按知识点独立 */}
                    <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 500, color: '#333' }}>
                          📚 学习进度
                        </span>
                        <span style={{ fontSize: '14px', color: '#667eea', fontWeight: 600 }}>
                          {getTopicProgressPercentage(selectedTopic.id)}%
                        </span>
                      </div>
                      <div style={{ 
                        width: '100%', 
                        height: '12px', 
                        background: '#e0e0e0', 
                        borderRadius: '6px', 
                        overflow: 'hidden' 
                      }}>
                        <div style={{
                          width: `${getTopicProgressPercentage(selectedTopic.id)}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '6px',
                          transition: 'width 0.5s ease'
                        }} />
                      </div>
                      
                      {/* 步骤状态 */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: currentSteps.step1_theory ? '#4caf50' : '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            color: 'white',
                            fontWeight: 600
                          }}>
                            {currentSteps.step1_theory ? '✓' : '1'}
                          </div>
                          <span style={{ fontSize: '13px', color: currentSteps.step1_theory ? '#4caf50' : '#666' }}>
                            看过理论
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: currentSteps.step2_code ? '#4caf50' : '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            color: 'white',
                            fontWeight: 600
                          }}>
                            {currentSteps.step2_code ? '✓' : '2'}
                          </div>
                          <span style={{ fontSize: '13px', color: currentSteps.step2_code ? '#4caf50' : '#666' }}>
                            运行过代码
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: currentSteps.step3_quiz ? '#4caf50' : '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            color: 'white',
                            fontWeight: 600
                          }}>
                            {currentSteps.step3_quiz ? '✓' : '3'}
                          </div>
                          <span style={{ fontSize: '13px', color: currentSteps.step3_quiz ? '#4caf50' : '#666' }}>
                            完成练习
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {selectedTopic.objectives.map((obj, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '4px 12px',
                            background: '#f0f0f0',
                            borderRadius: '12px',
                            fontSize: '13px',
                            color: '#666'
                          }}
                        >
                          🎯 {obj}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                    {!isCompleted(selectedTopic.id) && (
                      <button
                        onClick={handleMarkComplete}
                        style={{
                          padding: '10px 24px',
                          background: 'linear-gradient(135deg, #4caf50 0%, #43a047 100%)',
                          border: 'none',
                          borderRadius: '10px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 600,
                          transition: 'all 0.2s ease',
                          boxShadow: '0 4px 12px rgba(76,175,80,0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(76,175,80,0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(76,175,80,0.3)';
                        }}
                      >
                        ✅ 标记完成
                      </button>
                    )}
                    {isCompleted(selectedTopic.id) && (
                      <span style={{
                        padding: '10px 20px',
                        background: '#e8f5e9',
                        color: '#2e7d32',
                        borderRadius: '10px',
                        fontWeight: 600,
                        border: '2px solid #4caf50'
                      }}>
                        ✅ 已完成
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 详细内容 */}
              <div className="card" id="content">
                <div
                  dangerouslySetInnerHTML={{ __html: selectedTopic.contentHtml }}
                />
                <style dangerouslySetInnerHTML={{ __html: `
                  .card h2 {
                    color: #333;
                    margin: 20px 0 12px 0;
                    font-size: 20px;
                  }
                  .card h3 {
                    color: #555;
                    margin: 16px 0 8px 0;
                    font-size: 16px;
                  }
                  .card p {
                    color: #666;
                    line-height: 1.8;
                    margin-bottom: 12px;
                  }
                  .card ul {
                    margin-left: 24px;
                    margin-bottom: 12px;
                  }
                  .card li {
                    color: #666;
                    line-height: 1.8;
                    margin-bottom: 6px;
                  }
                  .card pre {
                    background: #1e1e1e;
                    color: #d4d4d4;
                    padding: 16px;
                    border-radius: 8px;
                    overflow-x: auto;
                    margin: 12px 0;
                    position: relative;
                  }
                `}} />
              </div>

              {/* 代码示例区域 */}
              {selectedTopic.codeExamples && selectedTopic.codeExamples.length > 0 && (
                <div className="card" id="code-examples">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                    <h3 style={{ margin: 0, color: '#333' }}>💻 代码示例</h3>
                    <button
                      onClick={handleOpenInEditor}
                      style={{
                        padding: '9px 20px',
                        background: 'linear-gradient(135deg, #78909c 0%, #546e7a 100%)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                        boxShadow: '0 3px 10px rgba(84,110,122,0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 5px 15px rgba(84,110,122,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 3px 10px rgba(84,110,122,0.3)';
                      }}
                    >
                      📝 在编辑器中打开
                    </button>
                  </div>
                  
                  {selectedTopic.codeExamples.map((example, index) => (
                    <div key={index} style={{ marginBottom: '24px' }}>
                      {example.title && (
                        <h4 style={{ color: '#555', marginBottom: '8px', fontSize: '15px' }}>
                          {example.title}
                        </h4>
                      )}
                      <div style={{ position: 'relative' }}>
                        <pre style={{
                          background: '#282c34',
                          padding: '16px',
                          paddingTop: '48px',
                          borderRadius: '8px',
                          overflowX: 'auto',
                          overflowY: 'hidden',
                          margin: 0,
                          fontFamily: "'Fira Code', 'Consolas', 'Courier New', monospace",
                          fontSize: '14px',
                          lineHeight: '1.6',
                          WebkitOverflowScrolling: 'touch'
                        }}>
                          <code className="language-python">{example.code}</code>
                        </pre>
                        
                        {/* 操作按钮组 */}
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          right: '8px',
                          display: 'flex',
                          gap: '8px',
                          zIndex: 10
                        }}>
                          <button
                            onClick={() => handleRunCode(example, index)}
                            disabled={runningCode === index}
                            style={{
                              padding: '7px 14px',
                              background: runningCode === index ? '#ff9800' : 'linear-gradient(135deg, #4caf50 0%, #43a047 100%)',
                              border: 'none',
                              borderRadius: '10px',
                              color: 'white',
                              cursor: runningCode === index ? 'wait' : 'pointer',
                              fontSize: '13px',
                              fontWeight: 600,
                              transition: 'all 0.2s ease',
                              backdropFilter: 'blur(4px)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                            }}
                            onMouseEnter={(e) => {
                              if (runningCode !== index) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
                            }}
                          >
                            {runningCode === index ? '⏳ 运行中...' : '▶️ 运行'}
                          </button>
                          <button
                            onClick={() => handleCopyCode(example.code, index)}
                            style={{
                              padding: '7px 14px',
                              background: copiedIndex === index ? 'linear-gradient(135deg, #4caf50 0%, #43a047 100%)' : 'rgba(255,255,255,0.15)',
                              border: 'none',
                              borderRadius: '10px',
                              color: 'white',
                              cursor: 'pointer',
                              fontSize: '13px',
                              fontWeight: 600,
                              transition: 'all 0.2s ease',
                              backdropFilter: 'blur(4px)',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                              e.currentTarget.style.background = copiedIndex === index ? 'linear-gradient(135deg, #4caf50 0%, #43a047 100%)' : 'rgba(255,255,255,0.25)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
                              e.currentTarget.style.background = copiedIndex === index ? 'linear-gradient(135deg, #4caf50 0%, #43a047 100%)' : 'rgba(255,255,255,0.15)';
                            }}
                          >
                            {copiedIndex === index ? '✅ 已复制' : '📋 复制'}
                          </button>
                          {example.explanation && example.explanation.length > 0 && (
                            <button
                              onClick={() => handleOpenExplanation(example)}
                              style={{
                                padding: '7px 14px',
                                background: 'rgba(255,255,255,0.15)',
                                border: 'none',
                                borderRadius: '10px',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: 600,
                                transition: 'all 0.2s ease',
                                backdropFilter: 'blur(4px)',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                              }}
                            >
                              📖 解释
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* 逐行解释 */}
                      {example.explanation && example.explanation.length > 0 && (
                        <div style={{ marginTop: '12px' }}>
                          <button
                            onClick={() => toggleExplanation(index)}
                            style={{
                              width: '100%',
                              padding: '12px 18px',
                              background: expandedExplanations[index] ? '#f3e5f5' : '#f5f5f5',
                              border: '2px solid ' + (expandedExplanations[index] ? '#667eea' : '#ddd'),
                              borderRadius: '10px',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontWeight: 600,
                              color: expandedExplanations[index] ? '#667eea' : '#333',
                              fontSize: '14px',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (!expandedExplanations[index]) {
                                e.currentTarget.style.background = '#e0e0e0';
                                e.currentTarget.style.borderColor = '#bbb';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!expandedExplanations[index]) {
                                e.currentTarget.style.background = '#f5f5f5';
                                e.currentTarget.style.borderColor = '#ddd';
                              }
                            }}
                          >
                            <span>📖 逐行解释</span>
                            <span style={{
                              transform: expandedExplanations[index] ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s ease'
                            }}>
                              ▼
                            </span>
                          </button>
                          
                          {expandedExplanations[index] && (
                            <div style={{
                              marginTop: '12px',
                              background: '#fff',
                              border: '1px solid #e0e0e0',
                              borderRadius: '8px',
                              overflow: 'hidden'
                            }}>
                              {example.explanation.map((line, lineIndex) => (
                                <div
                                  key={lineIndex}
                                  style={{
                                    padding: '12px 16px',
                                    borderBottom: lineIndex < example.explanation.length - 1 ? '1px solid #f0f0f0' : 'none',
                                    display: 'flex',
                                    gap: '12px'
                                  }}
                                >
                                  <div style={{
                                    minWidth: '30px',
                                    height: '24px',
                                    background: '#667eea',
                                    color: 'white',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    flexShrink: 0
                                  }}>
                                    {lineIndex + 1}
                                  </div>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                      color: '#333',
                                      fontWeight: 500,
                                      marginBottom: '4px',
                                      fontSize: '14px',
                                      wordBreak: 'break-word'
                                    }}>
                                      {line.code}
                                    </div>
                                    <div style={{
                                      color: '#666',
                                      fontSize: '13px',
                                      lineHeight: 1.5
                                    }}>
                                      {line.description}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 随堂练习 */}
              <div className="card" id="quiz">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <h3 style={{ margin: 0, color: '#333' }}>📝 随堂练习</h3>
                    <span style={{
                      padding: '6px 16px',
                      background: '#f3e5f5',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#667eea'
                    }}>
                      当前得分：{progress.correct}/{progress.total}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {progress.answered > 0 && (
                      <span style={{
                        fontSize: '14px',
                        color: progress.percentage >= 60 ? '#4caf50' : '#ff9800',
                        fontWeight: 500
                      }}>
                        正确率: {progress.correct}/{progress.total} ({progress.percentage}%)
                      </span>
                    )}
                    {progress.answered > 0 && (
                      <button
                        onClick={handleResetQuiz}
                        style={{
                          padding: '6px 16px',
                          fontSize: '13px',
                          background: '#f5f5f5',
                          border: '2px solid #ddd',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: '#666',
                          fontWeight: 600,
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#e0e0e0';
                          e.currentTarget.style.borderColor = '#bbb';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#f5f5f5';
                          e.currentTarget.style.borderColor = '#ddd';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        🔄 重新答题
                      </button>
                    )}
                  </div>
                </div>
                {selectedTopic.questions.map((q, qIndex) => (
                  <QuizItem 
                    key={q.id} 
                    question={q} 
                    index={qIndex}
                    topicId={selectedTopic.id}
                    savedAnswer={getTopicAnswers(selectedTopic.id)[q.id]}
                    onSaveAnswer={saveQuizAnswer}
                    onAllCorrect={(isAllCorrect) => {
                      // 当所有题目都答对时，标记步骤3完成
                      if (isAllCorrect && !currentSteps.step3_quiz) {
                        updateTopicStep(selectedTopic.id, 'step3_quiz', true);
                      }
                    }}
                  />
                ))}
                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                  <button
                    onClick={() => {
                      alert(`你答对了 ${progress.correct}/${progress.total} 题`);
                    }}
                    style={{
                      width: '100%',
                      padding: '14px 24px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 12px rgba(102,126,234,0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(102,126,234,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102,126,234,0.3)';
                    }}
                  >
                    📊 提交全部
                  </button>
                </div>
              </div>

              {/* 底部间距，为控制台留出空间 */}
              <div style={{ height: consoleExpanded ? '300px' : '80px' }}></div>
            </>
          )}
        </div>
      </div>

      {/* 底部固定输出控制台 */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#1e1e1e',
        borderTop: '3px solid #667eea',
        zIndex: 1000,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.3)'
      }}>
        {/* 控制台头部 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 16px',
          background: '#2d2d2d',
          borderBottom: '1px solid #3d3d3d'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#98c379', fontWeight: 600, fontSize: '14px' }}>
              🖥️ 输出控制台
            </span>
            {consoleContent.length > 0 && (
              <span style={{ color: '#888', fontSize: '12px' }}>
                {consoleContent.filter(c => c.type === 'output').length} 条输出
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleClearConsole}
              style={{
                padding: '6px 12px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '4px',
                color: '#ff9800',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              🗑️ 清空
            </button>
            <button
              onClick={() => setConsoleExpanded(!consoleExpanded)}
              style={{
                padding: '6px 12px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '4px',
                color: '#d4d4d4',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              {consoleExpanded ? '收起 ⬇️' : '展开 ⬆️'}
            </button>
          </div>
        </div>

        {/* 控制台内容区域 */}
        {consoleExpanded && (
          <div style={{
            maxHeight: '200px',
            overflowY: 'auto',
            padding: '12px 16px',
            background: '#1e1e1e'
          }}>
            {consoleContent.length === 0 ? (
              <div style={{
                color: '#666',
                textAlign: 'center',
                padding: '20px',
                fontSize: '13px'
              }}>
                点击代码示例的「▶️ 运行」按钮，输出将显示在这里
              </div>
            ) : (
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: '13px', lineHeight: '1.6' }}>
                {consoleContent.map((entry, idx) => (
                  <div key={idx} style={{ marginBottom: '4px' }}>
                    {entry.type === 'command' && (
                      <span style={{ color: '#61afef' }}>{entry.content}</span>
                    )}
                    {entry.type === 'code' && (
                      <pre style={{
                        margin: '8px 0',
                        padding: '8px',
                        background: '#2d2d2d',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#d4d4d4',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {entry.content}
                      </pre>
                    )}
                    {entry.type === 'output' && (
                      <span style={{ color: '#98c379', paddingLeft: '16px' }}>{entry.content}</span>
                    )}
                    {entry.type === 'success' && (
                      <span style={{ color: '#4caf50', fontWeight: 600 }}>{entry.content}</span>
                    )}
                    {entry.type === 'separator' && (
                      <div style={{ color: '#555', margin: '8px 0', fontSize: '12px' }}>{entry.content}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 逐行解释模态框 */}
      {explanationModal.isOpen && explanationModal.example && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={handleCloseExplanation}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 模态框头部 */}
            <div
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '20px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
                📖 代码逐行解释 {explanationModal.example.title && `- ${explanationModal.example.title}`}
              </h3>
              <button
                onClick={handleCloseExplanation}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              >
                ✕
              </button>
            </div>

            {/* 模态框内容 */}
            <div
              style={{
                padding: '24px',
                overflowY: 'auto',
                flex: 1
              }}
            >
              {/* 代码预览 */}
              <pre
                style={{
                  background: '#282c34',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  fontFamily: "'Fira Code', 'Consolas', 'Courier New', monospace",
                  fontSize: '13px',
                  lineHeight: '1.6',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}
              >
                <code className="language-python">{explanationModal.example.code}</code>
              </pre>

              {/* 逐行解释列表 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {explanationModal.example.explanation.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      padding: '16px',
                      borderLeft: '4px solid #667eea'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '12px'
                      }}
                    >
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          background: '#667eea',
                          color: 'white',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 600,
                          flexShrink: 0
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div
                        style={{
                          background: '#fff',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          fontFamily: "'Courier New', monospace",
                          fontSize: '13px',
                          color: '#333',
                          fontWeight: 500,
                          border: '1px solid #e0e0e0',
                          wordBreak: 'break-all'
                        }}
                      >
                        {item.code}
                      </div>
                    </div>
                    <div
                      style={{
                        color: '#666',
                        fontSize: '14px',
                        lineHeight: '1.6',
                        paddingLeft: '40px'
                      }}
                    >
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 模态框底部 */}
            <div
              style={{
                padding: '16px 24px',
                borderTop: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px'
              }}
            >
              <button
                onClick={handleCloseExplanation}
                style={{
                  padding: '10px 24px',
                  background: '#f5f5f5',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#333',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e8e8e8';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f5f5f5';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Toast 提示组件 */}
      {toast.show && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 3000,
            background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '10px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            animation: 'toastFadeIn 0.3s ease-out forwards',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 500,
            fontSize: '14px'
          }}
        >
          {toast.message}
        </div>
      )}
      
      {/* Toast 动画样式 */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes toastFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px) translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }
        
        @keyframes toastFadeOut {
          from {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px) translateX(20px);
          }
        }
      `}} />
    </>
  );
};

const QuizItem = ({ question, index, topicId, savedAnswer, onSaveAnswer, onAllCorrect }) => {
  const [selectedOption, setSelectedOption] = useState(savedAnswer?.userAnswer ?? null);
  const [inputAnswer, setInputAnswer] = useState(savedAnswer?.userAnswer ?? '');
  const [showResult, setShowResult] = useState(savedAnswer !== undefined);
  
  const isFillInBlank = !question.options;

  // 监听保存答案的变化，当所有题目都答对时通知父组件
  useEffect(() => {
    if (savedAnswer?.isCorrect && onAllCorrect) {
      // 检查是否所有题目都答对了（通过 quizAnswers 在父组件中判断）
      // 这里只是通知父组件该题答对了，父组件会判断是否全部正确
    }
  }, [savedAnswer]);
  
  const handleOptionChange = (optIndex) => {
    setSelectedOption(optIndex);
  };
  
  const handleCheckAnswer = () => {
    setShowResult(true);
    if (!isFillInBlank) {
      const isCorrect = selectedOption === question.correct;
      onSaveAnswer(topicId, question.id, selectedOption, isCorrect);
    } else {
      const isCorrect = inputAnswer.trim().toLowerCase() === String(question.correct).toLowerCase();
      onSaveAnswer(topicId, question.id, inputAnswer.trim(), isCorrect);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !showResult) {
      handleCheckAnswer();
    }
  };
  
  const isCorrectAnswer = () => {
    if (!isFillInBlank) {
      return selectedOption === question.correct;
    } else {
      return inputAnswer.trim().toLowerCase() === String(question.correct).toLowerCase();
    }
  };

  return (
    <div style={{ 
      marginBottom: '24px', 
      paddingBottom: '24px', 
      borderBottom: index < question.length - 1 ? '1px solid #eee' : 'none' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <p style={{ fontWeight: 500, margin: 0, color: '#333' }}>
          {index + 1}. {question.text}
        </p>
        {savedAnswer && (
          <span style={{
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 500,
            background: savedAnswer.isCorrect ? '#e8f5e9' : '#ffebee',
            color: savedAnswer.isCorrect ? '#2e7d32' : '#c62828'
          }}>
            {savedAnswer.isCorrect ? '已答对' : '已答错'}
          </span>
        )}
      </div>
      
      {!isFillInBlank ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
          {question.options.map((opt, optIndex) => (
            <div
              key={optIndex}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '12px 16px',
                border: showResult 
                  ? (optIndex === question.correct 
                    ? '2px solid #4caf50' 
                    : (selectedOption === optIndex && !isCorrectAnswer() ? '2px solid #f44336' : '1px solid #ddd'))
                  : (selectedOption === optIndex ? '2px solid #667eea' : '1px solid #ddd'),
                borderRadius: '8px',
                background: showResult 
                  ? (optIndex === question.correct 
                    ? '#e8f5e9' 
                    : (selectedOption === optIndex && !isCorrectAnswer() ? '#ffebee' : 'white'))
                  : (selectedOption === optIndex ? '#f3e5f5' : 'white'),
                cursor: showResult ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: showResult && selectedOption !== optIndex && optIndex !== question.correct ? 0.6 : 1
              }}
              onClick={() => !showResult && handleOptionChange(optIndex)}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={selectedOption === optIndex}
                onChange={() => !showResult && handleOptionChange(optIndex)}
                disabled={showResult}
                style={{
                  width: '18px',
                  height: '18px',
                  marginTop: '2px',
                  flexShrink: 0,
                  cursor: showResult ? 'default' : 'pointer',
                  accentColor: '#667eea'
                }}
              />
              <span style={{ fontSize: '14px', lineHeight: '1.6' }}>
                {opt}
                {showResult && optIndex === question.correct && (
                  <span style={{ color: '#4caf50', fontWeight: 600, marginLeft: '8px' }}>✓ 正确</span>
                )}
                {showResult && selectedOption === optIndex && !isCorrectAnswer() && (
                  <span style={{ color: '#f44336', fontWeight: 600, marginLeft: '8px' }}>✗ 错误</span>
                )}
              </span>
            </div>
          ))}
          
          {!showResult && (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              style={{
                marginTop: '12px',
                padding: '11px 26px',
                background: selectedOption === null ? '#ddd' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: selectedOption === null ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: '14px',
                width: 'fit-content',
                transition: 'all 0.2s ease',
                boxShadow: selectedOption === null ? 'none' : '0 4px 12px rgba(102,126,234,0.3)'
              }}
              onMouseEnter={(e) => {
                if (selectedOption !== null) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(102,126,234,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = selectedOption === null ? 'none' : '0 4px 12px rgba(102,126,234,0.3)';
              }}
            >
              检查答案
            </button>
          )}
          
          {showResult && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              background: isCorrectAnswer() ? '#e8f5e9' : '#fff3e0',
              borderRadius: '8px',
              borderLeft: '4px solid ' + (isCorrectAnswer() ? '#4caf50' : '#ff9800')
            }}>
              <p style={{ 
                fontWeight: 600, 
                margin: '0 0 8px 0',
                color: isCorrectAnswer() ? '#2e7d32' : '#e65100'
              }}>
                {isCorrectAnswer() ? '🎉 回答正确！' : '❌ 回答错误'}
              </p>
              <p style={{ margin: 0, color: '#666', lineHeight: '1.6' }}>
                {question.explanation}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: '12px' }}>
          {!showResult ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={inputAnswer}
                onChange={(e) => setInputAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="请输入答案"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
              <button
                onClick={handleCheckAnswer}
                disabled={!inputAnswer.trim()}
                style={{
                  padding: '12px 26px',
                  background: !inputAnswer.trim() ? '#ddd' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: !inputAnswer.trim() ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  boxShadow: !inputAnswer.trim() ? 'none' : '0 4px 12px rgba(102,126,234,0.3)'
                }}
                onMouseEnter={(e) => {
                  if (inputAnswer.trim()) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(102,126,234,0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = !inputAnswer.trim() ? 'none' : '0 4px 12px rgba(102,126,234,0.3)';
                }}
              >
                检查答案
              </button>
            </div>
          ) : (
            <div>
              <div style={{ 
                padding: '12px 16px', 
                background: isCorrectAnswer() ? '#e8f5e9' : '#ffebee', 
                border: isCorrectAnswer() ? '2px solid #4caf50' : '2px solid #f44336',
                borderRadius: '8px',
                marginBottom: '12px'
              }}>
                <span style={{ fontWeight: 500, marginRight: '8px' }}>你的答案：</span>
                <span style={{ color: isCorrectAnswer() ? '#2e7d32' : '#c62828' }}>{inputAnswer}</span>
                {isCorrectAnswer() ? ' ✓' : ' ✗'}
              </div>
              <div style={{ 
                padding: '12px 16px', 
                background: '#f5f5f5', 
                borderRadius: '8px',
                marginBottom: '12px'
              }}>
                <span style={{ fontWeight: 500, marginRight: '8px' }}>正确答案：</span>
                <span style={{ color: '#2e7d32', fontWeight: 500 }}>{question.correct}</span>
              </div>
              <div style={{
                padding: '16px',
                background: isCorrectAnswer() ? '#e8f5e9' : '#fff3e0',
                borderRadius: '8px',
                borderLeft: '4px solid ' + (isCorrectAnswer() ? '#4caf50' : '#ff9800')
              }}>
                <p style={{ 
                  fontWeight: 600, 
                  margin: '0 0 8px 0',
                  color: isCorrectAnswer() ? '#2e7d32' : '#e65100'
                }}>
                  {isCorrectAnswer() ? '🎉 回答正确！' : '❌ 回答错误'}
                </p>
                <p style={{ margin: 0, color: '#666', lineHeight: '1.6' }}>
                  {question.explanation}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
