import React, { useState, useEffect, useRef } from 'react';
import { projectsData } from '../data/projectsData';
import { useLearningStore } from '../store/useLearningStore';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [pyodideLoading, setPyodideLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const pyodideRef = useRef(null);
  const { completedProjects, markProjectComplete } = useLearningStore();

  useEffect(() => {
    const initPyodide = async () => {
      if (!pyodideRef.current && !pyodideLoading && window.loadPyodide) {
        setPyodideLoading(true);
        try {
          console.log('正在加载 Pyodide...');
          pyodideRef.current = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
          });
          // 初始化标准输出捕获
          await pyodideRef.current.runPythonAsync(`
import sys
from io import StringIO
          `);
          setPyodideReady(true);
          console.log('Pyodide 加载完成!');
        } catch (error) {
          console.error('Pyodide 加载失败:', error);
          setPyodideLoading(false);
          setOutput(`⚠️ Pyodide 加载失败: ${error.message}\n请刷新页面重试。`);
        }
      }
    };

    initPyodide();
  }, []);

  useEffect(() => {
    if (selectedTask) {
      setUserCode(selectedTask.codeTemplate || '');
      setShowAnswer(false);
      setOutput('');
    }
  }, [selectedTask]);

  const runCode = async () => {
    if (!pyodideReady || isRunning) {
      if (!pyodideReady) {
        setOutput('⚠️ Pyodide 还未加载完成，请稍候...');
      }
      return;
    }

    setIsRunning(true);
    setOutput('🚀 正在运行代码...\n');

    try {
      // 每次运行前重置输出捕获
      await pyodideRef.current.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `);

      // 执行用户代码
      await pyodideRef.current.runPythonAsync(userCode);

      // 获取输出结果
      const result = await pyodideRef.current.runPythonAsync('sys.stdout.getvalue()');
      if (result) {
        setOutput(result);
      } else {
        setOutput('✅ 代码执行完成，无输出');
      }

    } catch (error) {
      console.error('代码执行错误:', error);
      let errorMsg = '';

      // 尝试解析 Python 错误信息
      const errorStr = String(error.message || error);
      const pythonErrorMatch = errorStr.match(/File "<exec>", line (\d+)/);

      if (pythonErrorMatch) {
        // 提取行号
        const lineNum = pythonErrorMatch[1];
        // 尝试提取错误类型和描述
        const lines = errorStr.split('\n');
        let errorType = 'Error';
        let errorDesc = errorStr;

        // 查找错误类型
        for (const line of lines) {
          if (line.includes('NameError')) {
            errorType = 'NameError';
            break;
          } else if (line.includes('SyntaxError')) {
            errorType = 'SyntaxError';
            break;
          } else if (line.includes('TypeError')) {
            errorType = 'TypeError';
            break;
          } else if (line.includes('IndentationError')) {
            errorType = 'IndentationError';
            break;
          } else if (line.includes('IndexError')) {
            errorType = 'IndexError';
            break;
          } else if (line.includes('KeyError')) {
            errorType = 'KeyError';
            break;
          }
        }

        // 清理错误消息，保留关键信息
        errorDesc = lines.filter(l => l.trim()).slice(-3).join('\n');

        errorMsg = `❌ ${errorType}\n`;
        errorMsg += `📍 位置: 第 ${lineNum} 行\n`;
        errorMsg += `📋 详情:\n${errorDesc}`;
      } else if (error.name === 'PythonError') {
        // 对于其他 Python 错误，尝试格式化
        const lines = errorStr.split('\n').filter(l => l.trim());
        if (lines.length > 0) {
          errorMsg = `❌ Python 错误\n`;
          errorMsg += `📋 详情:\n${lines.slice(-5).join('\n')}`;
        } else {
          errorMsg = `❌ 错误: ${errorStr}`;
        }
      } else {
        errorMsg = `❌ ${error.name || 'Unknown Error'}: ${error.message || errorStr}`;
      }

      setOutput(errorMsg);
    } finally {
      setIsRunning(false);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleReset = () => {
    if (confirm('确定要重置代码吗？您的更改将丢失。')) {
      setUserCode(selectedTask.codeTemplate || '');
      setShowAnswer(false);
      setOutput('');
    }
  };

  const handleMarkComplete = () => {
    if (selectedProject && !completedProjects.includes(selectedProject.id)) {
      markProjectComplete(selectedProject.id);
      alert('🎉 恭喜完成项目!');
    }
  };

  const isProjectCompleted = (projectId) => completedProjects.includes(projectId);

  return (
    <div>
      <div className="card">
        <h2 style={{ marginBottom: '8px', color: '#333' }}>💻 编程项目</h2>
        <p style={{ color: '#666' }}>选择项目开始学习，每个项目包含详细的步骤指导和在线代码运行环境</p>
      </div>

      <div className="card" style={{ marginTop: '16px' }}>
        <h3 style={{ marginBottom: '16px', color: '#333' }}>📚 项目列表</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {projectsData.map((project) => (
            <button
              key={project.id}
              onClick={() => {
                setSelectedProject(project);
                setSelectedTask(project.tasks[0]);
              }}
              style={{
                padding: '16px',
                border: selectedProject?.id === project.id ? '2px solid #667eea' : '1px solid #ddd',
                borderRadius: '12px',
                background: selectedProject?.id === project.id ? '#f3e5f5' : 'white',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (selectedProject?.id !== project.id) {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedProject?.id !== project.id) {
                  e.currentTarget.style.borderColor = '#ddd';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  fontSize: '32px',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isProjectCompleted(project.id) ? '#e8f5e9' : '#f5f5f5',
                  borderRadius: '10px'
                }}>
                  {project.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#333', marginBottom: '4px' }}>
                    {project.title}
                  </div>
                  <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>
                    {project.description}
                  </div>
                </div>
              </div>
              {isProjectCompleted(project.id) && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#4caf50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px'
                }}>
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="card" style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ color: '#333', marginBottom: '8px' }}>
                {selectedProject.icon} {selectedProject.title}
              </h3>
              {selectedProject.scenario && (
                <div style={{
                  padding: '12px 16px',
                  background: '#fff3e0',
                  borderRadius: '8px',
                  borderLeft: '4px solid #ff9800',
                  color: '#666',
                  lineHeight: 1.6,
                  fontSize: '14px'
                }}>
                  <strong>💼 业务场景：</strong>{selectedProject.scenario}
                </div>
              )}
            </div>
            {!isProjectCompleted(selectedProject.id) && (
              <button
                className="btn btn-primary"
                onClick={handleMarkComplete}
                style={{ flexShrink: 0 }}
              >
                ✅ 标记完成
              </button>
            )}
            {isProjectCompleted(selectedProject.id) && (
              <span style={{
                padding: '8px 16px',
                background: '#e8f5e9',
                color: '#2e7d32',
                borderRadius: '8px',
                fontWeight: 500,
                flexShrink: 0
              }}>
                ✅ 已完成
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '16px' }}>
            <div>
              <h4 style={{ marginBottom: '12px', color: '#555' }}>📋 任务清单</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedProject.tasks.map((task, index) => (
                  <button
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    style={{
                      padding: '12px',
                      border: selectedTask?.id === task.id ? '2px solid #667eea' : '1px solid #ddd',
                      borderRadius: '8px',
                      background: selectedTask?.id === task.id ? '#f3e5f5' : 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontWeight: 500,
                      color: selectedTask?.id === task.id ? '#667eea' : '#333',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {index + 1}. {task.title}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedTask && (
                <>
                  {/* 任务目标 */}
                  <div className="card">
                    <h3 style={{ marginBottom: '12px', color: '#333' }}>{selectedTask.title}</h3>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ marginBottom: '8px', color: '#555' }}>🎯 任务目标</h4>
                      <p style={{ color: '#666', lineHeight: 1.6 }}>{selectedTask.objective}</p>
                    </div>

                    {/* 知识点提示 */}
                    {selectedTask.knowledgePoints && (
                      <div style={{ marginBottom: '16px' }}>
                        <h4 style={{ marginBottom: '8px', color: '#555' }}>💡 知识点提示</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {selectedTask.knowledgePoints.map((kp, idx) => (
                            <div key={idx} style={{
                              padding: '8px 12px',
                              background: '#e3f2fd',
                              borderRadius: '6px',
                              border: '1px solid #90caf9',
                              fontSize: '13px'
                            }}>
                              <code style={{ color: '#1565c0', fontWeight: 600 }}>{kp.name}</code>
                              <span style={{ color: '#424242', marginLeft: '6px' }}> - {kp.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 详细步骤 */}
                    {selectedTask.detailedSteps && (
                      <div style={{ marginBottom: '16px' }}>
                        <h4 style={{ marginBottom: '8px', color: '#555' }}>📝 详细步骤</h4>
                        {selectedTask.detailedSteps.map((step, idx) => (
                          <div key={idx} style={{
                            marginBottom: '12px',
                            padding: '12px',
                            background: '#fafafa',
                            borderRadius: '8px',
                            borderLeft: '3px solid #667eea'
                          }}>
                            <div style={{ fontWeight: 600, color: '#333', marginBottom: '6px' }}>
                              {step.stepTitle}
                            </div>
                            <p style={{ color: '#666', marginBottom: '8px', lineHeight: 1.6 }}>
                              <strong>这一步要做什么：</strong>{step.action}
                            </p>
                            {step.code && (
                              <div style={{
                                background: '#1e1e1e',
                                color: '#d4d4d4',
                                padding: '12px',
                                borderRadius: '6px',
                                fontFamily: "'Courier New', monospace",
                                fontSize: '13px',
                                overflowX: 'auto',
                                marginBottom: '8px'
                              }}>
                                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{step.code}</pre>
                              </div>
                            )}
                            <p style={{ color: '#555', fontSize: '13px', fontStyle: 'italic' }}>
                              💬 {step.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 预期输出 */}
                    {selectedTask.expectedOutput && (
                      <div style={{ marginBottom: '16px' }}>
                        <h4 style={{ marginBottom: '8px', color: '#555' }}>📊 预期输出</h4>
                        <div style={{
                          padding: '12px 16px',
                          background: '#f0f9ff',
                          borderRadius: '8px',
                          borderLeft: '4px solid #667eea',
                          color: '#006064',
                          fontFamily: "'Courier New', monospace",
                          fontSize: '13px',
                          overflowX: 'auto'
                        }}>
                          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{selectedTask.expectedOutput}</pre>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 代码编辑器 */}
                  <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ color: '#333' }}>⌨️ 代码编辑器</h4>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: '#666' }}>
                          {!pyodideReady && !pyodideLoading && '⚠️ Python环境未加载'}
                          {pyodideLoading && '⏳ 正在加载Python环境...'}
                          {pyodideReady && '✅ Python环境就绪'}
                        </span>
                      </div>
                    </div>

                    <textarea
                      value={userCode}
                      onChange={(e) => !showAnswer && setUserCode(e.target.value)}
                      style={{
                        width: '100%',
                        minHeight: '300px',
                        padding: '16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontFamily: "'Courier New', monospace",
                        fontSize: '14px',
                        resize: 'vertical',
                        background: '#1e1e1e',
                        color: '#d4d4d4',
                        lineHeight: 1.5
                      }}
                      readOnly={showAnswer}
                    />

                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                      <button
                        className="btn btn-primary"
                        onClick={runCode}
                        disabled={!pyodideReady || isRunning}
                        style={{
                          opacity: (!pyodideReady || isRunning) ? 0.5 : 1,
                          cursor: (!pyodideReady || isRunning) ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {isRunning ? '⏳ 运行中...' : '▶️ 运行代码'}
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleShowAnswer}
                      >
                        💡 查看预期输出
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleReset}
                        disabled={showAnswer}
                        style={{ opacity: showAnswer ? 0.5 : 1 }}
                      >
                        🔄 重置代码
                      </button>
                    </div>

                    {/* 输出区域 */}
                    {output && (
                      <div style={{ marginTop: '16px' }}>
                        <h4 style={{ marginBottom: '8px', color: '#333' }}>📤 运行结果</h4>
                        <div style={{
                          padding: '16px',
                          background: '#f5f5f5',
                          borderRadius: '8px',
                          border: '1px solid #ddd',
                          fontFamily: "'Courier New', monospace",
                          fontSize: '13px',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          maxHeight: '300px',
                          overflowY: 'auto',
                          color: output.includes('错误') || output.includes('❌') ? '#c62828' : '#333'
                        }}>
                          {output}
                        </div>
                      </div>
                    )}

                    {/* 显示预期输出作为答案 */}
                    {showAnswer && selectedTask.expectedOutput && (
                      <div style={{ marginTop: '16px' }}>
                        <h4 style={{ marginBottom: '8px', color: '#333' }}>✅ 预期输出 (参考)</h4>
                        <div style={{
                          padding: '16px',
                          background: '#e8f5e9',
                          borderRadius: '8px',
                          border: '1px solid #81c784',
                          fontFamily: "'Courier New', monospace",
                          fontSize: '13px',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          color: '#2e7d32'
                        }}>
                          {selectedTask.expectedOutput}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 常见错误 */}
                  {selectedTask.commonErrors && (
                    <div className="card">
                      <h4 style={{ marginBottom: '12px', color: '#333' }}>⚠️ 常见错误</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {selectedTask.commonErrors.map((error, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: '12px',
                              background: '#fff3e0',
                              borderRadius: '8px',
                              borderLeft: '4px solid #ff9800',
                              color: '#e65100'
                            }}
                          >
                            <div style={{ fontWeight: 600, marginBottom: '4px' }}>❌ {error.error}</div>
                            <div style={{ fontSize: '13px' }}>✅ 解决方法：{error.solution}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 小提示 */}
                  {selectedTask.tips && (
                    <div className="card">
                      <h4 style={{ marginBottom: '12px', color: '#333' }}>💡 小提示</h4>
                      <ul style={{ marginLeft: '20px', color: '#666' }}>
                        {selectedTask.tips.map((tip, idx) => (
                          <li key={idx} style={{ marginBottom: '6px', lineHeight: 1.6 }}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
