import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Clouds } from './components/decorative/Clouds';
import { Home } from './pages/Home';
import { ProjectList } from './pages/ProjectList';
import { ProjectDetail } from './pages/ProjectDetail';
import { Contact } from './pages/Contact';
import { I18nProvider } from './context/I18nContext';

/* Scrolls back to the top whenever the route changes */
function ScrollRestore() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <I18nProvider>
        <div className="min-h-screen bg-[#F1ECF9]">
          <ScrollRestore />
          <Clouds />
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </I18nProvider>
    </HashRouter>
  );
}
