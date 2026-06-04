import React, { useState, useEffect } from 'react';
import { courseContent, projectsData, questionBank } from '../data';

export const Header = ({ activePage, setActivePage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [fontSize, setFontSize] = useState(parseFloat(localStorage.getItem('fontSize') || '1'));
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize.toString());
    document.documentElement.style.fontSize = `${fontSize}rem`;
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // 注入全局主题样式
    const themeStyles = `
      :root {
        --bg-primary: ${theme === 'dark' ? '#1a1a2e' : '#ffffff'};
        --bg-secondary: ${theme === 'dark' ? '#16213e' : '#f8f9fa'};
        --bg-card: ${theme === 'dark' ? '#0f0f1a' : '#ffffff'};
        --text-primary: ${theme === 'dark' ? '#ffffff' : '#333333'};
        --text-secondary: ${theme === 'dark' ? '#a0a0b0' : '#666666'};
        --text-muted: ${theme === 'dark' ? '#707080' : '#999999'};
        --border-color: ${theme === 'dark' ? '#3a3a4a' : '#e0e0e0'};
        --accent-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        --accent-success: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
        --accent-warning: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
        --accent-error: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
        --shadow: ${theme === 'dark' ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.08)'};
      }
      
      body {
        background: var(--bg-primary);
        color: var(--text-primary);
        transition: all 0.3s ease;
      }
      
      .card {
        background: var(--bg-card) !important;
        border-color: var(--border-color) !important;
      }
      
      input, textarea {
        background: var(--bg-secondary) !important;
        color: var(--text-primary) !important;
        border-color: var(--border-color) !important;
      }
      
      ::placeholder {
        color: var(--text-muted) !important;
      }
    `;
    
    let existingStyle = document.getElementById('theme-styles');
    if (existingStyle) {
      existingStyle.textContent = themeStyles;
    } else {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'theme-styles';
      styleSheet.textContent = themeStyles;
      document.head.appendChild(styleSheet);
    }
  }, [theme]);

  const navItems = [
    { id: 'home', label: '首页', icon: '🏠' },
    { id: 'course', label: '课程学习', icon: '📚' },
    { id: 'projects', label: '编程项目', icon: '💻' },
    { id: 'quiz', label: '练习测评', icon: '📝' },
    { id: 'profile', label: '个人中心', icon: '👤' }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const results = [];
    const lowerQuery = query.toLowerCase();

    // 搜索知识点
    courseContent.forEach(topic => {
      if (topic.title.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: '知识点',
          icon: '📚',
          title: topic.title,
          topicId: topic.id,
          match: '标题'
        });
      }
      
      if (topic.description && topic.description.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: '知识点',
          icon: '📚',
          title: topic.title,
          topicId: topic.id,
          match: '描述'
        });
      }

      if (topic.codeExamples) {
        topic.codeExamples.forEach((example, idx) => {
          if (example.title && example.title.toLowerCase().includes(lowerQuery)) {
            results.push({
              type: '代码示例',
              icon: '💻',
              title: `${topic.title} - ${example.title}`,
              topicId: topic.id,
              match: '示例名称'
            });
          }
        });
      }
    });

    // 搜索编程项目
    projectsData.forEach(project => {
      if (project.title.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: '实战项目',
          icon: '🎯',
          title: project.title,
          projectId: project.id,
          match: '标题'
        });
      }
      
      if (project.description && project.description.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: '实战项目',
          icon: '🎯',
          title: project.title,
          projectId: project.id,
          match: '描述'
        });
      }
    });

    // 搜索习题
    questionBank.forEach(quiz => {
      quiz.questions.forEach(q => {
        if (q.question.toLowerCase().includes(lowerQuery)) {
          results.push({
            type: '练习题',
            icon: '📝',
            title: `${quiz.topicTitle} - ${q.question.substring(0, 40)}...`,
            topicId: quiz.topicId,
            match: '题目'
          });
        }
        
        q.options.forEach(opt => {
          if (opt.toLowerCase().includes(lowerQuery)) {
            results.push({
              type: '练习题',
              icon: '📝',
              title: `${quiz.topicTitle} - ${q.question.substring(0, 30)}...`,
              topicId: quiz.topicId,
              match: '选项'
            });
          }
        });
      });
    });

    setSearchResults(results.slice(0, 12));
    setShowResults(true);
  };

  const handleResultClick = (result) => {
    setSearchQuery('');
    setShowResults(false);
    
    if (result.type === '实战项目') {
      setActivePage('projects');
      window.setTimeout(() => {
        const element = document.getElementById(`project-${result.projectId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setActivePage('course');
      window.setTimeout(() => {
        const element = document.getElementById(`topic-${result.topicId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleFontSizeChange = (delta) => {
    const newSize = Math.max(0.8, Math.min(1.3, fontSize + delta));
    setFontSize(newSize);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <header style={{ ...styles.header, ...(theme === 'dark' ? styles.headerDark : {}) }}>
      <div style={styles.headerContent}>
        <div style={styles.logo} onClick={() => setActivePage('home')}>
          <span style={styles.logoIcon}>🐼</span>
          <span style={styles.logoText}>PandaLearn</span>
        </div>
        
        {/* 搜索框 */}
        <div style={styles.searchContainer}>
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="搜索知识点、习题、实战项目..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              style={{ ...styles.searchInput, ...(theme === 'dark' ? styles.searchInputDark : {}) }}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowResults(false);
                }}
                style={styles.clearButton}
              >
                ✕
              </button>
            )}
          </div>
          
          {showResults && searchResults.length > 0 && (
            <div style={{ ...styles.searchResults, ...(theme === 'dark' ? styles.searchResultsDark : {}) }}>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => handleResultClick(result)}
                  style={{ ...styles.searchResultItem, ...(theme === 'dark' ? styles.searchResultItemDark : {}) }}
                >
                  <span style={styles.resultIcon}>{result.icon}</span>
                  <div style={styles.resultContent}>
                    <div style={styles.resultType}>{result.type}</div>
                    <div style={{ ...styles.resultTitle, ...(theme === 'dark' ? styles.resultTitleDark : {}) }}>
                      {result.title}
                    </div>
                    <div style={styles.resultMatch}>匹配: {result.match}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {showResults && searchQuery && searchResults.length === 0 && (
            <div style={{ ...styles.searchResults, ...(theme === 'dark' ? styles.searchResultsDark : {}) }}>
              <div style={styles.noResults}>未找到相关结果</div>
            </div>
          )}
        </div>
        
        {/* 功能按钮组 */}
        <div style={styles.utilityButtons}>
          {/* 字体缩放 */}
          <div style={styles.fontSizeControls}>
            <button
              onClick={() => handleFontSizeChange(-0.1)}
              style={styles.fontButton}
              title="减小字体"
            >
              A-
            </button>
            <span style={styles.fontSizeDisplay}>{Math.round(fontSize * 100)}%</span>
            <button
              onClick={() => handleFontSizeChange(0.1)}
              style={styles.fontButton}
              title="增大字体"
            >
              A+
            </button>
          </div>
          
          {/* 主题切换 */}
          <button
            onClick={toggleTheme}
            style={{ ...styles.themeButton, ...(theme === 'dark' ? styles.themeButtonDark : {}) }}
            title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          
          <nav style={styles.nav}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                style={{
                  ...styles.navItem,
                  ...(activePage === item.id ? styles.navItemActive : {}),
                  ...(theme === 'dark' ? styles.navItemDark : {})
                }}
              >
                <span style={styles.navIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
    padding: '12px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  headerDark: {
    background: 'rgba(30, 30, 40, 0.95)',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3)'
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    minWidth: '120px'
  },
  logoIcon: {
    fontSize: '28px'
  },
  logoText: {
    fontSize: '22px',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    maxWidth: '500px',
    minWidth: '200px'
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    fontSize: '16px',
    pointerEvents: 'none',
    zIndex: 1
  },
  searchInput: {
    width: '100%',
    padding: '10px 36px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s ease',
    background: '#f8f9fa'
  },
  searchInputDark: {
    background: '#3a3a4a',
    borderColor: '#5a5a6a',
    color: '#fff',
    placeholderColor: '#999'
  },
  clearButton: {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    color: '#999',
    padding: '4px',
    zIndex: 1
  },
  searchResults: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '6px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    maxHeight: '400px',
    overflowY: 'auto',
    zIndex: 1000,
    border: '1px solid #e0e0e0'
  },
  searchResultsDark: {
    background: '#2a2a3a',
    borderColor: '#4a4a5a'
  },
  searchResultItem: {
    padding: '10px 14px',
    cursor: 'pointer',
    borderBottom: '1px solid #f0f0f0',
    transition: 'background 0.2s',
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  searchResultItemDark: {
    borderBottomColor: '#4a4a5a',
    '&:hover': {
      background: '#3a3a4a'
    }
  },
  resultIcon: {
    fontSize: '18px',
    flexShrink: 0
  },
  resultContent: {
    flex: 1,
    minWidth: 0
  },
  resultType: {
    fontSize: '10px',
    color: '#667eea',
    fontWeight: 600,
    marginBottom: '3px',
    textTransform: 'uppercase'
  },
  resultTitle: {
    fontSize: '13px',
    color: '#333',
    fontWeight: 500,
    marginBottom: '2px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  resultTitleDark: {
    color: '#e0e0e0'
  },
  resultMatch: {
    fontSize: '11px',
    color: '#999'
  },
  noResults: {
    padding: '16px',
    textAlign: 'center',
    color: '#999',
    fontSize: '13px'
  },
  utilityButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  },
  fontSizeControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: '#f0f0f0',
    padding: '4px',
    borderRadius: '8px'
  },
  fontButton: {
    padding: '4px 8px',
    border: 'none',
    background: 'white',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    color: '#666',
    transition: 'all 0.2s',
    minWidth: '36px'
  },
  fontSizeDisplay: {
    fontSize: '12px',
    color: '#888',
    minWidth: '40px',
    textAlign: 'center'
  },
  themeButton: {
    padding: '8px 12px',
    border: 'none',
    background: '#f0f0f0',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  themeButtonDark: {
    background: '#4a4a5a'
  },
  nav: {
    display: 'flex',
    gap: '6px'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 18px',
    border: 'none',
    background: 'transparent',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#666',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  navItemDark: {
    color: '#ccc'
  },
  navItemActive: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  },
  navIcon: {
    fontSize: '16px'
  }
};
