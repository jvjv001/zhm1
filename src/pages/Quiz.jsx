import React, { useState, useMemo } from 'react';
import { courseContent, questionBank } from '../data';
import { useLearningStore } from '../store/useLearningStore';

export const Quiz = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { quizScores, saveQuizScore } = useLearningStore();

  // 生成10道练习题（从courseContent和questionBank组合）
  const generateQuestions = (topicId) => {
    // 从courseContent获取该主题的随堂练习
    const courseTopic = courseContent.find(c => c.id === topicId);
    const topicQuestions = courseTopic ? courseTopic.questions : [];

    // 从questionBank获取该主题的测评题
    const quizData = questionBank.find(q => q.topicId === topicId);
    const quizQuestions = quizData ? quizData.questions : [];

    // 合并题目，最多取10道
    const allQuestions = [...topicQuestions, ...quizQuestions].slice(0, 10);

    // 为每道题添加分值（简单题5分，中等题7分，困难题10分）
    return allQuestions.map((q, index) => ({
      ...q,
      points: index < 3 ? 5 : index < 7 ? 7 : 10 // 前3题简单题5分，中间4题中等题7分，后3题困难题10分
    }));
  };

  const questions = useMemo(() => {
    return selectedTopic ? generateQuestions(selectedTopic) : [];
  }, [selectedTopic]);

  const startQuiz = (topicId) => {
    setSelectedTopic(topicId);
    const topicQuestions = generateQuestions(topicId);
    setSelectedQuiz(topicQuestions);
    setCurrentQuestion(0);
    setAnswers(new Array(topicQuestions.length).fill(undefined));
    setShowResults(false);
  };

  const selectAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < selectedQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishQuiz = () => {
    // 计算总分
    let totalScore = 0;
    let totalPoints = 0;

    selectedQuiz.forEach((q, i) => {
      totalPoints += q.points;
      if (answers[i] === q.correct) {
        totalScore += q.points;
      }
    });

    const percentage = Math.round((totalScore / totalPoints) * 100);

    // 保存到学习记录
    saveQuizScore(selectedTopic, percentage);
    setShowResults(true);
  };

  const getScoreForTopic = (topicId) => quizScores[topicId];

  const getTopicTitle = (topicId) => {
    const courseTopic = courseContent.find(c => c.id === topicId);
    return courseTopic ? courseTopic.title : topicId;
  };

  return (
    <div>
      {!selectedQuiz ? (
        /* 知识点选择和测验列表 */
        <div>
          <div className="card">
            <h2 style={{ marginBottom: '8px', color: '#333' }}>📝 练习测评</h2>
            <p style={{ color: '#666' }}>选择知识点开始练习测评</p>
          </div>

          {/* 知识点选择 */}
          <div className="card" style={{ marginTop: '16px' }}>
            <h3 style={{ marginBottom: '16px', color: '#333' }}>🎯 选择知识点</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '12px'
            }}>
              {courseContent.map((topic, index) => {
                const scoreData = getScoreForTopic(topic.id);
                const isSelected = selectedTopic === topic.id;

                return (
                  <button
                    key={topic.id}
                    onClick={() => startQuiz(topic.id)}
                    style={{
                      padding: '16px',
                      border: isSelected ? '2px solid #667eea' : '1px solid #ddd',
                      borderRadius: '12px',
                      background: isSelected ? '#f3e5f5' : 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#667eea';
                        e.currentTarget.style.background = '#f5f5f5';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#ddd';
                        e.currentTarget.style.background = 'white';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 600,
                        flexShrink: 0
                      }}>
                        {index + 1}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontWeight: 600,
                          color: '#333',
                          marginBottom: '4px',
                          fontSize: '14px'
                        }}>
                          {topic.title}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#666',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span>📋 10道题</span>
                          {scoreData && (
                            <span style={{
                              color: scoreData.score >= 80 ? '#4caf50' : scoreData.score >= 60 ? '#ff9800' : '#f44336',
                              fontWeight: 600
                            }}>
                              {scoreData.score}分
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '20px',
                        color: '#667eea',
                        flexShrink: 0
                      }}>
                        →
                      </div>
                    </div>
                    {scoreData && (
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: scoreData.score >= 80 ? '#4caf50' : scoreData.score >= 60 ? '#ff9800' : '#f44336'
                      }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 历史成绩 */}
          {Object.keys(quizScores).length > 0 && (
            <div className="card" style={{ marginTop: '16px' }}>
              <h3 style={{ marginBottom: '16px', color: '#333' }}>📊 历史成绩</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {Object.entries(quizScores).map(([topicId, data]) => (
                  <div
                    key={topicId}
                    style={{
                      padding: '12px 16px',
                      background: data.score >= 80 ? '#e8f5e9' : data.score >= 60 ? '#fff3e0' : '#ffebee',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: data.score >= 80 ? '#4caf50' : data.score >= 60 ? '#ff9800' : '#f44336'
                    }}
                  >
                    <div style={{ fontWeight: 600, color: '#333', marginBottom: '4px' }}>
                      {getTopicTitle(topicId)}
                    </div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: data.score >= 80 ? '#4caf50' : data.score >= 60 ? '#ff9800' : '#f44336'
                    }}>
                      {data.score}分
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : !showResults ? (
        /* 答题中 */
        <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSelectedQuiz(null);
                setSelectedTopic(null);
              }}
              style={{ marginBottom: '16px' }}
            >
              ← 返回选择知识点
            </button>
            <h3 style={{ color: '#333', marginBottom: '12px' }}>{getTopicTitle(selectedTopic)}</h3>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                <span>进度</span>
                <span>第 {currentQuestion + 1} / {selectedQuiz.length} 题</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${((currentQuestion + 1) / selectedQuiz.length) * 100}%` }}
                />
              </div>
              <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#999' }}>
                <span>本题分值: {selectedQuiz[currentQuestion].points}分</span>
                <span>总分: 100分</span>
              </div>
            </div>
          </div>

          {(() => {
            const q = selectedQuiz[currentQuestion];
            const userAnswer = answers[currentQuestion];

            return (
              <div>
                <h4 style={{ marginBottom: '20px', color: '#333', fontSize: '18px' }}>
                  {currentQuestion + 1}. {q.text || q.question}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => selectAnswer(i)}
                      style={{
                        padding: '16px 20px',
                        border: userAnswer === i ? '2px solid #667eea' : '1px solid #ddd',
                        borderRadius: '12px',
                        background: userAnswer === i ? '#f3e5f5' : 'white',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '15px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (userAnswer !== i) {
                          e.currentTarget.style.borderColor = '#667eea';
                          e.currentTarget.style.background = '#f5f5f5';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (userAnswer !== i) {
                          e.currentTarget.style.borderColor = '#ddd';
                          e.currentTarget.style.background = 'white';
                        }
                      }}
                    >
                      <span style={{ fontWeight: 600, marginRight: '10px', color: '#667eea' }}>
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {currentQuestion > 0 && (
                    <button
                      className="btn btn-secondary"
                      onClick={previousQuestion}
                    >
                      ← 上一题
                    </button>
                  )}
                  <div style={{ flex: 1 }} />
                  <button
                    className="btn btn-primary"
                    onClick={nextQuestion}
                    disabled={userAnswer === undefined}
                    style={{
                      opacity: userAnswer === undefined ? 0.5 : 1,
                      cursor: userAnswer === undefined ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {currentQuestion === selectedQuiz.length - 1 ? '🏁 完成测评' : '下一题 →'}
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      ) : (
        /* 结果展示 */
        <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSelectedQuiz(null);
              setSelectedTopic(null);
            }}
            style={{ marginBottom: '24px' }}
          >
            ← 返回选择知识点
          </button>

          {(() => {
            // 计算总分
            let totalScore = 0;
            let totalPoints = 0;
            let correctCount = 0;

            selectedQuiz.forEach((q, i) => {
              totalPoints += q.points;
              if (answers[i] === q.correct) {
                totalScore += q.points;
                correctCount++;
              }
            });

            const percentage = Math.round((totalScore / totalPoints) * 100);
            const scoreColor = percentage >= 80 ? '#4caf50' : percentage >= 60 ? '#ff9800' : '#f44336';

            return (
              <>
                <div style={{ textAlign: 'center', padding: '20px 0 40px' }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>
                    {percentage >= 80 ? '🎉' : percentage >= 60 ? '💪' : '📚'}
                  </div>
                  <h2 style={{ color: '#333', marginBottom: '8px' }}>测评完成！</h2>
                  <div style={{
                    fontSize: '64px',
                    fontWeight: 700,
                    color: scoreColor,
                    marginBottom: '8px'
                  }}>
                    {percentage}分
                  </div>
                  <p style={{ color: '#666', fontSize: '16px', marginBottom: '16px' }}>
                    {percentage >= 80 ? '太棒了！继续保持！' : percentage >= 60 ? '不错！再接再厉！' : '加油！多多练习！'}
                  </p>
                  <div style={{ display: 'inline-flex', gap: '24px', padding: '16px 32px', background: '#f5f5f5', borderRadius: '12px' }}>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: '#333' }}>{correctCount}</div>
                      <div style={{ fontSize: '13px', color: '#666' }}>正确题数</div>
                    </div>
                    <div style={{ width: '1px', background: '#ddd' }} />
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: '#333' }}>{selectedQuiz.length}</div>
                      <div style={{ fontSize: '13px', color: '#666' }}>总题数</div>
                    </div>
                    <div style={{ width: '1px', background: '#ddd' }} />
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: scoreColor }}>{totalScore}</div>
                      <div style={{ fontSize: '13px', color: '#666' }}>获得分数</div>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #eee', paddingTop: '24px' }}>
                  <h3 style={{ marginBottom: '20px', color: '#333' }}>📋 答案解析</h3>
                  {selectedQuiz.map((q, i) => {
                    const isCorrect = answers[i] === q.correct;
                    const earnedPoints = isCorrect ? q.points : 0;

                    return (
                      <div
                        key={q.id || i}
                        style={{
                          marginBottom: '24px',
                          paddingBottom: '24px',
                          borderBottom: i < selectedQuiz.length - 1 ? '1px solid #eee' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                          <span style={{ fontSize: '24px' }}>
                            {isCorrect ? '✅' : '❌'}
                          </span>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: 600, color: '#333', margin: 0 }}>
                              {i + 1}. {q.text || q.question}
                            </p>
                            <span style={{
                              fontSize: '12px',
                              color: isCorrect ? '#4caf50' : '#f44336',
                              fontWeight: 600
                            }}>
                              {earnedPoints}/{q.points}分
                            </span>
                          </div>
                        </div>
                        <div style={{ marginLeft: '34px' }}>
                          {q.options.map((opt, j) => (
                            <div
                              key={j}
                              style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                marginBottom: '6px',
                                background: j === q.correct
                                  ? '#e8f5e9'
                                  : (answers[i] === j && j !== q.correct) ? '#ffebee' : 'transparent',
                                color: j === q.correct
                                  ? '#2e7d32'
                                  : (answers[i] === j && j !== q.correct) ? '#c62828' : '#666',
                                fontWeight: j === q.correct || answers[i] === j ? 600 : 400
                              }}
                            >
                              {String.fromCharCode(65 + j)}. {opt}
                              {j === q.correct && ' ✓'}
                              {answers[i] === j && j !== q.correct && ' ✗ 你的选择'}
                            </div>
                          ))}
                          <div style={{
                            marginTop: '12px',
                            padding: '12px 16px',
                            background: '#f5f5f5',
                            borderRadius: '8px',
                            borderLeft: '4px solid #667eea',
                            color: '#666',
                            lineHeight: 1.6
                          }}>
                            💡 {q.explanation}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => startQuiz(selectedTopic)}
                  >
                    🔄 重新测评
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedQuiz(null);
                      setSelectedTopic(null);
                    }}
                  >
                    📚 选择其他知识点
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};