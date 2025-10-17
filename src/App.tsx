import Admin from '@pages/Admin';
import Contact from '@pages/Contact';
import Home from '@pages/Home';
import ProjectDetail from '@pages/ProjectDetail';
import Projects from '@pages/Projects';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';

const App = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (isHome) {
      document.body.classList.add('bg-klein');
    } else {
      document.body.classList.remove('bg-klein');
    }

    return () => {
      document.body.classList.remove('bg-klein');
    };
  }, [isHome]);

  return (
    <div className="App overflow-y-scroll h-screen" style={{ scrollSnapType: 'y mandatory' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
