import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import SearchPage from './components/SearchPage';

type ViewState = 'landing' | 'search';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [searchParams, setSearchParams] = useState({ location: '', dates: '', guests: '' });
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    // Default to light if nothing is stored, or if stored is 'light'
    if (storedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navigateToSearch = (params?: { location: string; dates: string; guests: string }) => {
    if (params) setSearchParams(params);
    setCurrentView('search');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentView('landing');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-landing-bg text-slate-900 dark:text-white font-sans selection:bg-primary selection:text-landing-bg transition-colors duration-300">
      {currentView === 'landing' ? (
        <LandingPage 
          onSearch={navigateToSearch} 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
        />
      ) : (
        <SearchPage 
          onBack={navigateToHome} 
          initialLocation={searchParams.location}
          isDark={isDark} 
          toggleTheme={toggleTheme} 
        />
      )}
    </div>
  );
}