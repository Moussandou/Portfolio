import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { cn } from '../../lib/utils';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useI18n();
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change or Escape
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  return (
    <header className="w-full sticky top-0 z-50 transition-all duration-300" style={{ paddingTop: scrolled ? '10px' : '0' }}>
      <div 
        className="max-w-[1080px] mx-auto px-6 transition-all duration-500 relative"
        style={{
          background: scrolled ? 'rgba(241, 236, 249, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled ? '0 8px 32px rgba(109, 68, 153, 0.12)' : 'none',
          borderRadius: scrolled ? '20px' : '0',
          border: scrolled ? '1px solid rgba(109, 68, 153, 0.08)' : '1px solid transparent',
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
              {([['/', 'header.home'], ['/projects', 'header.projects'], ['/contact', 'header.contact']] as const).map(([path, key]) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "relative px-5 py-2 rounded-xl text-sm font-bold transition-colors font-display group",
                    isActive(path) ? "text-[#3B2356] bg-white/50 shadow-sm" : "text-[#6D4499] hover:bg-white/40"
                  )}
                >
                  {t(key)}
                  <span className={cn(
                    "absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] rounded-full bg-[#6D4499] transition-all duration-300",
                    isActive(path) ? "w-5 opacity-60" : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-40"
                  )} />
                </Link>
              ))}
            </nav>

            {/* Desktop Language Switcher */}
            <div className="flex items-center gap-0.5 p-1 bg-white/35 backdrop-blur-md rounded-full border border-[#6D4499]/10 shadow-sm ml-2">
              <button
                onClick={() => setLanguage('fr')}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-black tracking-wider transition-all duration-300",
                  language === 'fr' ? "bg-[#6D4499] text-white shadow-sm" : "text-[#6D4499]/60 hover:text-[#6D4499]"
                )}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-black tracking-wider transition-all duration-300",
                  language === 'en' ? "bg-[#6D4499] text-white shadow-sm" : "text-[#6D4499]/60 hover:text-[#6D4499]"
                )}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#6D4499] hover:bg-white/35 active:scale-90 rounded-xl transition-all focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <>
            {/* Click-away backdrop */}
            <div
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-[#F1ECF9]/95 backdrop-blur-xl border border-[#6D4499]/10 rounded-2xl shadow-xl flex flex-col gap-4 md:hidden z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col gap-1">
              {([['/', 'header.home'], ['/projects', 'header.projects'], ['/contact', 'header.contact']] as const).map(([path, key]) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-bold transition-colors font-display",
                    isActive(path) ? "text-[#3B2356] bg-white/60 shadow-sm" : "text-[#6D4499] hover:bg-white/40"
                  )}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>

            <div className="h-px bg-[#6D4499]/10 my-1" />

            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm font-bold text-[#6D4499]/60">Language / Langue</span>
              <div className="flex items-center gap-0.5 p-1 bg-white/30 rounded-full border border-[#6D4499]/10">
                <button
                  onClick={() => {
                    setLanguage('fr');
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-black transition-all duration-300",
                    language === 'fr' ? "bg-[#6D4499] text-white" : "text-[#6D4499]/60"
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
                    language === 'en' ? "bg-[#6D4499] text-white" : "text-[#6D4499]/60"
                  )}
                >
                  EN
                </button>
              </div>
            </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
