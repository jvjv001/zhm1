import React, { useState, useEffect, useRef } from 'react';
import { courseContent } from '../data';

// 数字滚动动画组件
const AnimatedCounter = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // 使用easeOutExpo缓动
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeProgress * target));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

export const Home = ({ setActivePage }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  // 从localStorage读取练习数据
  const savedQuizAnswers = JSON.parse(localStorage.getItem('dailyQuizAnswers') || '{}');
  const savedQuizSubmissions = JSON.parse(localStorage.getItem('dailyQuizSubmissions') || '[]');
  
  const [quizAnswers, setQuizAnswers] = useState(savedQuizAnswers);
  const [quizSubmissions, setQuizSubmissions] = useState(new Set(savedQuizSubmissions));
  const [code, setCode] = useState(`import pandas as pd

# 创建Series
s = pd.Series([1, 2, 3, 4, 5])
print("创建的Series:", s)

# 创建DataFrame
df = pd.DataFrame({
    '姓名': ['张三', '李四', '王五'],
    '年龄': [25, 30, 35]
})
print("\\n创建的DataFrame:")
print(df)`);
  const [output, setOutput] = useState("");
  const [pyodideStatus, setPyodideStatus] = useState("loading");
  const [pyodide, setPyodide] = useState(null);

  // 加载Pyodide
  useEffect(() => {
    const loadPyodideEngine = async () => {
      try {
        setPyodideStatus("loading");
        setOutput("正在加载 Python 环境，请稍候...\n（首次加载约需5-10秒）\n");
        
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
        script.async = true;
        
        script.onload = async () => {
          try {
            // @ts-ignore
            const pyodideInstance = await window.loadPyodide();
            
            // 加载 pandas 和 numpy 包
            setOutput("正在安装数据分析库（pandas、numpy）...\n这可能需要一些时间...\n");
            
            try {
              await pyodideInstance.loadPackage(['pandas', 'numpy']);
            } catch (pkgErr) {
              console.warn("包加载警告（不影响基础功能）:", pkgErr);
            }
            
            setPyodide(pyodideInstance);
            setPyodideStatus("ready");
            setOutput("✅ Python 环境已就绪！\n已支持 Pandas、NumPy 等数据分析库\n\n示例代码已准备就绪，点击运行按钮开始体验。");
          } catch (err) {
            setPyodideStatus("error");
            setOutput(`❌ Python 环境加载失败: ${err}`);
          }
        };
        
        script.onerror = () => {
          setPyodideStatus("error");
          setOutput("❌ 无法加载 Pyodide，请检查网络连接。");
        };
        
        document.head.appendChild(script);
      } catch (err) {
        setPyodideStatus("error");
        setOutput(`❌ 初始化失败: ${err}`);
      }
    };
    
    loadPyodideEngine();
  }, []);

  const dailyQuizQuestions = [
    {
      id: 1,
      title: 'Pandas入门',
      text: 'Pandas中用于创建一维带标签数组的结构是？',
      options: ['DataFrame', 'Series', 'Array', 'List'],
      correct: 1,
      explanation: 'Series就是Pandas中的一维带标签数组。DataFrame是二维的，Array和List不是Pandas原生结构。'
    },
    {
      id: 2,
      title: 'Python基础',
      text: '以下哪个是Python中正确的列表定义方式？',
      options: ['list = [1, 2, 3]', 'list = (1, 2, 3)', 'list = {1, 2, 3}', 'list = <1, 2, 3>'],
      correct: 0,
      explanation: '使用方括号 [] 是Python中定义列表的正确方式。()是元组，{}是字典/集合。'
    },
    {
      id: 3,
      title: 'DataFrame操作',
      text: '如何获取DataFrame df的行数和列数？',
      options: ['df.size()', 'df.shape', 'df.count()', 'df.dimension'],
      correct: 2,
      explanation: 'df.shape 返回一个元组 (行数, 列数)，是获取DataFrame维度的正确方式。'
    }
  ];

  const handleQuizSubmit = (questionId) => {
    const selectedOption = quizAnswers[questionId];
    if (selectedOption !== undefined && !quizSubmissions.has(questionId)) {
      const newSubmissions = new Set([...quizSubmissions, questionId]);
      setQuizSubmissions(newSubmissions);
      // 保存到localStorage
      localStorage.setItem('dailyQuizSubmissions', JSON.stringify([...newSubmissions]));
    }
  };

  const handleQuizAnswerChange = (questionId, optionIndex) => {
    const newAnswers = { ...quizAnswers, [questionId]: optionIndex };
    setQuizAnswers(newAnswers);
    localStorage.setItem('dailyQuizAnswers', JSON.stringify(newAnswers));
  };

  const handleResetQuiz = () => {
    if (confirm('确定要重置所有练习吗？')) {
      setQuizAnswers({});
      setQuizSubmissions(new Set());
      localStorage.removeItem('dailyQuizAnswers');
      localStorage.removeItem('dailyQuizSubmissions');
    }
  };

  const handleRunCode = async () => {
    if (pyodideStatus !== "ready") {
      setOutput("⚠️ Python 环境还在加载中，请稍候...");
      return;
    }
    
    setOutput("正在执行代码...\n");
    
    try {
      // 使用Pyodide执行代码
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
`);
      
      await pyodide.runPythonAsync(code);
      
      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      const result = stdout.trim();
      
      if (result) {
        setOutput(`✅ 执行成功！\n\n${result}`);
      } else {
        setOutput(`✅ 执行成功！\n\n（代码已执行，但没有 print 输出）`);
      }
    } catch (err) {
      setOutput(`❌ 执行出错：\n\n${err.message || err}`);
    }
  };

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

  // 学习路线步骤
  const learningSteps = [
    { step: 1, title: '基础语法', desc: 'Python入门与数据类型', icon: '📚' },
    { step: 2, title: '数据处理', desc: 'Pandas数据框操作', icon: '🔧' },
    { step: 3, title: '分析实战', desc: '数据分析与可视化', icon: '📊' },
    { step: 4, title: '项目作品', desc: '独立完成实战项目', icon: '🎯' }
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

      {/* 学习数据统计 - 大字体统计卡片 */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              <AnimatedCounter target={12} suffix="个" />
            </div>
            <div style={styles.statLabel}>知识点</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              <AnimatedCounter target={10} suffix="个" />
            </div>
            <div style={styles.statLabel}>编程项目</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              <AnimatedCounter target={3} suffix="+道" />
            </div>
            <div style={styles.statLabel}>每日练习</div>
          </div>
        </div>
      </section>

      {/* 学习路线 */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>学习路线</h2>
        <div style={styles.learningPathContainer}>
          {learningSteps.map((item, index) => (
            <React.Fragment key={item.step}>
              <div style={styles.learningStep}>
                <div style={styles.stepIcon}>{item.icon}</div>
                <div style={styles.stepNumber}>第{item.step}步</div>
                <div style={styles.stepTitle}>{item.title}</div>
                <div style={styles.stepDesc}>{item.desc}</div>
              </div>
              {index < learningSteps.length - 1 && (
                <div style={styles.stepArrow}>→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 每日一练 */}
      <section style={styles.section}>
        <div style={styles.quizHeader}>
          <h2 style={styles.sectionTitle}>📝 每日一练</h2>
          <div style={styles.quizHeaderRight}>
            <div style={styles.quizProgress}>
              <span style={styles.quizProgressIcon}>
                {quizSubmissions.size === dailyQuizQuestions.length ? '🎉' : '📊'}
              </span>
              当前完成：{quizSubmissions.size} / {dailyQuizQuestions.length} 题
            </div>
            {quizSubmissions.size > 0 && (
              <button onClick={handleResetQuiz} style={styles.quizResetButton}>
                🔄 重置所有
              </button>
            )}
          </div>
        </div>
        <div style={styles.quizContainer}>
          {dailyQuizQuestions.map((question, idx) => {
            const isCompleted = quizSubmissions.has(question.id);
            const userAnswer = quizAnswers[question.id];
            const isCorrect = isCompleted && userAnswer === question.correct;
            return (
              <div
                key={question.id}
                style={{
                  ...styles.quizCard,
                  ...(isCompleted ? styles.quizCardCompleted : {})
                }}
              >
                <div style={styles.quizQuestionHeader}>
                  <span style={styles.quizNumber}>
                    {isCompleted ? (isCorrect ? '✅' : '❌') : '⚪'} 第 {idx + 1} 题
                  </span>
                  <span style={styles.quizTopic}>{question.title}</span>
                  {isCompleted && (
                    <span style={{
                      ...styles.quizCompleted,
                      color: isCorrect ? '#4caf50' : '#f44336'
                    }}>
                      {isCorrect ? '已答对' : '已答题'}
                    </span>
                  )}
                </div>
                <h3 style={styles.quizQuestion}>{question.text}</h3>
                <div style={styles.quizOptions}>
                  {question.options.map((option, optIdx) => {
                    const finalStyle = { ...styles.quizOption };
                    
                    if (isCompleted) {
                      if (optIdx === question.correct) {
                        Object.assign(finalStyle, styles.quizOptionCorrect);
                      } else if (userAnswer === optIdx && optIdx !== question.correct) {
                        Object.assign(finalStyle, styles.quizOptionWrong);
                      }
                      Object.assign(finalStyle, styles.quizOptionDisabled);
                    } else if (userAnswer === optIdx) {
                      Object.assign(finalStyle, styles.quizOptionSelected);
                    }
                    
                    return (
                      <label
                        key={optIdx}
                        style={finalStyle}
                      >
                        <input
                          type="radio"
                          name={`quiz-${question.id}`}
                          value={optIdx}
                          checked={userAnswer === optIdx}
                          onChange={() => !isCompleted && handleQuizAnswerChange(question.id, optIdx)}
                          style={{
                            ...styles.quizRadio,
                            ...(isCompleted ? styles.quizRadioDisabled : {})
                          }}
                          disabled={isCompleted}
                        />
                        <span style={styles.quizOptionLabel}>
                          {String.fromCharCode(65 + optIdx)}. {option}
                          {isCompleted && optIdx === question.correct && ' ✓'}
                          {isCompleted && userAnswer === optIdx && optIdx !== question.correct && ' ✗'}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <button
                  onClick={() => handleQuizSubmit(question.id)}
                  style={{
                    ...styles.quizSubmitButton,
                    ...(isCompleted ? styles.quizSubmitButtonDisabled : {})
                  }}
                  disabled={
                    userAnswer === undefined || isCompleted
                  }
                >
                  {isCompleted ? '已提交' : '提交答案'}
                </button>
                {isCompleted && (
                  <div style={{
                    ...styles.quizFeedback,
                    ...(isCorrect ? styles.quizFeedbackCorrect : styles.quizFeedbackWrong)
                  }}>
                    {isCorrect ? (
                      <>✅ 回答正确！{question.explanation}</>
                    ) : (
                      <>❌ 回答错误。正确答案是 {String.fromCharCode(65 + question.correct)}（{question.options[question.correct]}）。{question.explanation}</>
                    )}
                  </div>
                )}
              </div>
            );
          })}
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
              {/* 查看详情按钮 */}
              <a
                href="#0"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedProject(project);
                }}
                style={styles.viewDetailLink}
              >
                查看详情 »
              </a>
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

      {/* 在线代码运行演示 */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🐍 在线体验区</h2>
        <div style={styles.codeRunnerContainer}>
          <div style={styles.codeEditorSection}>
            <div style={styles.codeEditorHeader}>
              <span>代码编辑器</span>
              <button
                onClick={handleRunCode}
                style={styles.runButton}
              >
                ▶ 运行
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={styles.codeEditor}
              spellCheck={false}
            />
          </div>
          <div style={styles.outputSection}>
            <div style={styles.outputHeader}>输出结果</div>
            <pre style={styles.outputBox}>{output || "等待运行..."}</pre>
          </div>
        </div>
        <p style={styles.codeRunnerNote}>
          ✅ 真实 Python 环境（支持 Pandas、Numpy 等库）
        </p>
      </section>

      {/* 页脚 */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <span style={styles.footerLogoIcon}>🐼</span>
            <span style={styles.footerLogoText}>PandaLearn</span>
          </div>
          <div style={styles.footerInfo}>
            <p>© 2024 PandaLearn - 商务数据分析在线教育平台</p>
            <p>联系我们: support@pandalearn.com</p>
          </div>
          <div style={styles.footerLinks}>
            <a href="#0" style={styles.footerLink}>使用条款</a>
            <span style={styles.footerDivider}>|</span>
            <a href="#0" style={styles.footerLink}>隐私政策</a>
            <span style={styles.footerDivider}>|</span>
            <a href="#0" style={styles.footerLink}>帮助中心</a>
          </div>
        </div>
      </footer>

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
  // 学习数据统计 - 大字体卡片
  statsSection: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '60px 24px',
    margin: '20px 0'
  },
  statsContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
    textAlign: 'center'
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '32px 24px',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  statNumber: {
    fontSize: 'clamp(42px, 6vw, 56px)',
    fontWeight: 700,
    color: 'white',
    lineHeight: 1.2,
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  },
  statLabel: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: '8px',
    fontWeight: 500
  },
  // 学习路线
  learningPathContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '16px'
  },
  learningStep: {
    background: 'white',
    borderRadius: '16px',
    padding: '28px 24px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    minWidth: '180px',
    flex: '1',
    maxWidth: '220px'
  },
  stepIcon: {
    fontSize: '40px',
    marginBottom: '12px'
  },
  stepNumber: {
    fontSize: '12px',
    color: '#667eea',
    fontWeight: 600,
    textTransform: 'uppercase',
    marginBottom: '8px'
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#333',
    marginBottom: '4px'
  },
  stepDesc: {
    fontSize: '13px',
    color: '#888'
  },
  stepArrow: {
    fontSize: '28px',
    color: '#667eea',
    fontWeight: 300,
    flexShrink: 0
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
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column'
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
    marginBottom: '16px',
    flex: 1
  },
  projectDifficulty: {
    display: 'inline-block',
    padding: '4px 12px',
    background: '#f3e5f5',
    color: '#764ba2',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500,
    marginBottom: '16px',
    alignSelf: 'flex-start'
  },
  viewDetailLink: {
    color: '#667eea',
    fontSize: '14px',
    fontWeight: 600,
    textDecoration: 'none',
    padding: '8px 0',
    borderTop: '1px solid #f0f0f0',
    marginTop: 'auto',
    transition: 'color 0.2s ease'
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
  },
  // 页脚
  footer: {
    background: '#2d2d3a',
    color: 'white',
    padding: '40px 24px'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center'
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '20px'
  },
  footerLogoIcon: {
    fontSize: '28px'
  },
  footerLogoText: {
    fontSize: '22px',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  footerInfo: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '16px',
    lineHeight: 1.8
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    flexWrap: 'wrap'
  },
  footerLink: {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s ease'
  },
  footerDivider: {
    color: 'rgba(255, 255, 255, 0.4)'
  },
  // 每日一练样式
  quizHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '24px'
  },
  quizHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  },
  quizProgress: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#667eea',
    background: '#f3e5f5',
    padding: '8px 20px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  quizProgressIcon: {
    fontSize: '18px'
  },
  quizResetButton: {
    padding: '8px 18px',
    background: '#fff3e0',
    color: '#f57c00',
    border: '1px solid #ffcc80',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  quizContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  quizCard: {
    background: '#f5f5f5',
    borderRadius: '16px',
    padding: '28px 28px 24px',
    transition: 'all 0.3s ease'
  },
  quizCardCompleted: {
    background: 'rgba(76, 175, 80, 0.08)',
    border: '1px solid rgba(76, 175, 80, 0.3)'
  },
  quizQuestionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  },
  quizNumber: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#667eea',
    background: 'white',
    padding: '6px 14px',
    borderRadius: '8px'
  },
  quizTopic: {
    fontSize: '14px',
    color: '#777',
    background: '#e8e8e8',
    padding: '6px 14px',
    borderRadius: '8px'
  },
  quizCompleted: {
    marginLeft: 'auto',
    fontSize: '13px',
    fontWeight: 600,
    color: '#4caf50'
  },
  quizQuestion: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#333',
    marginBottom: '20px',
    lineHeight: 1.5
  },
  quizOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px'
  },
  quizOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 18px',
    background: 'white',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid #e0e0e0'
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
  quizOptionDisabled: {
    cursor: 'not-allowed',
    opacity: 0.8
  },
  quizRadio: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    accentColor: '#667eea'
  },
  quizRadioDisabled: {
    cursor: 'not-allowed'
  },
  quizOptionLabel: {
    flex: 1,
    fontSize: '15px',
    color: '#333',
    cursor: 'pointer'
  },
  quizSubmitButton: {
    width: '100%',
    padding: '14px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  quizSubmitButtonDisabled: {
    background: '#ccc',
    cursor: 'not-allowed',
    opacity: 0.7
  },
  quizFeedback: {
    marginTop: '16px',
    padding: '14px 18px',
    borderRadius: '10px',
    fontSize: '14px',
    lineHeight: 1.6
  },
  quizFeedbackCorrect: {
    background: '#e8f5e9',
    color: '#2e7d32',
    border: '1px solid #a5d6a7'
  },
  quizFeedbackWrong: {
    background: '#ffebee',
    color: '#c62828',
    border: '1px solid #ef9a9a'
  },
  // 在线代码运行器样式
  codeRunnerContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    background: 'white',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
  },
  codeEditorSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  codeEditorHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 600,
    color: '#333'
  },
  runButton: {
    padding: '8px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  codeEditor: {
    width: '100%',
    height: '300px',
    padding: '16px',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '14px',
    lineHeight: 1.6,
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    background: '#fafafa',
    resize: 'none'
  },
  outputSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  outputHeader: {
    fontWeight: 600,
    color: '#333'
  },
  outputBox: {
    flex: 1,
    minHeight: '300px',
    margin: 0,
    padding: '16px',
    background: '#2d2d3a',
    color: '#f0f0f0',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '14px',
    lineHeight: 1.6,
    borderRadius: '12px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word'
  },
  codeRunnerNote: {
    textAlign: 'center',
    color: '#888',
    fontSize: '14px',
    marginTop: '16px'
  }
};
