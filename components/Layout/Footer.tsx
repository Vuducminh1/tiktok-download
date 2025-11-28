import React from 'react';
import { Heart, Twitter, Github, Globe } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang].footer;
  const tNav = translations[lang].nav;

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
             <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              TikDou<span className="text-slate-700 dark:text-slate-300">Save</span>
            </span>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              {t.desc}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-wider uppercase">{t.products}</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">{tNav.tiktok}</a></li>
              <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">{tNav.douyin}</a></li>
              <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Slideshow Downloader</a></li>
            </ul>
          </div>

           <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-wider uppercase">{t.company}</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">{t.about}</a></li>
              <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">{t.privacy}</a></li>
              <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">{t.terms}</a></li>
            </ul>
          </div>

          <div>
             <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-wider uppercase">{t.connect}</h3>
             <div className="mt-4 flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-indigo-500">
                  <Twitter size={20} />
                </a>
                 <a href="#" className="text-slate-400 hover:text-indigo-500">
                  <Github size={20} />
                </a>
                 <a href="#" className="text-slate-400 hover:text-indigo-500">
                  <Globe size={20} />
                </a>
             </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8 flex items-center justify-center">
          <p className="text-sm text-slate-400 flex items-center gap-1">
            {t.copyright} <Heart size={14} className="text-red-500 fill-current" /> {t.forCreators} © 2024 TikDouSave.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;