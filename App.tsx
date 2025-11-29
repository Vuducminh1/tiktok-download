import React, { useState, useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import { DownloadType, VideoData, ChannelData, Language } from './types';
import { apiService } from './services/apiService';
import { ArrowRight, CheckCircle, Smartphone, Zap, Music, Link2, Loader2, AlertCircle } from 'lucide-react';
import ResultCard from './components/Downloader/ResultCard';
import ChannelCard from './components/Downloader/ChannelCard';
import { translations } from './utils/translations';
import AuthPage from './components/Auth/AuthPage.tsx';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState<Language>('vi'); // Default to Vietnamese
  const [downloadType, setDownloadType] = useState<DownloadType>('single');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [videoResult, setVideoResult] = useState<VideoData | null>(null);
  const [channelResult, setChannelResult] = useState<ChannelData | null>(null);

  const [currentView, setCurrentView] = useState<'home' | 'login'>('home');
  const t = translations[lang];

  // Theme Toggling
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Handlers
  const handleDownload = async () => {
    if (!url) {
        setError(t.hero.errorEmpty);
        return;
    }
    
    setIsLoading(true);
    setError(null);
    setVideoResult(null);
    setChannelResult(null);

    try {
        if (downloadType === 'single') {
            const data = await apiService.getVideo(url);
            setVideoResult(data);
        } else {
            const data = await apiService.getChannel(url);
            setChannelResult(data);
        }
    } catch (err: any) {
        setError(err.message || t.hero.errorGeneric);
    } finally {
        setIsLoading(false);
    }
  };

  const handleReset = () => {
    setVideoResult(null);
    setChannelResult(null);
    setUrl('');
    setError(null);
  }

  // Helper Components
  const FeatureItem = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
        <Icon size={24} />
      </div>
      <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        lang={lang} 
        setLang={setLang}
        onNavigate={setCurrentView}
      />
      
      <main className="flex-grow flex flex-col">
        {currentView === 'home' ? (
            <>
        
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-50 dark:from-indigo-950/20 to-transparent -z-10" />
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              {t.hero.titleStart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">{t.hero.titleHighlight}</span> {t.hero.titleEnd}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>

            {/* Downloader Interface */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-indigo-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 p-2 md:p-3 max-w-3xl mx-auto">
               
               {/* Tabs */}
               <div className="flex gap-2 mb-3 px-2 pt-2">
                   <button 
                        onClick={() => setDownloadType('single')}
                        className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${downloadType === 'single' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                    >
                        {t.hero.tabSingle}
                   </button>
                    <button 
                        onClick={() => setDownloadType('channel')}
                        className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${downloadType === 'channel' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                    >
                        {t.hero.tabChannel}
                   </button>
               </div>

               {/* Input Area */}
               <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Link2 className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder={downloadType === 'single' ? t.hero.placeholderSingle : t.hero.placeholderChannel}
                        className="block w-full pl-11 pr-32 py-4 text-base rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-0 transition-all"
                        onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
                    />
                    <div className="absolute inset-y-0 right-2 flex items-center">
                        <button 
                            onClick={handleDownload}
                            disabled={isLoading}
                            className="h-10 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={18} /> : (
                                <>
                                    <span>{t.hero.btnDownload}</span> <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </div>
               </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-6 flex items-center justify-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 py-2 px-4 rounded-lg inline-flex mx-auto">
                    <AlertCircle size={18} />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}
          </div>
        </section>

        {/* Results Section */}
        <section className="px-4 pb-20">
             {videoResult && <ResultCard data={videoResult} onReset={handleReset} lang={lang} />}
             {channelResult && <ChannelCard data={channelResult} onReset={handleReset} lang={lang} />}
        </section>

        {/* Features Section */}
        {!videoResult && !channelResult && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t.features.title}</h2>
                <p className="text-slate-500 dark:text-slate-400">{t.features.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FeatureItem 
                    icon={CheckCircle} 
                    title={t.features.f1Title} 
                    desc={t.features.f1Desc} 
                />
                <FeatureItem 
                    icon={Music} 
                    title={t.features.f2Title} 
                    desc={t.features.f2Desc} 
                />
                <FeatureItem 
                    icon={Smartphone} 
                    title={t.features.f3Title} 
                    desc={t.features.f3Desc} 
                />
                <FeatureItem 
                    icon={Zap} 
                    title={t.features.f4Title} 
                    desc={t.features.f4Desc} 
                />
            </div>
            </section>
       )}
            </>
        ) : (
            <AuthPage lang={lang} onNavigateHome={() => setCurrentView('home')} />
        )}

      </main>
      
      <Footer lang={lang} />
    </div>
  );
}

export default App;