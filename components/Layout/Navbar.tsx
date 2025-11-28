import React, { useState } from 'react';
import { Menu, X, Download, Moon, Sun, Languages } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme, lang, setLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang].nav;

  const navLinks = [
    { name: t.home, href: '#' },
    { name: t.douyin, href: '#douyin' },
    { name: t.tiktok, href: '#tiktok' },
    { name: t.api, href: '#api' },
  ];

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'vi' : 'en');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Download size={20} strokeWidth={3} />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              TikDou<span className="text-slate-700 dark:text-slate-300">Save</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Languages size={18} />
              <span>{lang.toUpperCase()}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <a href="#" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg">
              {t.getStarted}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
             <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm font-bold text-slate-600 dark:text-slate-300"
            >
              {lang.toUpperCase()}
            </button>
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;