import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    console.error('React Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          maxWidth: '800px',
          margin: '50px auto',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <h1 style={{ color: '#e53935', marginBottom: '20px', fontSize: '24px' }}>
            ⚠️ 应用加载失败
          </h1>
          <div style={{
            background: '#fff3e0',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <p style={{ color: '#e65100', margin: '0 0 10px 0', fontWeight: 'bold' }}>
              错误信息：
            </p>
            <pre style={{
              background: '#fff',
              padding: '15px',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '13px',
              color: '#d84315'
            }}>
              {this.state.error?.toString()}
            </pre>
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🔄 重新加载页面
          </button>
          <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
            如果问题持续存在，请检查控制台获取更多错误信息。
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
