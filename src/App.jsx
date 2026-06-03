import React, { useState } from 'react';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { CourseLearning } from './pages/CourseLearning';
import { Projects } from './pages/Projects';
import { Quiz } from './pages/Quiz';
import { Profile } from './pages/Profile';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [activePage, setActivePage] = useState('home');

  const handleNavigateToProjects = () => {
    setActivePage('projects');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'course':
        return <CourseLearning onNavigateToProjects={handleNavigateToProjects} />;
      case 'projects':
        return <Projects />;
      case 'quiz':
        return <Quiz />;
      case 'profile':
        return <Profile />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <Header activePage={activePage} setActivePage={setActivePage} />
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
