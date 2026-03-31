import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 transition-all duration-300" style={{ paddingTop: scrolled ? '10px' : '0' }}>
      <div 
        className="max-w-[1080px] mx-auto px-6 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(245, 230, 238, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled ? '0 8px 32px rgba(141, 64, 116, 0.12)' : 'none',
          borderRadius: scrolled ? '20px' : '0',
          border: scrolled ? '1px solid rgba(141, 64, 116, 0.08)' : '1px solid transparent',
        }}
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          
          <Link to="/" className="flex items-center group">
            <img 
              src="/Portfolio/assets/logo-moussandou.png" 
              alt="Moussandou" 
              className="object-contain transition-all duration-500 group-hover:scale-105"
              style={{ height: '8rem' }}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link to="/" className="px-5 py-2 rounded-xl text-sm font-bold text-[#8D4074] hover:bg-white/40 transition-colors font-display">
              Home
            </Link>
            <Link to="/projects" className="px-5 py-2 rounded-xl text-sm font-bold text-[#8D4074] hover:bg-white/40 transition-colors font-display">
              Projets
            </Link>
            <Link to="/contact" className="px-5 py-2 rounded-xl text-sm font-bold text-[#8D4074] hover:bg-white/40 transition-colors font-display">
              Contact
            </Link>
          </nav>

          <div className="md:hidden p-2 text-[#8D4074]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
