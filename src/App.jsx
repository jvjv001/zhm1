import React, { useState } from 'react';
import { Header } from './components/Header';
import { CourseLearning } from './pages/CourseLearning';
import { Projects } from './pages/Projects';
import { Quiz } from './pages/Quiz';
import { Profile } from './pages/Profile';

function App() {
  const [activePage, setActivePage] = useState('course');

  const handleNavigateToProjects = () => {
    setActivePage('projects');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'course':
        return <CourseLearning onNavigateToProjects={handleNavigateToProjects} />;
      case 'projects':
        return <Projects />;
      case 'quiz':
        return <Quiz />;
      case 'profile':
        return <Profile />;
      default:
        return <CourseLearning onNavigateToProjects={handleNavigateToProjects} />;
    }
  };

  return (
    <div className="app">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
