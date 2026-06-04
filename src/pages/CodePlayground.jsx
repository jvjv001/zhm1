import React, { useState, useEffect, useRef, useCallback } from 'react';

export const CodePlayground = ({ projectId, onBack }) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState('loading');
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);
  
  const pyodideRef = useRef(null);
  const codeHistoryKey = `code_history_${projectId}`;
  
  // 项目预置代码
  const projectCodeMap = {
    1: `import random

# 🎲 猜数字小游戏
secret = random.randint(1, 100)
print(f"我已经想好了一个1-100的数字！")
print(f"（提示：答案是 {secret}）")

test_guesses = [50, 75, 63, secret]
attempts = 0

for guess in test_guesses:
    attempts += 1
    print(f"\\n猜数字: {guess}")
    
    if guess == secret:
        print(f"🎉 恭喜你！猜对了！用了{attempts}次机会")
        break
    elif guess < secret:
        print("太小了，再试试！")
    else:
        print("太大了，再试试！")`,
    2: `import pandas as pd

# 🏆 排行榜排序实现
data = {
    '姓名': ['张三', '李四', '王五', '赵六', '钱七'],
    '分数': [95, 87, 92, 88, 95],
    '通关时间': [120, 95, 150, 110, 100]
}
df = pd.DataFrame(data)

print("原始数据：")
print(df.to_string(index=False))

df_sorted = df.sort_values(
    by=['分数', '通关时间'], 
    ascending=[False, True]
)

print("\\n🏆 排序后的排行榜：")
print(df_sorted.to_string(index=False))`,
    3: `import datetime

# 📅 日历生成工具
today = datetime.date.today()
print(f"今天是: {today}")

year, month = today.year, today.month
first_day = datetime.date(year, month, 1)
days_in_month = (datetime.date(year, month % 12 + 1, 1) - datetime.timedelta(days=1)).day

print(f"\\n{year}年{month}月日历：")
print("一 二 三 四 五 六 日")

start_weekday = first_day.weekday()
print("  " * start_weekday, end="")

for day in range(1, days_in_month + 1):
    print(f"{day:2} ", end="")
    if (start_weekday + day) % 7 == 0:
        print()

print(f"\\n\\n本月共有 {days_in_month} 天")`
  };
  
  // 项目名称映射
  const projectNameMap = {
    1: '猜数字小游戏',
    2: '排行榜排序实现',
    3: '日历生成工具'
  };
  
  // 加载Pyodide
  useEffect(() => {
    const loadPyodide = async () => {
      try {
        setStatus('loading');
        setOutput('⏳ 正在加载Python环境，请稍候...\\n（首次加载约需5-10秒）\\n');
        
        // 检查是否已缓存
        if (window.__pyodideInstance) {
          pyodideRef.current = window.__pyodideInstance;
          setIsReady(true);
          setStatus('ready');
          setOutput('✅ Python环境已就绪！\\n\\n点击"运行代码"开始执行。');
          return;
        }
        
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
        script.async = true;
        
        script.onload = async () => {
          try {
            const pyodide = await window.loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/'
            });
            pyodideRef.current = pyodide;
            window.__pyodideInstance = pyodide;
            setOutput('📦 正在安装数据分析库...\\n');
            await pyodide.loadPackage(['pandas', 'numpy']);
            setIsReady(true);
            setStatus('ready');
            setOutput('✅ Python环境已就绪！\\n\\n点击"运行代码"开始执行。');
          } catch (err) {
            setStatus('error');
            setOutput(`❌ 初始化失败: ${translateError(err)}`);
          }
        };
        
        script.onerror = () => {
          setStatus('error');
          setOutput('❌ 无法加载Python环境，请检查网络连接');
        };
        
        document.head.appendChild(script);
      } catch (err) {
        setStatus('error');
        setOutput(`❌ 加载失败: ${translateError(err)}`);
      }
    };
    
    loadPyodide();
  }, []);
  
  // 加载项目代码和历史记录
  useEffect(() => {
    const savedCode = localStorage.getItem(`saved_code_${projectId}`);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(projectCodeMap[projectId] || projectCodeMap[1]);
    }
    
    const savedHistory = localStorage.getItem(codeHistoryKey);
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, [projectId]);
  
  // 保存代码到本地存储
  useEffect(() => {
    if (code) {
      localStorage.setItem(`saved_code_${projectId}`, code);
    }
  }, [code, projectId]);
  
  // 错误信息翻译
  const translateError = (error) => {
    const errorStr = String(error);
    if (errorStr.includes('I/O error') || errorStr.includes('input()')) {
      return '❌ 输入错误：浏览器环境不支持input()函数，请使用预设变量代替';
    }
    if (errorStr.includes('NameError')) {
      return `❌ 名称错误：${errorStr.replace('NameError:', '')}`;
    }
    if (errorStr.includes('SyntaxError')) {
      return `❌ 语法错误：${errorStr.replace('SyntaxError:', '')}`;
    }
    if (errorStr.includes('IndentationError')) {
      return '❌ 缩进错误：Python对缩进要求严格，请检查空格或制表符';
    }
    if (errorStr.includes('TypeError')) {
      return `❌ 类型错误：${errorStr.replace('TypeError:', '')}`;
    }
    if (errorStr.includes('ModuleNotFoundError')) {
      return '❌ 模块未找到：请确保已导入所需模块';
    }
    return errorStr;
  };
  
  // 运行代码 - 使用Pyodide的runPythonAsync直接执行
  const handleRunCode = useCallback(async () => {
    if (!isReady || isRunning) return;
    
    setIsRunning(true);
    setOutput('▶️ 正在执行代码...\\n');
    
    try {
      const pyodide = pyodideRef.current;
      
      // 创建输出捕获函数
      await pyodide.runPythonAsync(`
import sys
from io import StringIO

def capture_output(code_str):
    old_stdout = sys.stdout
    sys.stdout = StringIO()
    try:
        exec(code_str)
        return sys.stdout.getvalue()
    finally:
        sys.stdout = old_stdout
`);
      
      // 设置代码字符串到Pyodide
      pyodide.globals.set('user_code', code);
      
      // 执行并获取结果
      const outputResult = await pyodide.runPythonAsync(`
capture_output(user_code)
`);
      
      if (outputResult && outputResult.trim()) {
        setOutput(`✅ 执行成功！\\n\\n${outputResult}`);
      } else {
        setOutput('✅ 执行完成（无输出）');
      }
      
      // 添加到历史记录
      const newHistory = [{
        id: Date.now(),
        code: code,
        timestamp: new Date().toLocaleString('zh-CN'),
        output: outputResult || '无输出'
      }, ...history.slice(0, 9)];
      setHistory(newHistory);
      localStorage.setItem(codeHistoryKey, JSON.stringify(newHistory));
      
    } catch (err) {
      setOutput(translateError(err));
    } finally {
      setIsRunning(false);
    }
  }, [code, isReady, isRunning, history]);
  
  // 重置代码
  const handleReset = () => {
    setCode(projectCodeMap[projectId] || projectCodeMap[1]);
    setOutput('');
    localStorage.removeItem(`saved_code_${projectId}`);
  };
  
  // 加载历史记录
  const handleLoadHistory = (item) => {
    setCode(item.code);
    setSelectedHistory(item.id);
  };
  
  // 删除历史记录
  const handleDeleteHistory = (id) => {
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    localStorage.setItem(codeHistoryKey, JSON.stringify(newHistory));
  };
  
  // 清空历史记录
  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(codeHistoryKey);
  };
  
  return (
    <div style={styles.container}>
      {/* 顶部导航 */}
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backButton}>
          ← 返回首页
        </button>
        <h1 style={styles.title}>{projectNameMap[projectId] || '代码编辑器'}</h1>
        <div style={styles.statusBadge}>
          {status === 'loading' && '⏳ 加载中'}
          {status === 'ready' && '✅ 就绪'}
          {status === 'error' && '❌ 错误'}
        </div>
      </div>
      
      {/* 主内容区 */}
      <div style={styles.mainContent}>
        {/* 代码编辑区 */}
        <div style={styles.editorSection}>
          <div style={styles.editorHeader}>
            <span>📝 代码编辑</span>
            <div style={styles.editorActions}>
              <button onClick={handleReset} style={styles.actionButton}>
                🔄 重置
              </button>
              <button 
                onClick={handleRunCode} 
                style={{ ...styles.runButton, ...(!isReady || isRunning ? styles.buttonDisabled : {}) }}
                disabled={!isReady || isRunning}
              >
                {isRunning ? '⏳ 运行中' : '▶️ 运行代码'}
              </button>
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="在此输入Python代码..."
            style={styles.codeEditor}
            disabled={isRunning}
          />
        </div>
        
        {/* 输出区 */}
        <div style={styles.outputSection}>
          <div style={styles.outputHeader}>
            <span>📊 输出结果</span>
          </div>
          <pre style={styles.outputBox}>
            {output || '运行代码后，输出结果将显示在这里...'}
          </pre>
        </div>
        
        {/* 历史记录面板 */}
        <div style={styles.historySection}>
          <div style={styles.historyHeader}>
            <span>📜 代码历史记录</span>
            {history.length > 0 && (
              <button onClick={handleClearHistory} style={styles.clearButton}>
                🗑️ 清空
              </button>
            )}
          </div>
          <div style={styles.historyList}>
            {history.length === 0 ? (
              <div style={styles.emptyHistory}>暂无历史记录</div>
            ) : (
              history.map(item => (
                <div 
                  key={item.id}
                  style={{
                    ...styles.historyItem,
                    ...(selectedHistory === item.id ? styles.historyItemActive : {})
                  }}
                >
                  <div 
                    onClick={() => handleLoadHistory(item)} 
                    style={styles.historyContent}
                  >
                    <div style={styles.historyTime}>{item.timestamp}</div>
                    <pre style={styles.historyPreview}>{item.code.substring(0, 50)}...</pre>
                  </div>
                  <button 
                    onClick={() => handleDeleteHistory(item.id)} 
                    style={styles.deleteButton}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* 提示信息 */}
      <div style={styles.tips}>
        <p>💡 <strong>提示：</strong></p>
        <ul>
          <li>支持Python语法，可导入pandas、numpy等数据分析库</li>
          <li>代码会自动保存到本地存储，刷新页面不会丢失</li>
          <li>浏览器环境不支持input()函数，请使用预设变量</li>
          <li>历史记录最多保存10条代码</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e0e0e0'
  },
  backButton: {
    padding: '10px 20px',
    background: '#f0f0f0',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#333'
  },
  statusBadge: {
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 600,
    background: '#e8f5e9',
    color: '#4caf50'
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: '20px'
  },
  editorSection: {
    gridColumn: '1',
    display: 'flex',
    flexDirection: 'column'
  },
  editorHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: '#f8f9fa',
    borderRadius: '8px 8px 0 0',
    fontWeight: 600
  },
  editorActions: {
    display: 'flex',
    gap: '10px'
  },
  actionButton: {
    padding: '8px 16px',
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  runButton: {
    padding: '8px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600
  },
  buttonDisabled: {
    background: '#ccc',
    cursor: 'not-allowed'
  },
  codeEditor: {
    flex: 1,
    minHeight: '300px',
    padding: '16px',
    fontSize: '14px',
    fontFamily: 'monospace',
    lineHeight: 1.5,
    border: '1px solid #e0e0e0',
    borderRadius: '0 0 8px 8px',
    resize: 'vertical',
    background: '#1e1e1e',
    color: '#d4d4d4'
  },
  outputSection: {
    gridColumn: '1',
    marginTop: '-10px'
  },
  outputHeader: {
    padding: '12px 16px',
    background: '#f8f9fa',
    borderRadius: '8px 8px 0 0',
    fontWeight: 600
  },
  outputBox: {
    minHeight: '150px',
    padding: '16px',
    background: '#2d2d3a',
    color: '#e0e0e0',
    borderRadius: '0 0 8px 8px',
    fontSize: '13px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  historySection: {
    gridColumn: '2',
    gridRow: '1 / span 2',
    background: '#fff',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column'
  },
  historyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #e0e0e0',
    fontWeight: 600
  },
  clearButton: {
    padding: '4px 8px',
    background: '#ffebee',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#c62828'
  },
  historyList: {
    flex: 1,
    overflowY: 'auto',
    padding: '8px'
  },
  emptyHistory: {
    padding: '24px',
    textAlign: 'center',
    color: '#999',
    fontSize: '14px'
  },
  historyItem: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '10px',
    marginBottom: '8px',
    background: '#f8f9fa',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  historyItemActive: {
    background: '#e3f2fd',
    border: '1px solid #90caf9'
  },
  historyContent: {
    flex: 1,
    minWidth: 0
  },
  historyTime: {
    fontSize: '11px',
    color: '#999',
    marginBottom: '4px'
  },
  historyPreview: {
    fontSize: '12px',
    color: '#666',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'monospace'
  },
  deleteButton: {
    padding: '2px 6px',
    background: 'none',
    border: 'none',
    color: '#999',
    cursor: 'pointer',
    fontSize: '12px'
  },
  tips: {
    marginTop: '20px',
    padding: '16px',
    background: '#fff3e0',
    borderRadius: '8px',
    borderLeft: '4px solid #ff9800'
  }
};

// 响应式样式
const responsiveStyles = `
  @media (max-width: 900px) {
    .mainContent {
      grid-template-columns: 1fr !important;
    }
    
    .historySection {
      grid-column: 1 !important;
      grid-row: auto !important;
      max-height: 250px;
    }
  }
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = responsiveStyles;
  document.head.appendChild(styleSheet);
}