import React, { useState } from 'react';

export const CollapsibleSection = ({ 
  title, 
  icon = '📌', 
  defaultOpen = true, 
  children,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div style={{ ...styles.container, ...(className ? { className } : {}) }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.header}
      >
        <span style={styles.icon}>{icon}</span>
        <span style={styles.title}>{title}</span>
        <span style={{ ...styles.chevron, ...(isOpen ? styles.chevronOpen : {}) }}>
          ▼
        </span>
      </button>
      <div 
        style={{ 
          ...styles.content, 
          maxHeight: isOpen ? '2000px' : '0',
          opacity: isOpen ? 1 : 0
        }}
      >
        {children}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '16px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    background: '#f8f9fa',
    border: 'none',
    width: '100%',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background 0.2s'
  },
  icon: {
    fontSize: '18px'
  },
  title: {
    flex: 1,
    fontSize: '16px',
    fontWeight: 600,
    color: '#333'
  },
  chevron: {
    fontSize: '12px',
    color: '#666',
    transition: 'transform 0.3s'
  },
  chevronOpen: {
    transform: 'rotate(180deg)'
  },
  content: {
    padding: '20px',
    transition: 'all 0.3s ease',
    overflow: 'hidden'
  }
};