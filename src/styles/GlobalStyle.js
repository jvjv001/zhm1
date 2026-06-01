import React from 'react';

export const GlobalStyle = () => (
  <style>{`
    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px;
      width: 100%;
    }

    .card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      padding: 24px;
      margin-bottom: 16px;
    }

    .card-title {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-secondary {
      background: #f0f0f0;
      color: #333;
    }

    .btn-secondary:hover {
      background: #e0e0e0;
    }

    .progress-bar {
      background: #e0e0e0;
      border-radius: 10px;
      height: 10px;
      overflow: hidden;
    }

    .progress-fill {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      height: 100%;
      border-radius: 10px;
      transition: width 0.5s ease;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }

    .badge-gold {
      background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
      color: #fff;
    }

    .badge-silver {
      background: linear-gradient(135deg, #c0c0c0 0%, #a0a0a0 100%);
      color: #fff;
    }

    .badge-bronze {
      background: linear-gradient(135deg, #cd7f32 0%, #b8860b 100%);
      color: #fff;
    }

    .badge-purple {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
    }

    .two-columns {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 24px;
    }

    @media (max-width: 968px) {
      .two-columns {
        grid-template-columns: 1fr;
      }
    }
  `}</style>
);
