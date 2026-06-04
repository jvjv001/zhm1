import React, { useState, useEffect, useRef, useCallback } from 'react';

export const CodePlayground = ({ projectId, onBack }) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState('idle'); // idle: 空闲预加载中, loading: 正在加载, ready: 就绪, error: 错误
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

print(f"\\n\\n本月共有 {days_in_month} 天")`,
    4: `from datetime import datetime

# 👥 人员信息排序
employees = [
    {'name': '张三', 'dept': '技术部', 'hire_date': '2022-01-15', 'salary': 15000},
    {'name': '李四', 'dept': '市场部', 'hire_date': '2021-06-20', 'salary': 12000},
    {'name': '王五', 'dept': '技术部', 'hire_date': '2022-03-10', 'salary': 14000},
    {'name': '赵六', 'dept': '市场部', 'hire_date': '2021-06-20', 'salary': 13000}
]

print("原始员工列表：")
for emp in employees:
    print(f"{emp['name']} - {emp['dept']} - {emp['hire_date']} - {emp['salary']}元")

# 按部门、入职日期、姓名排序
sorted_employees = sorted(employees, key=lambda x: (x['dept'], x['hire_date'], x['name']))

print("\\n排序后的员工列表：")
for emp in sorted_employees:
    print(f"{emp['name']} - {emp['dept']} - {emp['hire_date']} - {emp['salary']}元")`,
    5: `import pandas as pd

# 📊 销售数据统计分析
sales_data = {
    '日期': ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05'],
    '产品': ['苹果', '香蕉', '苹果', '橙子', '香蕉'],
    '销量': [100, 150, 120, 80, 200],
    '单价': [5.5, 3.2, 5.5, 4.8, 3.2]
}
df = pd.DataFrame(sales_data)

print("销售数据：")
print(df)

# 计算销售额
df['销售额'] = df['销量'] * df['单价']
print("\\n添加销售额列：")
print(df)

# 按产品分组统计
product_stats = df.groupby('产品').agg({
    '销量': 'sum',
    '销售额': 'sum'
}).reset_index()

print("\\n各产品销售统计：")
print(product_stats)`,
    6: `import pandas as pd

# 📈 学生成绩分析系统
grades_data = {
    '姓名': ['张三', '李四', '王五', '赵六', '钱七'],
    '语文': [85, 90, 78, 92, 88],
    '数学': [92, 85, 95, 88, 90],
    '英语': [88, 92, 85, 90, 78]
}
df = pd.DataFrame(grades_data)

print("学生成绩表：")
print(df.to_string(index=False))

# 计算总分和平均分
df['总分'] = df['语文'] + df['数学'] + df['英语']
df['平均分'] = df['总分'] / 3

print("\\n添加总分和平均分：")
print(df[['姓名', '总分', '平均分']].to_string(index=False))

# 按总分排序
df_sorted = df.sort_values('总分', ascending=False)
print("\\n成绩排行榜：")
print(df_sorted[['姓名', '总分', '平均分']].to_string(index=False))`,
    7: `import pandas as pd

# 💰 工资计算器
employees = {
    '姓名': ['张三', '李四', '王五', '赵六'],
    '基本工资': [8000, 10000, 12000, 9000],
    '绩效系数': [1.2, 1.0, 1.5, 1.1],
    '加班时长': [10, 5, 20, 8]
}
df = pd.DataFrame(employees)

print("员工工资信息：")
print(df.to_string(index=False))

# 计算绩效工资和加班费
df['绩效工资'] = df['基本工资'] * df['绩效系数']
df['加班费'] = df['加班时长'] * 100  # 每小时100元
df['总工资'] = df['基本工资'] + df['绩效工资'] + df['加班费']

print("\\n工资计算结果：")
print(df[['姓名', '基本工资', '绩效工资', '加班费', '总工资']].to_string(index=False))`,
    8: `import pandas as pd

# 📋 数据清洗工具
raw_data = {
    '姓名': ['张三', '李四', '  王五  ', '赵六', ''],
    '年龄': [25, '三十', 28, 35, 22],
    '城市': ['北京', '上海', '广州', '', '深圳']
}
df = pd.DataFrame(raw_data)

print("原始数据（含脏数据）：")
print(df)

# 清洗姓名列的空格
df['姓名'] = df['姓名'].str.strip()

# 检查空值
print("\\n空值统计：")
print(df.isnull().sum())

# 替换空字符串为NaN
df = df.replace('', pd.NA)
print("\\n清洗后的数据：")
print(df)`,
    9: `import pandas as pd

# 📊 数据透视表分析
sales_data = {
    '地区': ['华北', '华北', '华东', '华东', '华南', '华南'],
    '产品': ['苹果', '香蕉', '苹果', '香蕉', '苹果', '香蕉'],
    '销量': [100, 150, 200, 180, 120, 160],
    '销售额': [550, 480, 1100, 576, 660, 512]
}
df = pd.DataFrame(sales_data)

print("销售明细数据：")
print(df)

# 创建透视表
pivot_table = pd.pivot_table(
    df, 
    values=['销量', '销售额'],
    index='地区',
    columns='产品',
    aggfunc='sum'
)

print("\\n数据透视表：")
print(pivot_table)`,
    10: `import pandas as pd

# 📈 多表数据合并
orders = pd.DataFrame({
    '订单ID': [1, 2, 3, 4],
    '客户ID': [101, 102, 101, 103],
    '产品': ['苹果', '香蕉', '橙子', '苹果'],
    '数量': [10, 20, 15, 25]
})

customers = pd.DataFrame({
    '客户ID': [101, 102, 103],
    '姓名': ['张三', '李四', '王五'],
    '城市': ['北京', '上海', '广州']
})

print("订单表：")
print(orders)
print("\\n客户表：")
print(customers)

# 合并订单和客户信息
merged = pd.merge(orders, customers, on='客户ID')
print("\\n合并后的数据：")
print(merged)`
  };
  
  // 项目名称映射
  const projectNameMap = {
    1: '猜数字小游戏',
    2: '排行榜排序实现',
    3: '日历生成工具',
    4: '人员信息排序',
    5: '销售数据统计分析',
    6: '学生成绩分析系统',
    7: '工资计算器',
    8: '数据清洗工具',
    9: '数据透视表分析',
    10: '多表数据合并'
  };
  
  // 完整的Pyodide加载函数
  const loadPyodideFull = async () => {
    try {
      setStatus('loading');
      setOutput('⏳ 正在加载Python环境...\n（首次加载约需5-10秒）\n');
      
      // 检查是否已缓存
      if (window.__pyodideInstance) {
        pyodideRef.current = window.__pyodideInstance;
        setIsReady(true);
        setStatus('ready');
        setOutput('✅ Python环境已就绪！\n\n点击"运行代码"开始执行。');
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
          setOutput('📦 正在安装数据分析库...\n（pandas、numpy）\n');
          await pyodide.loadPackage(['pandas', 'numpy']);
          setIsReady(true);
          setStatus('ready');
          setOutput('✅ Python环境已就绪！\n\n点击"运行代码"开始执行。');
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
  
  // 加载Pyodide（延迟加载或使用缓存）
  useEffect(() => {
    // 如果已经有缓存实例，直接使用
    if (window.__pyodideInstance) {
      pyodideRef.current = window.__pyodideInstance;
      setIsReady(true);
      setStatus('ready');
      setOutput('✅ Python环境已就绪！\n\n点击"运行代码"开始执行。');
    } else {
      // 开始空闲预加载
      loadPyodideFull();
    }
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
  
  // 空闲预加载Pyodide
  const preloadPyodide = useCallback(() => {
    // 检查是否已经在加载或已加载
    if (window.__pyodideInstance || status !== 'loading') {
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
        
        // 预加载pandas和numpy
        await pyodide.loadPackage(['pandas', 'numpy']);
        
        // 缓存实例
        window.__pyodideInstance = pyodide;
        console.log('✅ Pandas依赖预加载完成，下次使用更快！');
      } catch (err) {
        console.warn('预加载失败:', err);
      }
    };
    
    document.head.appendChild(script);
  }, [status]);
  
  // 监听空闲事件进行预加载
  useEffect(() => {
    // 如果已经有缓存或已经加载完成，不需要预加载
    if (window.__pyodideInstance || status === 'ready' || status === 'error') {
      return;
    }
    
    let idleTimeout;
    
    const handleUserActive = () => {
      // 用户空闲2秒后开始预加载
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        if (status === 'idle') {
          console.log('🚀 开始空闲预加载Python环境...');
          loadPyodideFull();
        }
      }, 2000);
    };
    
    // 监听用户活动
    window.addEventListener('mousemove', handleUserActive);
    window.addEventListener('keydown', handleUserActive);
    window.addEventListener('scroll', handleUserActive);
    window.addEventListener('click', handleUserActive);
    
    // 立即启动一次预加载检查（如果环境还没加载）
    if (!window.__pyodideInstance && status === 'idle') {
      handleUserActive();
    }
    
    return () => {
      clearTimeout(idleTimeout);
      window.removeEventListener('mousemove', handleUserActive);
      window.removeEventListener('keydown', handleUserActive);
      window.removeEventListener('scroll', handleUserActive);
      window.removeEventListener('click', handleUserActive);
    };
  }, [status]);
  
  // 错误信息翻译（更完整的中文提示）
  const translateError = (error) => {
    const errorStr = String(error);
    
    // 语法错误
    if (errorStr.includes('SyntaxError')) {
      const match = errorStr.match(/SyntaxError: (.+?)(?:\n|$)/);
      return `❌ 语法错误：${match ? match[1] : '代码语法不符合Python规范'}\n\n💡 提示：检查括号、引号、逗号等是否匹配`;
    }
    
    // 缩进错误
    if (errorStr.includes('IndentationError')) {
      return `❌ 缩进错误：Python对缩进有严格要求\n\n💡 提示：\n• 使用4个空格或1个Tab进行缩进\n• 确保同一代码块的缩进一致\n• 不要混用空格和Tab`;
    }
    
    // 名称未定义
    if (errorStr.includes('NameError')) {
      const match = errorStr.match(/NameError: name '(\w+)' is not defined/);
      if (match) {
        return `❌ 名称错误：'${match[1]}' 未定义\n\n💡 提示：\n• 检查变量名是否拼写正确\n• 确认变量在使用前已赋值\n• 检查是否导入了所需的模块`;
      }
      return `❌ 名称错误：使用了未定义的变量或函数\n\n💡 提示：请先定义变量或导入模块`;
    }
    
    // 类型错误
    if (errorStr.includes('TypeError')) {
      const match = errorStr.match(/TypeError: (.+?)(?:\n|$)/);
      return `❌ 类型错误：${match ? match[1] : '操作的数据类型不正确'}\n\n💡 提示：\n• 检查变量类型是否匹配\n• 字符串和数字不能直接相加\n• 列表索引需要使用整数`;
    }
    
    // 索引错误
    if (errorStr.includes('IndexError')) {
      return `❌ 索引错误：列表索引超出范围\n\n💡 提示：\n• 检查索引是否从0开始\n• 确保索引小于列表长度\n• 使用 len() 函数检查列表长度`;
    }
    
    // 键错误
    if (errorStr.includes('KeyError')) {
      const match = errorStr.match(/KeyError: '?(\w+)'?/);
      return `❌ 键错误：字典中不存在键 '${match ? match[1] : '?'}'\n\n💡 提示：\n• 检查字典中是否有这个键\n• 使用 dict.get() 方法更安全\n• 使用 'in' 检查键是否存在`;
    }
    
    // 属性错误
    if (errorStr.includes('AttributeError')) {
      const match = errorStr.match(/AttributeError: '(\w+)' object has no attribute '(\w+)'/);
      if (match) {
        return `❌ 属性错误：'${match[1]}' 没有 '${match[2]}' 属性\n\n💡 提示：\n• 检查对象类型是否正确\n• 确认属性名拼写正确\n• 参考Pandas官方文档`;
      }
      return `❌ 属性错误：对象没有指定的属性\n\n💡 提示：请检查对象类型和属性名`;
    }
    
    // 模块未找到
    if (errorStr.includes('ModuleNotFoundError') || errorStr.includes('ImportError')) {
      const match = errorStr.match(/ModuleNotFoundError: No module named '?(\w+)'?/);
      return `❌ 模块未找到：缺少 '${match ? match[1] : '?'}' 模块\n\n💡 提示：\n• 已支持的模块：pandas, numpy\n• 使用 import pandas as pd 导入\n• 浏览器环境不支持某些系统模块`;
    }
    
    // 值错误
    if (errorStr.includes('ValueError')) {
      const match = errorStr.match(/ValueError: (.+?)(?:\n|$)/);
      return `❌ 值错误：${match ? match[1] : '提供的值不符合要求'}\n\n💡 提示：\n• 检查数据格式是否正确\n• 确保数值在有效范围内`;
    }
    
    // 除零错误
    if (errorStr.includes('ZeroDivisionError')) {
      return `❌ 除零错误：不能除以0\n\n💡 提示：\n• 检查除数是否可能为0\n• 使用条件判断避免除零`;
    }
    
    // IO错误
    if (errorStr.includes('I/O error') || errorStr.includes('input()')) {
      return `❌ 输入错误：浏览器环境不支持input()函数\n\n💡 提示：\n• 使用变量直接赋值代替input()\n• 例如：name = "张三" 而非 input("请输入姓名:")`;
    }
    
    // 文件操作错误
    if (errorStr.includes('FileNotFoundError')) {
      return `❌ 文件未找到：指定的文件不存在\n\n💡 提示：\n• 浏览器环境无法访问本地文件\n• 使用Pandas直接创建DataFrame代替读取文件`;
    }
    
    // 通用错误
    return `❌ 运行错误：${errorStr.substring(0, 200)}\n\n💡 如果问题持续存在，请检查代码逻辑或重置代码。`;
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
          ← 返回
        </button>
        <h1 style={styles.title}>{projectNameMap[projectId] || '代码编辑器'}</h1>
        <div style={{
          ...styles.statusBadge,
          ...(status === 'idle' ? { background: '#fff3e0', color: '#ff9800' } :
             status === 'loading' ? { background: '#e3f2fd', color: '#1976d2' } :
             status === 'ready' ? { background: '#e8f5e9', color: '#4caf50' } :
             { background: '#ffebee', color: '#f44336' })
        }}>
          {status === 'idle' && '🚀 空闲预加载中'}
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
        <p>💡 <strong>使用提示：</strong></p>
        <ul>
          <li>✅ 支持Python语法，已集成pandas、numpy等数据分析库</li>
          <li>💾 代码自动保存到本地，刷新页面不会丢失</li>
          <li>📜 历史记录面板保存最近10条代码，方便回溯</li>
          <li>🚀 系统会在空闲时预加载Python环境，加快启动速度</li>
          <li>⚠️ 浏览器环境不支持input()和文件读写，请使用变量赋值</li>
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