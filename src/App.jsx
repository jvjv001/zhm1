import React, { useState, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';

// 路由懒加载
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const CourseLearning = lazy(() => import('./pages/CourseLearning').then(module => ({ default: module.CourseLearning })));
const Projects = lazy(() => import('./pages/Projects').then(module => ({ default: module.Projects })));
const Quiz = lazy(() => import('./pages/Quiz').then(module => ({ default: module.Quiz })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));
const CodePlayground = lazy(() => import('./pages/CodePlayground').then(module => ({ default: module.CodePlayground })));

// 加载中组件
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    flexDirection: 'column',
    gap: '16px'
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      border: '4px solid #f0f0f0',
      borderTop: '4px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    <span style={{ color: '#666', fontSize: '14px' }}>页面加载中...</span>
  </div>
);

function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleNavigateToProjects = () => {
    setActivePage('projects');
  };

  const handleOpenCodePlayground = (projectId) => {
    setSelectedProjectId(projectId);
    setActivePage('code-playground');
  };

  const handleBackFromPlayground = () => {
    setSelectedProjectId(null);
    setActivePage('home');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} onOpenCodePlayground={handleOpenCodePlayground} />;
      case 'course':
        return <CourseLearning onNavigateToProjects={handleNavigateToProjects} />;
      case 'projects':
        return <Projects />;
      case 'quiz':
        return <Quiz />;
      case 'profile':
        return <Profile />;
      case 'code-playground':
        return <CodePlayground projectId={selectedProjectId} onBack={handleBackFromPlayground} />;
      default:
        return <Home setActivePage={setActivePage} onOpenCodePlayground={handleOpenCodePlayground} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <Header activePage={activePage} setActivePage={setActivePage} />
        <main className="main-content">
          <Suspense fallback={<PageLoader />}>
            {renderPage()}
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
