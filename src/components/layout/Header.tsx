import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { cn } from '../../lib/utils';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useI18n();

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
        className="max-w-[1080px] mx-auto px-6 transition-all duration-500 relative"
        style={{
          background: scrolled ? 'rgba(245, 230, 238, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled ? '0 8px 32px rgba(141, 64, 116, 0.12)' : 'none',
          borderRadius: scrolled ? '20px' : '0',
          border: scrolled ? '1px solid rgba(141, 64, 116, 0.08)' : '1px solid transparent',
        }}
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center group">
            <img 
              src="/Portfolio/assets/logo-moussandou.png" 
              alt="Moussandou" 
              className={cn(
                "object-contain transition-all duration-500 group-hover:scale-105",
                scrolled ? "h-14 md:h-16" : "h-20 md:h-24"
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-1">
              <Link to="/" className="px-5 py-2 rounded-xl text-sm font-bold text-[#8D4074] hover:bg-white/40 transition-colors font-display">
                {t('header.home')}
              </Link>
              <Link to="/projects" className="px-5 py-2 rounded-xl text-sm font-bold text-[#8D4074] hover:bg-white/40 transition-colors font-display">
                {t('header.projects')}
              </Link>
              <Link to="/contact" className="px-5 py-2 rounded-xl text-sm font-bold text-[#8D4074] hover:bg-white/40 transition-colors font-display">
                {t('header.contact')}
              </Link>
            </nav>

            {/* Desktop Language Switcher */}
            <div className="flex items-center gap-0.5 p-1 bg-white/35 backdrop-blur-md rounded-full border border-[#8D4074]/10 shadow-sm ml-2">
              <button
                onClick={() => setLanguage('fr')}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-black tracking-wider transition-all duration-300",
                  language === 'fr' ? "bg-[#8D4074] text-white shadow-sm" : "text-[#8D4074]/60 hover:text-[#8D4074]"
                )}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-black tracking-wider transition-all duration-300",
                  language === 'en' ? "bg-[#8D4074] text-white shadow-sm" : "text-[#8D4074]/60 hover:text-[#8D4074]"
                )}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#8D4074] hover:bg-white/35 rounded-xl transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-[#F5E6EE]/95 backdrop-blur-xl border border-[#8D4074]/10 rounded-2xl shadow-xl flex flex-col gap-4 md:hidden z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col gap-1">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-bold text-[#8D4074] hover:bg-white/40 transition-colors font-display"
              >
                {t('header.home')}
              </Link>
              <Link 
                to="/projects" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-bold text-[#8D4074] hover:bg-white/40 transition-colors font-display"
              >
                {t('header.projects')}
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-bold text-[#8D4074] hover:bg-white/40 transition-colors font-display"
              >
                {t('header.contact')}
              </Link>
            </nav>

            <div className="h-px bg-[#8D4074]/10 my-1" />

            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm font-bold text-[#8D4074]/60">Language / Langue</span>
              <div className="flex items-center gap-0.5 p-1 bg-white/30 rounded-full border border-[#8D4074]/10">
                <button
                  onClick={() => {
                    setLanguage('fr');
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-black transition-all duration-300",
                    language === 'fr' ? "bg-[#8D4074] text-white" : "text-[#8D4074]/60"
                  )}
                >
                  FR
                </button>
                <button
                  onClick={() => {
                    setLanguage('en');
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-black transition-all duration-300",
                    language === 'en' ? "bg-[#8D4074] text-white" : "text-[#8D4074]/60"
                  )}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
