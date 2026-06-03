import React, { useState } from 'react';
import { courseContent } from '../data';

export const Header = ({ activePage, setActivePage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
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
          title: topic.title,
          topicId: topic.id,
          match: '标题'
        });
      }
      
      // 搜索代码示例
      if (topic.codeExamples) {
        topic.codeExamples.forEach((example, idx) => {
          if (example.title && example.title.toLowerCase().includes(lowerQuery)) {
            results.push({
              type: '代码示例',
              title: `${topic.title} - ${example.title}`,
              topicId: topic.id,
              match: '示例名称'
            });
          }
          if (example.code && example.code.toLowerCase().includes(lowerQuery)) {
            results.push({
              type: '代码',
              title: `${topic.title} - 代码片段`,
              topicId: topic.id,
              match: '代码内容'
            });
          }
        });
      }
    });

    setSearchResults(results.slice(0, 10)); // 最多显示10个结果
    setShowResults(true);
  };

  const handleResultClick = (result) => {
    setActivePage('course');
    setSearchQuery('');
    setShowResults(false);
    // 这里可以通过props或者全局状态来跳转到对应的知识点
    window.setTimeout(() => {
      const element = document.getElementById(`topic-${result.topicId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🐼</span>
          <span style={styles.logoText}>PandaLearn</span>
        </div>
        
        {/* 搜索框 */}
        <div style={styles.searchContainer}>
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="搜索知识点、函数、代码示例..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              style={styles.searchInput}
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
          
          {/* 搜索结果下拉 */}
          {showResults && searchResults.length > 0 && (
            <div style={styles.searchResults}>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => handleResultClick(result)}
                  style={styles.searchResultItem}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  <div style={styles.resultType}>{result.type}</div>
                  <div style={styles.resultTitle}>{result.title}</div>
                  <div style={styles.resultMatch}>匹配: {result.match}</div>
                </div>
              ))}
            </div>
          )}
          
          {showResults && searchQuery && searchResults.length === 0 && (
            <div style={styles.searchResults}>
              <div style={styles.noResults}>未找到相关结果</div>
            </div>
          )}
        </div>
        
        <nav style={styles.nav}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                ...styles.navItem,
                ...(activePage === item.id ? styles.navItemActive : {})
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
    padding: '16px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '24px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logoIcon: {
    fontSize: '32px'
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    maxWidth: '500px'
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    fontSize: '18px',
    pointerEvents: 'none'
  },
  searchInput: {
    width: '100%',
    padding: '12px 40px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s ease',
    background: '#f8f9fa'
  },
  clearButton: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#999',
    padding: '4px'
  },
  searchResults: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '8px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    maxHeight: '400px',
    overflowY: 'auto',
    zIndex: 1000
  },
  searchResultItem: {
    padding: '12px 16px',
    cursor: 'pointer',
    borderBottom: '1px solid #f0f0f0',
    transition: 'background 0.2s'
  },
  resultType: {
    fontSize: '11px',
    color: '#667eea',
    fontWeight: 600,
    marginBottom: '4px',
    textTransform: 'uppercase'
  },
  resultTitle: {
    fontSize: '14px',
    color: '#333',
    fontWeight: 500,
    marginBottom: '2px'
  },
  resultMatch: {
    fontSize: '12px',
    color: '#999'
  },
  noResults: {
    padding: '20px',
    textAlign: 'center',
    color: '#999',
    fontSize: '14px'
  },
  nav: {
    display: 'flex',
    gap: '8px'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    border: 'none',
    background: 'transparent',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 500,
    color: '#666',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  navItemActive: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  },
  navIcon: {
    fontSize: '18px'
  }
};
