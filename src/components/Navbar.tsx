import { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Settings, 
  BookOpen, 
  Image as ImageIcon, 
  Calendar, 
  Users, 
  Phone, 
  Award,
  HelpCircle
} from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenGuide: () => void;
  isToday: boolean;
}

export function Navbar({ onOpenAdmin, onOpenGuide, isToday }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home', icon: GraduationCap },
    { name: 'KUHUSU', href: '#kuhusu', icon: BookOpen },
    { name: 'MAHAFALI', href: '#mahafali', icon: Award },
    { name: 'PICHA', href: '#picha', icon: ImageIcon },
    { name: 'RATIBA', href: '#ratiba', icon: Calendar },
    { name: 'WAHITIMU', href: '#wahitimu', icon: Users },
    { name: 'MAWASILIANO', href: '#mawasiliano', icon: Phone },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-2.5 border-b border-blue-900/40 text-white'
            : 'bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 py-3.5 text-white border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* School Logo & Title */}
            <a 
              href="#home" 
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="Tura Secondary School Nyumbani"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-600 via-emerald-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm sm:text-base lg:text-lg tracking-tight font-serif text-white group-hover:text-blue-300 transition-colors uppercase">
                    TURA SECONDARY GRADUATION
                  </span>
                  {isToday && (
                    <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
                      Leo
                    </span>
                  )}
                </div>
                <p className="text-[11px] sm:text-xs text-blue-200/80 font-medium">
                  Uyui, Tabora • Mahafali ya Kidato cha Nne 2026
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Menyu Kuu">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all duration-150"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={onOpenGuide}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white transition-all border border-white/15"
                title="Mwongozo wa matumizi na jinsi ya ku-deploy mtandaoni"
              >
                <HelpCircle className="w-4 h-4 text-sky-400" />
                <span>Mwongozo</span>
              </button>

              <button
                onClick={onOpenAdmin}
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm hover:shadow transition-all"
                title="Simamia picha, ratiba na taarifa za shule"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Simamia Tovuti</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={onOpenAdmin}
                type="button"
                className="p-1.5 rounded-lg bg-emerald-700/80 text-white text-xs"
                title="Simamia Tovuti"
              >
                <Settings className="w-4 h-4" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none"
                aria-label={mobileMenuOpen ? 'Funga menyu' : 'Fungua menyu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-200 bg-white/5 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4 text-blue-400" />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGuide();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold transition-all"
              >
                <HelpCircle className="w-4 h-4 text-sky-400" />
                <span>Mwongozo wa Tovuti & Deployment</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow"
              >
                <Settings className="w-4 h-4" />
                <span>Simamia Picha, Ratiba na Taarifa</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Spacer so content is not hidden under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
