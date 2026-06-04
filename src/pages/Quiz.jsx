import React, { useState, useEffect } from 'react';
import { fullQuestionBank } from '../data/fullQuestionBank';

export const Quiz = () => {
  const [activeTab, setActiveTab] = useState('topics');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [mistakeBook, setMistakeBook] = useState([]);
  const [practiceHistory, setPracticeHistory] = useState([]);
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'single', 'multiple', 'truefalse'

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

  // 清理答案字符串：去除首尾空格、首尾引号
  const cleanAnswer = (str) => {
    if (typeof str !== 'string') return str;
    let cleaned = str.trim();
    // 去除首尾双引号
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
      cleaned = cleaned.slice(1, -1);
    }
    // 去除首尾单引号
    if (cleaned.startsWith("'") && cleaned.endsWith("'")) {
      cleaned = cleaned.slice(1, -1);
    }
    return cleaned.trim();
  };

  const selectTopic = (topic) => {
    setSelectedTopic(topic);
    setActiveTab('quiz');
    setSelectedType('all');
  };

  // 单选题/判断题选择答案
  const selectAnswer = (questionId, optionIndex) => {
    if (submitted[questionId]) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  // 多选题选择答案
  const selectMultipleAnswer = (questionId, optionIndex) => {
    if (submitted[questionId]) return;
    setUserAnswers(prev => {
      const current = prev[questionId] || [];
      const newAnswers = current.includes(optionIndex)
        ? current.filter(i => i !== optionIndex)
        : [...current, optionIndex];
      return { ...prev, [questionId]: newAnswers };
    });
  };

  const submitQuestion = (question) => {
    const questionId = question.id;
    let isCorrect = false;

    if (question.type === 'multiple') {
      // 多选题：所有选项完全匹配才算正确
      const userAns = userAnswers[questionId] || [];
      const correctAns = question.correct || [];
      isCorrect = userAns.length === correctAns.length && 
                  userAns.every(i => correctAns.includes(i));
    } else if (question.type === 'truefalse') {
      isCorrect = userAnswers[questionId] === question.correct;
    } else {
      isCorrect = userAnswers[questionId] === question.correct;
    }

    setSubmitted(prev => ({ ...prev, [questionId]: true }));

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
      type: question.type,
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

  const getTypeLabel = (type) => {
    switch (type) {
      case 'single': return '【单选】';
      case 'truefalse': return '【判断】';
      case 'multiple': return '【多选】';
      default: return '';
    }
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

  const renderSingleQuestion = (question, qIndex) => {
    const isSubmitted = submitted[question.id];
    const userAnswer = userAnswers[question.id];
    const isCorrect = userAnswer === question.correct;

    return (
      <div key={question.id} style={styles.questionCard}>
        <div style={styles.questionHeader}>
          <span style={styles.typeTag}>【单选】</span>
          <span style={styles.questionNumber}>第 {qIndex + 1} 题</span>
          {isSubmitted && (
            <span style={{
              ...styles.questionStatus,
              color: isCorrect ? '#4caf50' : '#f44336'
            }}>
              {isCorrect ? '✅ 正确' : '❌ 错误'}
            </span>
          )}
        </div>
        <h3 style={styles.questionText}>{question.question}</h3>
        <div style={styles.optionsList}>
          {question.options.map((option, oIndex) => {
            let optionStyle = { ...styles.option };
            if (isSubmitted) {
              if (oIndex === question.correct) {
                optionStyle = { ...optionStyle, ...styles.optionCorrect };
              } else if (oIndex === userAnswer && oIndex !== question.correct) {
                optionStyle = { ...optionStyle, ...styles.optionWrong };
              }
            } else if (userAnswer === oIndex) {
              optionStyle = { ...optionStyle, ...styles.optionSelected };
            }

            return (
              <button
                key={oIndex}
                onClick={() => selectAnswer(question.id, oIndex)}
                style={optionStyle}
                disabled={isSubmitted}
              >
                <span style={styles.optionLabel}>{String.fromCharCode(65 + oIndex)}.</span>
                <span>{option}</span>
                {isSubmitted && oIndex === question.correct && ' ✓'}
                {isSubmitted && userAnswer === oIndex && oIndex !== question.correct && ' ✗'}
              </button>
            );
          })}
        </div>

        {!isSubmitted && (
          <button
            onClick={() => submitQuestion(question)}
            disabled={userAnswer === undefined}
            style={{
              ...styles.submitButton,
              ...(userAnswer === undefined ? styles.submitButtonDisabled : {})
            }}
          >
            提交答案
          </button>
        )}

        {isSubmitted && (
          <div style={{
            ...styles.explanation,
            ...(isCorrect ? styles.explanationCorrect : styles.explanationWrong)
          }}>
            <p style={styles.explanationText}>{question.explanation}</p>
          </div>
        )}
      </div>
    );
  };

  const renderTrueFalseQuestion = (question, qIndex) => {
    const isSubmitted = submitted[question.id];
    const userAnswer = userAnswers[question.id];
    const isCorrect = userAnswer === question.correct;

    return (
      <div key={question.id} style={styles.questionCard}>
        <div style={styles.questionHeader}>
          <span style={styles.typeTag}>【判断】</span>
          <span style={styles.questionNumber}>第 {qIndex + 1} 题</span>
          {isSubmitted && (
            <span style={{
              ...styles.questionStatus,
              color: isCorrect ? '#4caf50' : '#f44336'
            }}>
              {isCorrect ? '✅ 正确' : '❌ 错误'}
            </span>
          )}
        </div>
        <h3 style={styles.questionText}>{question.question}</h3>
        <div style={styles.trueFalseOptions}>
          <button
            onClick={() => selectAnswer(question.id, true)}
            style={{
              ...styles.trueFalseButton,
              ...(userAnswer === true ? styles.optionSelected : {}),
              ...(isSubmitted && question.correct === true ? styles.optionCorrect : {}),
              ...(isSubmitted && userAnswer === true && userAnswer !== question.correct ? styles.optionWrong : {})
            }}
            disabled={isSubmitted}
          >
            ✓ 正确
          </button>
          <button
            onClick={() => selectAnswer(question.id, false)}
            style={{
              ...styles.trueFalseButton,
              ...(userAnswer === false ? styles.optionSelected : {}),
              ...(isSubmitted && question.correct === false ? styles.optionCorrect : {}),
              ...(isSubmitted && userAnswer === false && userAnswer !== question.correct ? styles.optionWrong : {})
            }}
            disabled={isSubmitted}
          >
            ✗ 错误
          </button>
        </div>

        {!isSubmitted && (
          <button
            onClick={() => submitQuestion(question)}
            disabled={userAnswer === undefined}
            style={{
              ...styles.submitButton,
              ...(userAnswer === undefined ? styles.submitButtonDisabled : {})
            }}
          >
            提交答案
          </button>
        )}

        {isSubmitted && (
          <div style={{
            ...styles.explanation,
            ...(isCorrect ? styles.explanationCorrect : styles.explanationWrong)
          }}>
            <p style={styles.explanationText}>{question.explanation}</p>
          </div>
        )}
      </div>
    );
  };

  const renderMultipleQuestion = (question, qIndex) => {
    const isSubmitted = submitted[question.id];
    const userAnswer = userAnswers[question.id] || [];
    const correctAns = question.correct || [];
    const isCorrect = userAnswer.length === correctAns.length && 
                      userAnswer.every(i => correctAns.includes(i));

    return (
      <div key={question.id} style={styles.questionCard}>
        <div style={styles.questionHeader}>
          <span style={{...styles.typeTag, background: '#ff9800'}}>【多选】</span>
          <span style={styles.questionNumber}>第 {qIndex + 1} 题</span>
          {isSubmitted && (
            <span style={{
              ...styles.questionStatus,
              color: isCorrect ? '#4caf50' : '#f44336'
            }}>
              {isCorrect ? '✅ 正确' : '❌ 错误'}
            </span>
          )}
        </div>
        <h3 style={styles.questionText}>{question.question}</h3>
        <div style={styles.optionsList}>
          {question.options.map((option, oIndex) => {
            const isSelected = userAnswer.includes(oIndex);
            const isCorrectOption = correctAns.includes(oIndex);
            
            let optionStyle = { ...styles.option };
            if (isSubmitted) {
              if (isCorrectOption) {
                optionStyle = { ...optionStyle, ...styles.optionCorrect };
              } else if (isSelected && !isCorrectOption) {
                optionStyle = { ...optionStyle, ...styles.optionWrong };
              }
            } else if (isSelected) {
              optionStyle = { ...optionStyle, ...styles.optionSelected };
            }

            return (
              <button
                key={oIndex}
                onClick={() => selectMultipleAnswer(question.id, oIndex)}
                style={optionStyle}
                disabled={isSubmitted}
              >
                <span style={styles.optionLabel}>{String.fromCharCode(65 + oIndex)}.</span>
                <span>{option}</span>
                {isSubmitted && isCorrectOption && ' ✓'}
                {isSubmitted && isSelected && !isCorrectOption && ' ✗'}
              </button>
            );
          })}
        </div>

        {!isSubmitted && (
          <button
            onClick={() => submitQuestion(question)}
            disabled={userAnswer.length === 0}
            style={{
              ...styles.submitButton,
              ...(userAnswer.length === 0 ? styles.submitButtonDisabled : {})
            }}
          >
            提交答案
          </button>
        )}

        {isSubmitted && (
          <div style={{
            ...styles.explanation,
            ...(isCorrect ? styles.explanationCorrect : styles.explanationWrong)
          }}>
            <p style={styles.explanationText}>{question.explanation}</p>
          </div>
        )}
      </div>
    );
  };

  const renderQuiz = () => {
    if (!selectedTopic) return null;

    const submittedCount = Object.keys(submitted).filter(id =>
      selectedTopic.questions.find(q => q.id === id)
    ).length;

    // 根据筛选类型过滤题目
    const filteredQuestions = selectedType === 'all' 
      ? selectedTopic.questions 
      : selectedTopic.questions.filter(q => q.type === selectedType);

    // 统计各类型题目的已完成数量
    const getTypeCount = (type) => {
      return selectedTopic.questions.filter(q => q.type === type).length;
    };

    return (
      <div style={styles.quizContainer}>
        <div style={styles.quizHeader}>
          <button onClick={goBack} style={styles.backButton}>← 返回章节</button>
          <h2 style={styles.quizTitle}>{selectedTopic.topicTitle}</h2>
          <div style={styles.quizActions}>
            <span style={styles.quizCount}>
              已做 {submittedCount}/20
            </span>
            <button onClick={resetTopic} style={styles.resetButton}>🔄 重置</button>
          </div>
        </div>

        {/* 题型筛选标签 */}
        <div style={styles.typeFilter}>
          <button
            onClick={() => setSelectedType('all')}
            style={{
              ...styles.typeFilterButton,
              ...(selectedType === 'all' ? styles.typeFilterButtonActive : {})
            }}
          >
            全部(20)
          </button>
          <button
            onClick={() => setSelectedType('single')}
            style={{
              ...styles.typeFilterButton,
              ...(selectedType === 'single' ? styles.typeFilterButtonActive : {})
            }}
          >
            单选(10)
          </button>
          <button
            onClick={() => setSelectedType('multiple')}
            style={{
              ...styles.typeFilterButton,
              ...(selectedType === 'multiple' ? styles.typeFilterButtonActive : {})
            }}
          >
            多选(5)
          </button>
          <button
            onClick={() => setSelectedType('truefalse')}
            style={{
              ...styles.typeFilterButton,
              ...(selectedType === 'truefalse' ? styles.typeFilterButtonActive : {})
            }}
          >
            判断(5)
          </button>
        </div>

        <div style={styles.questionsList}>
          {filteredQuestions.map((question, qIndex) => {
            if (question.type === 'truefalse') {
              return renderTrueFalseQuestion(question, qIndex);
            } else if (question.type === 'multiple') {
              return renderMultipleQuestion(question, qIndex);
            } else {
              return renderSingleQuestion(question, qIndex);
            }
          })}
        </div>
      </div>
    );
  };

  const renderMistakeQuestion = (mistake) => {
    const question = mistake.question;
    const typeLabel = getTypeLabel(question.type);

    if (question.type === 'multiple') {
      const correctAns = question.correct || [];
      return (
        <div key={mistake.id} style={styles.mistakeCard}>
          <div style={styles.mistakeHeader}>
            <span style={styles.mistakeTopic}>{mistake.topicTitle}</span>
            <span style={styles.mistakeDate}>{mistake.addedAt}</span>
          </div>
          <h3 style={styles.mistakeQuestion}>{typeLabel} {question.question}</h3>
          <div style={styles.mistakeOptions}>
            {question.options.map((opt, idx) => {
              const isCorrectOption = correctAns.includes(idx);
              return (
                <div
                  key={idx}
                  style={{
                    ...styles.mistakeOption,
                    ...(isCorrectOption ? styles.mistakeOptionCorrect : {}),
                    ...(!isCorrectOption && Array.isArray(mistake.userAnswer) && mistake.userAnswer.includes(idx) ? styles.mistakeOptionWrong : {})
                  }}
                >
                  {String.fromCharCode(65 + idx)}. {opt} {isCorrectOption && '✓'}
                </div>
              );
            })}
          </div>
          <div style={styles.mistakeExplanation}>
            💡 {question.explanation}
          </div>
          <button
            onClick={() => removeFromMistakeBook(mistake.questionId)}
            style={styles.removeMistakeButton}
          >
            ✓ 已掌握，移除错题本
          </button>
        </div>
      );
    } else if (question.type === 'truefalse') {
      return (
        <div key={mistake.id} style={styles.mistakeCard}>
          <div style={styles.mistakeHeader}>
            <span style={styles.mistakeTopic}>{mistake.topicTitle}</span>
            <span style={styles.mistakeDate}>{mistake.addedAt}</span>
          </div>
          <h3 style={styles.mistakeQuestion}>{typeLabel} {question.question}</h3>
          <div style={styles.trueFalseOptions}>
            <div style={{
              ...styles.trueFalseDisplay,
              ...(question.correct === true ? styles.trueFalseCorrect : styles.trueFalseWrong)
            }}>
              ✓ 正确 {question.correct === true && '✓'}
            </div>
            <div style={{
              ...styles.trueFalseDisplay,
              ...(question.correct === false ? styles.trueFalseCorrect : styles.trueFalseWrong)
            }}>
              ✗ 错误 {question.correct === false && '✓'}
            </div>
          </div>
          <div style={styles.mistakeExplanation}>
            💡 {question.explanation}
          </div>
          <button
            onClick={() => removeFromMistakeBook(mistake.questionId)}
            style={styles.removeMistakeButton}
          >
            ✓ 已掌握，移除错题本
          </button>
        </div>
      );
    } else {
      return (
        <div key={mistake.id} style={styles.mistakeCard}>
          <div style={styles.mistakeHeader}>
            <span style={styles.mistakeTopic}>{mistake.topicTitle}</span>
            <span style={styles.mistakeDate}>{mistake.addedAt}</span>
          </div>
          <h3 style={styles.mistakeQuestion}>{typeLabel} {question.question}</h3>
          <div style={styles.mistakeOptions}>
            {question.options.map((opt, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.mistakeOption,
                  ...(idx === question.correct ? styles.mistakeOptionCorrect : {}),
                  ...(idx === mistake.userAnswer && idx !== question.correct ? styles.mistakeOptionWrong : {})
                }}
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </div>
            ))}
          </div>
          <div style={styles.mistakeExplanation}>
            💡 {question.explanation}
          </div>
          <button
            onClick={() => removeFromMistakeBook(mistake.questionId)}
            style={styles.removeMistakeButton}
          >
            ✓ 已掌握，移除错题本
          </button>
        </div>
      );
    }
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
          {mistakeBook.map((mistake) => renderMistakeQuestion(mistake))}
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
              <p style={styles.historyQuestion}>{getTypeLabel(item.type)} {item.question}</p>
              <div style={styles.historyFooter}>
                <span style={styles.historyDate}>{item.timestamp}</span>
                {item.type === 'multiple' ? (
                  <span style={styles.historyAnswer}>
                    你的答案: {Array.isArray(item.userAnswer) ? item.userAnswer.map(i => String.fromCharCode(65 + i)).join(', ') : item.userAnswer} |
                    正确答案: {Array.isArray(item.correctAnswer) ? item.correctAnswer.map(i => String.fromCharCode(65 + i)).join(', ') : item.correctAnswer}
                  </span>
                ) : item.type === 'truefalse' ? (
                  <span style={styles.historyAnswer}>
                    你的答案: {item.userAnswer === true ? '正确' : '错误'} |
                    正确答案: {item.correctAnswer === true ? '正确' : '错误'}
                  </span>
                ) : (
                  <span style={styles.historyAnswer}>
                    你的答案: {String.fromCharCode(65 + item.userAnswer)} |
                    正确答案: {String.fromCharCode(65 + item.correctAnswer)}
                  </span>
                )}
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
  typeFilter: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  typeFilterButton: {
    padding: '8px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '20px',
    background: 'white',
    color: '#666',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  typeFilterButtonActive: {
    borderColor: '#667eea',
    background: '#667eea',
    color: 'white'
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
    alignItems: 'center',
    marginBottom: '12px',
    gap: '8px'
  },
  typeTag: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#fff',
    background: '#667eea',
    padding: '4px 10px',
    borderRadius: '4px'
  },
  questionNumber: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#667eea'
  },
  questionStatus: {
    fontSize: '14px',
    fontWeight: 600,
    marginLeft: 'auto'
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
  trueFalseOptions: {
    display: 'flex',
    gap: '12px'
  },
  trueFalseButton: {
    flex: 1,
    padding: '14px 20px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    background: 'white',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 600,
    transition: 'all 0.2s'
  },
  codeBlock: {
    background: '#1e1e1e',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    overflow: 'auto'
  },
  codePre: {
    margin: 0,
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '14px',
    color: '#d4d4d4',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word'
  },
  blankInputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '16px'
  },
  blankInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  blankLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#667eea',
    minWidth: '60px'
  },
  blankInput: {
    flex: 1,
    padding: '10px 14px',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '14px',
    fontFamily: 'Consolas, Monaco, monospace'
  },
  codeActions: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px'
  },
  runButton: {
    padding: '10px 24px',
    background: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600
  },
  codeOutput: {
    background: '#f5f5f5',
    borderRadius: '8px',
    padding: '12px',
    marginTop: '12px'
  },
  codeOutputLabel: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '8px'
  },
  codeOutputText: {
    margin: 0,
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '13px',
    color: '#333',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word'
  },
  correctAnswer: {
    marginTop: '12px',
    padding: '8px 12px',
    background: '#e8f5e9',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#2e7d32'
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
  trueFalseDisplay: {
    flex: 1,
    padding: '12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    textAlign: 'center'
  },
  trueFalseCorrect: {
    background: '#e8f5e9',
    color: '#2e7d32'
  },
  trueFalseWrong: {
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
