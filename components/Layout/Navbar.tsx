import React, { useState } from 'react';
import { Menu, X, Download, Moon, Sun, Languages, ChevronDown, Check } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onNavigate: (view: 'home' | 'login') => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme, lang, setLang, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  const t = translations[lang].nav;

  const navLinks = [
    { name: t.home, href: '#', action: () => onNavigate('home') },
    { name: t.douyin, href: '#douyin', action: () => onNavigate('home') },
    { name: t.tiktok, href: '#tiktok', action: () => onNavigate('home') },
    { name: t.api, href: '#api', action: () => onNavigate('home') },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ];

  const handleLanguageSelect = (code: Language) => {
    setLang(code);
    setIsLangMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
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
                onClick={(e) => {
                  e.preventDefault();
                  link.action();
                }}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>

            {/* Language Dropdown */}
            <div className="relative">
                <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-2 py-1 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                    <Languages size={18} />
                    <span>{languages.find(l => l.code === lang)?.label}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLangMenuOpen && (
                    <>
                        <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setIsLangMenuOpen(false)} 
                        />
                        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white dark:bg-slate-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-20 py-1 border border-slate-100 dark:border-slate-700 animate-fade-in-up">
                            {languages.map((item) => (
                                <button
                                    key={item.code}
                                    onClick={() => handleLanguageSelect(item.code)}
                                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors
                                        ${lang === item.code 
                                            ? 'text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50/50 dark:bg-indigo-900/20' 
                                            : 'text-slate-700 dark:text-slate-200'
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span>{item.flag}</span>
                                        {item.label}
                                    </span>
                                    {lang === item.code && <Check size={14} />}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              onClick={() => onNavigate('login')}
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg"
            >
              {t.logIn}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
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
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800"
                onClick={(e) => {
                  e.preventDefault();
                  link.action();
                  setIsMenuOpen(false);
                }}
              >
                {link.name}
              </a>
            ))}
            
            <div className="border-t border-slate-100 dark:border-slate-800 my-2 pt-2">
                <p className="px-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    Language / Ngôn ngữ
                </p>
                <div className="grid grid-cols-2 gap-2 px-1">
                    {languages.map((item) => (
                        <button
                            key={item.code}
                            onClick={() => handleLanguageSelect(item.code)}
                            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all
                                ${lang === item.code 
                                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300'
                                }`}
                        >
                            <span>{item.flag}</span> {item.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="pt-2">
                <button 
                onClick={() => {
                    onNavigate('login');
                    setIsMenuOpen(false);
                }}
                className="w-full text-center px-3 py-3 rounded-xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20"
                >
                {t.logIn}
                </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;