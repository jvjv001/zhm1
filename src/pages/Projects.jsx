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
      if (!pyodideRef.current && !pyodideLoading) {
        setPyodideLoading(true);
        try {
          if (window.loadPyodide) {
            pyodideRef.current = await window.loadPyodide({
              indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
            });
            setPyodideReady(true);
            console.log('Pyodide ready');
          }
        } catch (error) {
          console.error('Failed to load Pyodide:', error);
          setPyodideLoading(false);
        }
      }
    };

    initPyodide();
  }, []);

  useEffect(() => {
    if (selectedTask) {
      setUserCode(selectedTask.code);
      setShowAnswer(false);
      setOutput('');
    }
  }, [selectedTask]);

  const runCode = async () => {
    if (!pyodideReady || isRunning) return;

    setIsRunning(true);
    setOutput('正在运行...\n');

    try {
      pyodideRef.current.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `);

      await pyodideRef.current.runPythonAsync(userCode);

      const result = pyodideRef.current.runPython('sys.stdout.getvalue()');
      setOutput(result || '代码执行完成，无输出');

    } catch (error) {
      setOutput(`错误: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
    if (!showAnswer) {
      setUserCode(selectedTask.answer);
    } else {
      setUserCode(selectedTask.code);
    }
  };

  const handleReset = () => {
    if (confirm('确定要重置代码吗？您的更改将丢失。')) {
      setUserCode(selectedTask.code);
      setShowAnswer(false);
      setOutput('');
    }
  };

  const handleMarkComplete = () => {
    if (selectedProject && !completedProjects.includes(selectedProject.id)) {
      markProjectComplete(selectedProject.id);
      alert('🎉 恭喜完成项目！');
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
                  <div className="card">
                    <h3 style={{ marginBottom: '12px', color: '#333' }}>{selectedTask.title}</h3>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ marginBottom: '8px', color: '#555' }}>🎯 任务目标</h4>
                      <p style={{ color: '#666', lineHeight: 1.6 }}>{selectedTask.objective}</p>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ marginBottom: '8px', color: '#555' }}>💡 知识点提示</h4>
                      <p style={{ color: '#666' }}>{selectedTask.hint}</p>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ marginBottom: '8px', color: '#555' }}>📝 详细步骤</h4>
                      <ol style={{ marginLeft: '20px', color: '#666' }}>
                        {selectedTask.steps.map((step, i) => (
                          <li key={i} style={{ marginBottom: '8px', lineHeight: 1.6 }}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h4 style={{ marginBottom: '8px', color: '#555' }}>📊 预期输出</h4>
                      <div style={{
                        padding: '12px 16px',
                        background: '#f0f9ff',
                        borderRadius: '8px',
                        borderLeft: '4px solid #667eea',
                        color: '#006064'
                      }}>
                        {selectedTask.expected}
                      </div>
                    </div>
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
                        background: showAnswer ? '#f0fff4' : '#1e1e1e',
                        color: showAnswer ? '#2e7d32' : '#d4d4d4',
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
                        {showAnswer ? '👀 我的代码' : '💡 查看答案'}
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
                          fontSize: '14px',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          maxHeight: '300px',
                          overflowY: 'auto',
                          color: output.includes('错误') ? '#c62828' : '#333'
                        }}>
                          {output}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 常见错误 */}
                  <div className="card">
                    <h4 style={{ marginBottom: '12px', color: '#333' }}>⚠️ 常见错误</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedTask.commonErrors.map((error, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '12px',
                            background: '#fff3e0',
                            borderRadius: '8px',
                            borderLeft: '4px solid #ff9800',
                            color: '#e65100'
                          }}
                        >
                          {error}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};