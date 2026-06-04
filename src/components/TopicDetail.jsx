import React, { useState, useEffect } from 'react';
import { courseContent } from '../data';

export const TopicDetail = ({ topicId, onBack, onProgressUpdate }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState({});
  const [completed, setCompleted] = useState(false);
  
  const topic = courseContent.find(t => t.id === topicId);
  
  useEffect(() => {
    // 从localStorage读取进度
    const savedProgress = JSON.parse(localStorage.getItem(`topic_${topicId}`) || '{}');
    if (savedProgress.answers) setAnswers(savedProgress.answers);
    if (savedProgress.showResults) setShowResults(savedProgress.showResults);
    if (savedProgress.completed) setCompleted(savedProgress.completed);
    if (savedProgress.currentQuestion) setCurrentQuestion(savedProgress.currentQuestion);
  }, [topicId]);
  
  useEffect(() => {
    // 保存进度到localStorage
    const progress = { answers, showResults, completed, currentQuestion };
    localStorage.setItem(`topic_${topicId}`, JSON.stringify(progress));
    
    // 更新全局进度
    if (onProgressUpdate && completed) {
      onProgressUpdate(topicId, true);
    }
  }, [answers, showResults, completed, topicId]);
  
  if (!topic) {
    return <div style={styles.notFound}>知识点不存在</div>;
  }
  
  const handleAnswer = (questionId, optionIndex) => {
    if (showResults[questionId]) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };
  
  const handleSubmit = (questionId) => {
    if (answers[questionId] === undefined) return;
    setShowResults(prev => ({ ...prev, [questionId]: true }));
    
    // 检查是否全部完成
    const allDone = topic.questions.every(q => showResults[q.id] || q.id === questionId);
    if (allDone) {
      setCompleted(true);
    }
  };
  
  const correctCount = topic.questions.filter(q => 
    showResults[q.id] && answers[q.id] === q.correct
  ).length;
  
  return (
    <div style={styles.container}>
      {/* 返回按钮 */}
      <button onClick={onBack} style={styles.backButton}>
        ← 返回课程列表
      </button>
      
      {/* 标题区 */}
      <div style={styles.header}>
        <h1 style={styles.title}>{topic.title}</h1>
        <div style={styles.progressBadge}>
          {completed ? '✅ 已完成' : `进度: ${Object.keys(showResults).length}/${topic.questions.length}`}
        </div>
      </div>
      
      {/* 学习目标 */}
      <div style={styles.objectives}>
        <h3 style={styles.objectivesTitle}>🎯 学习目标</h3>
        <ul style={styles.objectivesList}>
          {topic.objectives.map((obj, idx) => (
            <li key={idx} style={styles.objectiveItem}>{obj}</li>
          ))}
        </ul>
      </div>
      
      {/* Tab切换 */}
      <div style={styles.tabs}>
        <button 
          onClick={() => setActiveTab('content')}
          style={{ ...styles.tab, ...(activeTab === 'content' ? styles.tabActive : {}) }}
        >
          📚 图文教程
        </button>
        <button 
          onClick={() => setActiveTab('examples')}
          style={{ ...styles.tab, ...(activeTab === 'examples' ? styles.tabActive : {}) }}
        >
          💻 代码示例
        </button>
        <button 
          onClick={() => setActiveTab('quiz')}
          style={{ ...styles.tab, ...(activeTab === 'quiz' ? styles.tabActive : {}) }}
        >
          📝 练习题 ({correctCount}/{topic.questions.length})
        </button>
      </div>
      
      {/* 内容区 */}
      <div style={styles.contentArea}>
        {activeTab === 'content' && (
          <div style={styles.contentSection}>
            <div style={styles.contentHtml} dangerouslySetInnerHTML={{ __html: topic.contentHtml }} />
            
            {/* 配图区域 */}
            <div style={styles.imageSection}>
              <h3 style={styles.imageTitle}>📊 知识点图解</h3>
              <div style={styles.imagePlaceholder}>
                <div style={styles.imageDiagram}>
                  {topic.id === 'topic1' && (
                    <div style={styles.diagramContent}>
                      <div style={styles.diagramBox}>
                        <strong>Series (一维)</strong>
                        <div style={styles.diagramRow}>索引: 0 | 1 | 2 | 3</div>
                        <div style={styles.diagramRow}>数据: 100 | 200 | 150 | 250</div>
                      </div>
                      <div style={styles.arrowDown}>↓</div>
                      <div style={styles.diagramBox}>
                        <strong>DataFrame (二维)</strong>
                        <div style={styles.diagramTable}>
                          <div style={styles.diagramHeader}>
                            <span>产品</span><span>销量</span><span>价格</span>
                          </div>
                          <div style={styles.diagramRow}><span>苹果</span><span>120</span><span>5.5</span></div>
                          <div style={styles.diagramRow}><span>香蕉</span><span>200</span><span>3.2</span></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {topic.id === 'topic2' && (
                    <div style={styles.diagramContent}>
                      <div style={styles.flowDiagram}>
                        <div style={styles.flowStep}>CSV/Excel文件</div>
                        <div style={styles.arrowRight}>→</div>
                        <div style={styles.flowStep}>pd.read_csv()</div>
                        <div style={styles.arrowRight}>→</div>
                        <div style={styles.flowStep}>DataFrame</div>
                      </div>
                    </div>
                  )}
                  {topic.id !== 'topic1' && topic.id !== 'topic2' && (
                    <div style={styles.genericDiagram}>
                      <span style={styles.diagramIcon}>📈</span>
                      <span>本知识点配套图解</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'examples' && (
          <div style={styles.examplesSection}>
            {topic.codeExamples.map((example, idx) => (
              <div key={idx} style={styles.exampleCard}>
                <h4 style={styles.exampleTitle}>{example.title}</h4>
                <pre style={styles.codeBlock}>{example.code}</pre>
                <div style={styles.explanationList}>
                  {example.explanation.map((exp, expIdx) => (
                    <div key={expIdx} style={styles.explanationItem}>
                      <code style={styles.expCode}>{exp.code}</code>
                      <span style={styles.expDesc}>{exp.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'quiz' && (
          <div style={styles.quizSection}>
            {topic.questions.map((q, idx) => (
              <div key={q.id} style={styles.quizCard}>
                <div style={styles.quizHeader}>
                  <span style={styles.quizNumber}>题目 {idx + 1}</span>
                  {showResults[q.id] && (
                    <span style={{
                      ...styles.quizStatus,
                      color: answers[q.id] === q.correct ? '#4caf50' : '#f44336'
                    }}>
                      {answers[q.id] === q.correct ? '✅ 正确' : '❌ 错误'}
                    </span>
                  )}
                </div>
                <p style={styles.quizQuestion}>{q.text}</p>
                <div style={styles.quizOptions}>
                  {q.options.map((opt, optIdx) => {
                    const isSelected = answers[q.id] === optIdx;
                    const isCorrect = optIdx === q.correct;
                    const showResult = showResults[q.id];
                    
                    let optionStyle = { ...styles.quizOption };
                    if (showResult && isCorrect) {
                      optionStyle = { ...optionStyle, ...styles.quizOptionCorrect };
                    } else if (showResult && isSelected && !isCorrect) {
                      optionStyle = { ...optionStyle, ...styles.quizOptionWrong };
                    } else if (isSelected) {
                      optionStyle = { ...optionStyle, ...styles.quizOptionSelected };
                    }
                    
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleAnswer(q.id, optIdx)}
                        style={optionStyle}
                        disabled={showResults[q.id]}
                      >
                        {opt}
                        {showResult && isCorrect && ' ✓'}
                        {showResult && isSelected && !isCorrect && ' ✗'}
                      </button>
                    );
                  })}
                </div>
                
                {!showResults[q.id] && (
                  <button
                    onClick={() => handleSubmit(q.id)}
                    style={{
                      ...styles.submitButton,
                      ...(answers[q.id] === undefined ? styles.submitButtonDisabled : {})
                    }}
                    disabled={answers[q.id] === undefined}
                  >
                    提交答案
                  </button>
                )}
                
                {showResults[q.id] && (
                  <div style={{
                    ...styles.explanationBox,
                    ...(answers[q.id] === q.correct ? styles.explanationCorrect : styles.explanationWrong)
                  }}>
                    {answers[q.id] === q.correct ? (
                      <span>✅ {q.explanation}</span>
                    ) : (
                      <span>❌ 正确答案: {q.options[q.correct]}。{q.explanation}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {completed && (
              <div style={styles.completionCard}>
                <h3 style={styles.completionTitle}>🎉 知识点学习完成！</h3>
                <p style={styles.completionScore}>
                  正确率: {Math.round(correctCount / topic.questions.length * 100)}%
                </p>
                <button onClick={onBack} style={styles.continueButton}>
                  继续学习下一个知识点 →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '24px'
  },
  backButton: {
    padding: '10px 20px',
    background: '#f0f0f0',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#333'
  },
  progressBadge: {
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 600
  },
  objectives: {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '24px'
  },
  objectivesTitle: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '12px'
  },
  objectivesList: {
    listStyle: 'none',
    padding: 0
  },
  objectiveItem: {
    padding: '8px 0',
    paddingLeft: '24px',
    position: 'relative',
    fontSize: '15px'
  },
  tabs: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '12px'
  },
  tab: {
    padding: '12px 24px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 500,
    color: '#666'
  },
  tabActive: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  },
  contentArea: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
  },
  contentSection: {
    fontSize: '16px',
    lineHeight: 1.8
  },
  contentHtml: {
    marginBottom: '24px'
  },
  imageSection: {
    marginTop: '24px'
  },
  imageTitle: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '16px'
  },
  imagePlaceholder: {
    background: '#f5f5f5',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center'
  },
  imageDiagram: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px'
  },
  diagramContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  diagramBox: {
    background: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  diagramRow: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    padding: '4px 0'
  },
  diagramTable: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  diagramHeader: {
    display: 'flex',
    gap: '16px',
    fontWeight: 600,
    background: '#667eea',
    color: 'white',
    padding: '8px',
    borderRadius: '4px'
  },
  arrowDown: {
    fontSize: '24px',
    color: '#667eea'
  },
  flowDiagram: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  flowStep: {
    background: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  arrowRight: {
    fontSize: '20px',
    color: '#667eea'
  },
  genericDiagram: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    color: '#666'
  },
  diagramIcon: {
    fontSize: '48px'
  },
  examplesSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  exampleCard: {
    background: '#f8f9fa',
    borderRadius: '12px',
    padding: '20px'
  },
  exampleTitle: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '12px'
  },
  codeBlock: {
    background: '#2d2d3a',
    color: '#f0f0f0',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '13px',
    lineHeight: 1.5,
    overflow: 'auto',
    fontFamily: 'monospace'
  },
  explanationList: {
    marginTop: '16px'
  },
  explanationItem: {
    display: 'flex',
    gap: '12px',
    padding: '8px 0',
    borderBottom: '1px solid #e0e0e0'
  },
  expCode: {
    background: '#e8e8e8',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '13px',
    fontFamily: 'monospace'
  },
  expDesc: {
    fontSize: '14px',
    color: '#666'
  },
  quizSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  quizCard: {
    background: '#f8f9fa',
    borderRadius: '12px',
    padding: '20px'
  },
  quizHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px'
  },
  quizNumber: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#667eea'
  },
  quizStatus: {
    fontSize: '14px',
    fontWeight: 600
  },
  quizQuestion: {
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '16px'
  },
  quizOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  quizOption: {
    padding: '12px 16px',
    background: 'white',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    textAlign: 'left'
  },
  quizOptionSelected: {
    borderColor: '#667eea',
    background: '#f3e5f5'
  },
  quizOptionCorrect: {
    borderColor: '#4caf50',
    background: '#e8f5e9'
  },
  quizOptionWrong: {
    borderColor: '#f44336',
    background: '#ffebee'
  },
  submitButton: {
    marginTop: '16px',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600
  },
  submitButtonDisabled: {
    background: '#ccc',
    cursor: 'not-allowed'
  },
  explanationBox: {
    marginTop: '16px',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px'
  },
  explanationCorrect: {
    background: '#e8f5e9',
    color: '#2e7d32'
  },
  explanationWrong: {
    background: '#ffebee',
    color: '#c62828'
  },
  completionCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '24px',
    borderRadius: '12px',
    textAlign: 'center'
  },
  completionTitle: {
    fontSize: '20px',
    marginBottom: '12px'
  },
  completionScore: {
    fontSize: '16px',
    marginBottom: '16px'
  },
  continueButton: {
    padding: '12px 24px',
    background: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600
  },
  notFound: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#666'
  }
};