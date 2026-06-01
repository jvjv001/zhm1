import React, { useState, useEffect, useRef } from 'react';
import { courseContent } from '../data';
import { useLearningStore } from '../store/useLearningStore';

export const CourseLearning = ({ onNavigateToProjects }) => {
  const [selectedTopic, setSelectedTopic] = useState(courseContent[0]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [expandedExplanations, setExpandedExplanations] = useState({});
  const [showQuickNav, setShowQuickNav] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const codeRefs = useRef([]);
  const contentRef = useRef(null);
  
  const { 
    completedCourses, 
    markCourseComplete, 
    quizAnswers, 
    saveQuizAnswer,
    clearTopicAnswers 
  } = useLearningStore();

  const isCompleted = (topicId) => completedCourses.includes(topicId);
  
  const getTopicAnswers = (topicId) => {
    return quizAnswers[topicId] || {};
  };

  const handleMarkComplete = () => {
    if (!isCompleted(selectedTopic.id)) {
      markCourseComplete(selectedTopic.id);
    }
  };

  const handleResetQuiz = () => {
    if (confirm('确定要重置本章节的所有答题记录吗？')) {
      clearTopicAnswers(selectedTopic.id);
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
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleOpenInEditor = () => {
    if (onNavigateToProjects) {
      onNavigateToProjects();
    }
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
            {courseContent.map((topic, index) => (
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
                </div>
                {Object.keys(quizAnswers[topic.id] || {}).length > 0 && (
                  <div style={{ fontSize: '11px', opacity: 0.8, paddingLeft: '24px' }}>
                    {Object.values(quizAnswers[topic.id]).filter(a => a.isCorrect).length}/{topic.questions.length} 题已做对
                  </div>
                )}
              </button>
            ))}
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
                  <div>
                    <h2 style={{ color: '#333', marginBottom: '8px' }}>{selectedTopic.title}</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
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
                        className="btn btn-primary"
                        onClick={handleMarkComplete}
                      >
                        ✅ 标记完成
                      </button>
                    )}
                    {isCompleted(selectedTopic.id) && (
                      <span style={{
                        padding: '8px 16px',
                        background: '#e8f5e9',
                        color: '#2e7d32',
                        borderRadius: '8px',
                        fontWeight: 500
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
                      className="btn btn-secondary"
                      onClick={handleOpenInEditor}
                      style={{
                        padding: '8px 16px',
                        fontSize: '14px'
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
                          background: '#1e1e1e',
                          color: '#d4d4d4',
                          padding: '16px',
                          paddingTop: '48px',
                          borderRadius: '8px',
                          overflowX: 'auto',
                          overflowY: 'hidden',
                          margin: 0,
                          fontFamily: "'Courier New', monospace",
                          fontSize: '14px',
                          lineHeight: '1.6',
                          WebkitOverflowScrolling: 'touch'
                        }}>
                          <code>{example.code}</code>
                        </pre>
                        
                        {/* 操作按钮组 */}
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          display: 'flex',
                          gap: '8px',
                          zIndex: 10
                        }}>
                          <button
                            onClick={() => handleCopyCode(example.code, index)}
                            style={{
                              padding: '6px 12px',
                              background: copiedIndex === index ? '#4caf50' : 'rgba(255,255,255,0.1)',
                              border: 'none',
                              borderRadius: '6px',
                              color: 'white',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: 500,
                              transition: 'all 0.3s ease',
                              backdropFilter: 'blur(4px)'
                            }}
                          >
                            {copiedIndex === index ? '✅ 已复制' : '📋 复制代码'}
                          </button>
                        </div>
                      </div>
                      
                      {/* 逐行解释 */}
                      {example.explanation && example.explanation.length > 0 && (
                        <div style={{ marginTop: '12px' }}>
                          <button
                            onClick={() => toggleExplanation(index)}
                            style={{
                              width: '100%',
                              padding: '12px 16px',
                              background: expandedExplanations[index] ? '#f3e5f5' : '#f5f5f5',
                              border: '1px solid #ddd',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontWeight: 500,
                              color: '#333',
                              fontSize: '14px',
                              transition: 'all 0.3s ease'
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
                  <h3 style={{ margin: 0, color: '#333' }}>📝 随堂练习</h3>
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
                          padding: '4px 12px',
                          fontSize: '12px',
                          background: '#f5f5f5',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          color: '#666'
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
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const QuizItem = ({ question, index, topicId, savedAnswer, onSaveAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(savedAnswer?.userAnswer ?? null);
  const [inputAnswer, setInputAnswer] = useState(savedAnswer?.userAnswer ?? '');
  const [showExplanation, setShowExplanation] = useState(savedAnswer !== undefined);
  
  // 判断题目类型
  const isFillInBlank = !question.options;
  
  const handleOptionClick = (optIndex) => {
    setSelectedOption(optIndex);
    setShowExplanation(true);
    const isCorrect = optIndex === question.correct;
    onSaveAnswer(topicId, question.id, optIndex, isCorrect);
  };
  
  const handleInputAnswer = () => {
    setShowExplanation(true);
    const isCorrect = inputAnswer.trim().toLowerCase() === String(question.correct).toLowerCase();
    onSaveAnswer(topicId, question.id, inputAnswer.trim(), isCorrect);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !showExplanation) {
      handleInputAnswer();
    }
  };
  
  const isCorrectOption = (optIndex) => optIndex === question.correct;
  const isWrongOption = (optIndex) => showExplanation && selectedOption === optIndex && !isCorrectOption(optIndex);
  
  const isFillInCorrect = () => isFillInBlank && showExplanation && 
    inputAnswer.trim().toLowerCase() === String(question.correct).toLowerCase();
  const isFillInWrong = () => isFillInBlank && showExplanation && !isFillInCorrect();

  return (
    <div style={{ 
      marginBottom: '24px', 
      paddingBottom: '24px', 
      borderBottom: index < question.length - 1 ? '1px solid #eee' : 'none' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
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
        /* 选择题 */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          {question.options.map((opt, optIndex) => (
            <button
              key={optIndex}
              onClick={() => !showExplanation && handleOptionClick(optIndex)}
              disabled={showExplanation}
              style={{
                padding: '12px 16px',
                border: showExplanation 
                  ? (isCorrectOption(optIndex) 
                    ? '2px solid #4caf50' 
                    : (isWrongOption(optIndex) ? '2px solid #f44336' : '1px solid #ddd'))
                  : (selectedOption === optIndex ? '2px solid #667eea' : '1px solid #ddd'),
                borderRadius: '8px',
                background: showExplanation 
                  ? (isCorrectOption(optIndex) 
                    ? '#e8f5e9' 
                    : (isWrongOption(optIndex) ? '#ffebee' : 'white'))
                  : (selectedOption === optIndex ? '#f3e5f5' : 'white'),
                cursor: showExplanation ? 'default' : 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                opacity: showExplanation && selectedOption !== optIndex && !isCorrectOption(optIndex) ? 0.6 : 1,
                fontSize: '14px'
              }}
            >
              <span style={{ fontWeight: 500, marginRight: '8px' }}>
                {String.fromCharCode(65 + optIndex)}.
              </span>
              {opt}
              {showExplanation && isCorrectOption(optIndex) && ' ✓'}
              {showExplanation && isWrongOption(optIndex) && ' ✗'}
            </button>
          ))}
        </div>
      ) : (
        /* 填空题 */
        <div style={{ marginTop: '12px' }}>
          {!showExplanation ? (
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
                onClick={handleInputAnswer}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '14px'
                }}
              >
                确认答案
              </button>
            </div>
          ) : (
            <div>
              <div style={{ 
                padding: '12px 16px', 
                background: isFillInCorrect() ? '#e8f5e9' : '#ffebee', 
                border: isFillInCorrect() ? '2px solid #4caf50' : '2px solid #f44336',
                borderRadius: '8px',
                marginBottom: '8px'
              }}>
                <span style={{ fontWeight: 500, marginRight: '8px' }}>你的答案：</span>
                <span style={{ color: isFillInCorrect() ? '#2e7d32' : '#c62828' }}>{inputAnswer}</span>
                {isFillInCorrect() && ' ✓'}
                {isFillInWrong() && ' ✗'}
              </div>
              <div style={{ 
                padding: '12px 16px', 
                background: '#f5f5f5', 
                borderRadius: '8px',
                marginTop: '8px'
              }}>
                <span style={{ fontWeight: 500, marginRight: '8px' }}>正确答案：</span>
                <span style={{ color: '#2e7d32', fontWeight: 500 }}>{question.correct}</span>
              </div>
            </div>
          )}
        </div>
      )}
      
      {showExplanation && (
        <div style={{
          marginTop: '16px',
          padding: '16px',
          background: (() => {
            if (isFillInBlank) return isFillInCorrect() ? '#e8f5e9' : '#fff3e0';
            return selectedOption === question.correct ? '#e8f5e9' : '#fff3e0';
          })(),
          borderRadius: '8px',
          borderLeft: `4px solid ${(() => {
            if (isFillInBlank) return isFillInCorrect() ? '#4caf50' : '#ff9800';
            return selectedOption === question.correct ? '#4caf50' : '#ff9800';
          })()}`,
          borderTop: '1px solid #eee'
        }}>
          <p style={{ fontWeight: 500, marginBottom: '8px', color: '#333' }}>
            {(() => {
              if (isFillInBlank) return isFillInCorrect() ? '✅ 回答正确！' : '❌ 回答错误';
              return selectedOption === question.correct ? '✅ 回答正确！' : '❌ 回答错误';
            })()}
          </p>
          <p style={{ color: '#666', lineHeight: 1.6, margin: 0 }}>{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
