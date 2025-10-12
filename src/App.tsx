import Admin from '@pages/Admin';
import Contact from '@pages/Contact';
import Home from '@pages/Home';
import Projects from '@pages/Projects';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

const App = () => {
  return (
    <div className="App overflow-y-scroll h-screen" style={{ scrollSnapType: 'y mandatory' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
