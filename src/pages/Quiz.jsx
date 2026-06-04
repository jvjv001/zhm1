import React, { useState, useEffect } from 'react';
import { fullQuestionBank } from '../data/fullQuestionBank';

export const Quiz = () => {
  const [activeTab, setActiveTab] = useState('topics');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [mistakeBook, setMistakeBook] = useState([]);
  const [practiceHistory, setPracticeHistory] = useState([]);

  // 从localStorage加载数据
  useEffect(() => {
    const savedMistakes = localStorage.getItem('mistakeBook');
    const savedHistory = localStorage.getItem('practiceHistory');
    if (savedMistakes) setMistakeBook(JSON.parse(savedMistakes));
    if (savedHistory) setPracticeHistory(JSON.parse(savedHistory));
  }, []);

  // 保存到localStorage
  useEffect(() => {
    localStorage.setItem('mistakeBook', JSON.stringify(mistakeBook));
  }, [mistakeBook]);

  useEffect(() => {
    localStorage.setItem('practiceHistory', JSON.stringify(practiceHistory));
  }, [practiceHistory]);

  const selectTopic = (topic) => {
    setSelectedTopic(topic);
    setActiveTab('quiz');
  };

  const selectAnswer = (questionId, optionIndex) => {
    if (submitted[questionId]) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const submitQuestion = (question) => {
    const questionId = question.id;
    if (userAnswers[questionId] === undefined) return;

    setSubmitted(prev => ({ ...prev, [questionId]: true }));

    const isCorrect = userAnswers[questionId] === question.correct;

    // 记录做题历史
    const historyItem = {
      id: Date.now(),
      topicId: selectedTopic.topicId,
      topicTitle: selectedTopic.topicTitle,
      questionId: questionId,
      question: question.question,
      userAnswer: userAnswers[questionId],
      correctAnswer: question.correct,
      isCorrect,
      timestamp: new Date().toLocaleString('zh-CN')
    };

    setPracticeHistory(prev => [historyItem, ...prev]);

    // 如果答错，加入错题本
    if (!isCorrect) {
      const existingMistake = mistakeBook.find(m => m.questionId === questionId);
      if (!existingMistake) {
        const mistakeItem = {
          id: Date.now(),
          topicId: selectedTopic.topicId,
          topicTitle: selectedTopic.topicTitle,
          questionId: questionId,
          question: question,
          userAnswer: userAnswers[questionId],
          addedAt: new Date().toLocaleString('zh-CN'),
          reviewCount: 0
        };
        setMistakeBook(prev => [mistakeItem, ...prev]);
      }
    }
  };

  const removeFromMistakeBook = (questionId) => {
    setMistakeBook(prev => prev.filter(m => m.questionId !== questionId));
  };

  const resetTopic = () => {
    if (selectedTopic) {
      const topicIds = selectedTopic.questions.map(q => q.id);
      setUserAnswers(prev => {
        const newAnswers = { ...prev };
        topicIds.forEach(id => delete newAnswers[id]);
        return newAnswers;
      });
      setSubmitted(prev => {
        const newSubmitted = { ...prev };
        topicIds.forEach(id => delete newSubmitted[id]);
        return newSubmitted;
      });
    }
  };

  const goBack = () => {
    setSelectedTopic(null);
    setActiveTab('topics');
  };

  const getTopicStats = (topicId) => {
    const topicHistory = practiceHistory.filter(h => h.topicId === topicId);
    const total = topicHistory.length;
    const correct = topicHistory.filter(h => h.isCorrect).length;
    return { total, correct };
  };

  const renderTopicsList = () => (
    <div>
      <h2 style={styles.sectionTitle}>📚 知识点章节</h2>
      <div style={styles.topicGrid}>
        {fullQuestionBank.map((topic, index) => {
          const stats = getTopicStats(topic.topicId);
          return (
            <div
              key={topic.id}
              onClick={() => selectTopic(topic)}
              style={styles.topicCard}
            >
              <div style={styles.topicHeader}>
                <span style={styles.topicNumber}>第 {index + 1} 章</span>
                {stats.total > 0 && (
                  <span style={styles.topicProgress}>
                    {stats.correct}/{stats.total} 正确
                  </span>
                )}
              </div>
              <h3 style={styles.topicTitle}>{topic.topicTitle}</h3>
              <p style={styles.topicCount}>{topic.questions.length} 道题目</p>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderQuiz = () => {
    if (!selectedTopic) return null;
    const correctCount = selectedTopic.questions.filter(q =>
      submitted[q.id] && userAnswers[q.id] === q.correct
    ).length;

    return (
      <div style={styles.quizContainer}>
        <div style={styles.quizHeader}>
          <button onClick={goBack} style={styles.backButton}>← 返回章节</button>
          <h2 style={styles.quizTitle}>{selectedTopic.topicTitle}</h2>
          <div style={styles.quizActions}>
            <span style={styles.quizCount}>
              已完成 {Object.keys(submitted).filter(id => selectedTopic.questions.find(q => q.id === id)).length}/{selectedTopic.questions.length}
            </span>
            <button onClick={resetTopic} style={styles.resetButton}>🔄 重置</button>
          </div>
        </div>

        <div style={styles.questionsList}>
          {selectedTopic.questions.map((question, qIndex) => (
            <div key={question.id} style={styles.questionCard}>
              <div style={styles.questionHeader}>
                <span style={styles.questionNumber}>第 {qIndex + 1} 题</span>
                {submitted[question.id] && (
                  <span style={{
                    ...styles.questionStatus,
                    color: userAnswers[question.id] === question.correct ? '#4caf50' : '#f44336'
                  }}>
                    {userAnswers[question.id] === question.correct ? '✅ 正确' : '❌ 错误'}
                  </span>
                )}
              </div>
              <h3 style={styles.questionText}>{question.question}</h3>
              <div style={styles.optionsList}>
                {question.options.map((option, oIndex) => {
                  let optionStyle = { ...styles.option };
                  if (submitted[question.id]) {
                    if (oIndex === question.correct) {
                      optionStyle = { ...optionStyle, ...styles.optionCorrect };
                    } else if (oIndex === userAnswers[question.id] && oIndex !== question.correct) {
                      optionStyle = { ...optionStyle, ...styles.optionWrong };
                    }
                  } else if (userAnswers[question.id] === oIndex) {
                    optionStyle = { ...optionStyle, ...styles.optionSelected };
                  }

                  return (
                    <button
                      key={oIndex}
                      onClick={() => selectAnswer(question.id, oIndex)}
                      style={optionStyle}
                      disabled={submitted[question.id]}
                    >
                      <span style={styles.optionLabel}>{String.fromCharCode(65 + oIndex)}.</span>
                      <span>{option}</span>
                      {submitted[question.id] && oIndex === question.correct && ' ✓'}
                      {submitted[question.id] && userAnswers[question.id] === oIndex && oIndex !== question.correct && ' ✗'}
                    </button>
                  );
                })}
              </div>

              {!submitted[question.id] && (
                <button
                  onClick={() => submitQuestion(question)}
                  disabled={userAnswers[question.id] === undefined}
                  style={{
                    ...styles.submitButton,
                    ...(userAnswers[question.id] === undefined ? styles.submitButtonDisabled : {})
                  }}
                >
                  提交答案
                </button>
              )}

              {submitted[question.id] && (
                <div style={{
                  ...styles.explanation,
                  ...(userAnswers[question.id] === question.correct ? styles.explanationCorrect : styles.explanationWrong)
                }}>
                  <p style={styles.explanationText}>{question.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMistakeBook = () => (
    <div>
      <h2 style={styles.sectionTitle}>📝 错题本</h2>
      {mistakeBook.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🎉</div>
          <p style={styles.emptyText}>太棒了！目前还没有错题</p>
          <p style={styles.emptyDesc}>继续保持，加油！</p>
        </div>
      ) : (
        <div style={styles.mistakeList}>
          {mistakeBook.map((mistake) => (
            <div key={mistake.id} style={styles.mistakeCard}>
              <div style={styles.mistakeHeader}>
                <span style={styles.mistakeTopic}>{mistake.topicTitle}</span>
                <span style={styles.mistakeDate}>{mistake.addedAt}</span>
              </div>
              <h3 style={styles.mistakeQuestion}>{mistake.question.question}</h3>
              <div style={styles.mistakeOptions}>
                {mistake.question.options.map((opt, idx) => (
                  <div
                    key={idx}
                    style={{
                      ...styles.mistakeOption,
                      ...(idx === mistake.question.correct ? styles.mistakeOptionCorrect : {}),
                      ...(idx === mistake.userAnswer && idx !== mistake.question.correct ? styles.mistakeOptionWrong : {})
                    }}
                  >
                    {String.fromCharCode(65 + idx)}. {opt}
                  </div>
                ))}
              </div>
              <div style={styles.mistakeExplanation}>
                💡 {mistake.question.explanation}
              </div>
              <button
                onClick={() => removeFromMistakeBook(mistake.questionId)}
                style={styles.removeMistakeButton}
              >
                ✓ 已掌握，移除错题本
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderHistory = () => (
    <div>
      <h2 style={styles.sectionTitle}>📊 做题记录</h2>
      {practiceHistory.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📝</div>
          <p style={styles.emptyText}>还没有做题记录</p>
          <p style={styles.emptyDesc}>快去开始练习吧！</p>
        </div>
      ) : (
        <div style={styles.historyStats}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{practiceHistory.length}</span>
            <span style={styles.statLabel}>总答题数</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{practiceHistory.filter(h => h.isCorrect).length}</span>
            <span style={styles.statLabel}>正确数</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>
              {practiceHistory.length > 0
                ? Math.round((practiceHistory.filter(h => h.isCorrect).length / practiceHistory.length) * 100)
                : 0}%
            </span>
            <span style={styles.statLabel}>正确率</span>
          </div>
        </div>
      )}

      {practiceHistory.length > 0 && (
        <div style={styles.historyList}>
          {practiceHistory.map((item) => (
            <div key={item.id} style={styles.historyCard}>
              <div style={styles.historyHeader}>
                <span style={styles.historyTopic}>{item.topicTitle}</span>
                <span style={{
                  ...styles.historyResult,
                  color: item.isCorrect ? '#4caf50' : '#f44336'
                }}>
                  {item.isCorrect ? '✅ 正确' : '❌ 错误'}
                </span>
              </div>
              <p style={styles.historyQuestion}>{item.question}</p>
              <div style={styles.historyFooter}>
                <span style={styles.historyDate}>{item.timestamp}</span>
                <span style={styles.historyAnswer}>
                  你的答案: {String.fromCharCode(65 + item.userAnswer)} |
                  正确答案: {String.fromCharCode(65 + item.correctAnswer)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.tabNav}>
        <button
          onClick={() => { setActiveTab('topics'); setSelectedTopic(null); }}
          style={{ ...styles.tab, ...(activeTab === 'topics' ? styles.tabActive : {}) }}
        >
          📚 章节练习
        </button>
        <button
          onClick={() => { setActiveTab('quiz'); if (selectedTopic) setSelectedTopic(selectedTopic); }}
          style={{ ...styles.tab, ...(activeTab === 'quiz' ? styles.tabActive : {}) }}
        >
          📝 当前答题
        </button>
        <button
          onClick={() => setActiveTab('mistakes')}
          style={{ ...styles.tab, ...(activeTab === 'mistakes' ? styles.tabActive : {}) }}
        >
          ❌ 错题本
        </button>
        <button
          onClick={() => setActiveTab('history')}
          style={{ ...styles.tab, ...(activeTab === 'history' ? styles.tabActive : {}) }}
        >
          📊 历史记录
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === 'topics' && renderTopicsList()}
        {activeTab === 'quiz' && renderQuiz()}
        {activeTab === 'mistakes' && renderMistakeBook()}
        {activeTab === 'history' && renderHistory()}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '24px'
  },
  tabNav: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  tab: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    background: '#f0f0f0',
    color: '#666',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  tabActive: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#333',
    marginBottom: '24px'
  },
  topicGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px'
  },
  topicCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  topicHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  topicNumber: {
    fontSize: '12px',
    color: '#999',
    fontWeight: 500
  },
  topicProgress: {
    fontSize: '12px',
    color: '#4caf50',
    fontWeight: 500
  },
  topicTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#333',
    marginBottom: '8px'
  },
  topicCount: {
    fontSize: '13px',
    color: '#888'
  },
  quizContainer: {},
  quizHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px'
  },
  backButton: {
    padding: '8px 16px',
    background: '#f0f0f0',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  quizTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#333',
    flex: 1,
    textAlign: 'center'
  },
  quizActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  quizCount: {
    fontSize: '14px',
    color: '#666'
  },
  resetButton: {
    padding: '8px 16px',
    background: '#fff3e0',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#ff9800'
  },
  questionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  questionCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  questionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px'
  },
  questionNumber: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#667eea'
  },
  questionStatus: {
    fontSize: '14px',
    fontWeight: 600
  },
  questionText: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#333',
    marginBottom: '16px'
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  option: {
    padding: '12px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    background: 'white',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '14px',
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-start',
    transition: 'all 0.2s'
  },
  optionSelected: {
    borderColor: '#667eea',
    background: '#f3e5f5'
  },
  optionCorrect: {
    borderColor: '#4caf50',
    background: '#e8f5e9'
  },
  optionWrong: {
    borderColor: '#f44336',
    background: '#ffebee'
  },
  optionLabel: {
    fontWeight: 600,
    color: '#666'
  },
  submitButton: {
    marginTop: '16px',
    padding: '10px 24px',
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
  explanation: {
    marginTop: '16px',
    padding: '12px 16px',
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
  explanationText: {
    margin: 0
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px'
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '16px'
  },
  emptyText: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '8px'
  },
  emptyDesc: {
    fontSize: '14px',
    color: '#999'
  },
  mistakeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  mistakeCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    borderLeft: '4px solid #f44336'
  },
  mistakeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px'
  },
  mistakeTopic: {
    fontSize: '13px',
    color: '#667eea',
    fontWeight: 600
  },
  mistakeDate: {
    fontSize: '12px',
    color: '#999'
  },
  mistakeQuestion: {
    fontSize: '15px',
    fontWeight: 500,
    color: '#333',
    marginBottom: '12px'
  },
  mistakeOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '12px'
  },
  mistakeOption: {
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    background: '#f9f9f9'
  },
  mistakeOptionCorrect: {
    background: '#e8f5e9',
    color: '#2e7d32'
  },
  mistakeOptionWrong: {
    background: '#ffebee',
    color: '#c62828'
  },
  mistakeExplanation: {
    padding: '10px 14px',
    background: '#fff3e0',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#e65100',
    marginBottom: '12px'
  },
  removeMistakeButton: {
    padding: '8px 16px',
    background: '#e8f5e9',
    color: '#2e7d32',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  historyStats: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  statItem: {
    flex: 1,
    minWidth: '120px',
    padding: '20px',
    background: 'white',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#667eea',
    display: 'block',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '13px',
    color: '#666'
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  historyCard: {
    background: 'white',
    borderRadius: '10px',
    padding: '16px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
  },
  historyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },
  historyTopic: {
    fontSize: '13px',
    color: '#667eea',
    fontWeight: 600
  },
  historyResult: {
    fontSize: '13px',
    fontWeight: 600
  },
  historyQuestion: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '8px'
  },
  historyFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '8px'
  },
  historyDate: {
    fontSize: '12px',
    color: '#999'
  },
  historyAnswer: {
    fontSize: '12px',
    color: '#666'
  }
};
