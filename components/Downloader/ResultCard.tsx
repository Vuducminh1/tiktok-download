import React from 'react';
import { VideoData, Language } from '../../types';
import { Download, Music, Image as ImageIcon, ExternalLink, Play } from 'lucide-react';
import { translations } from '../../utils/translations';

interface ResultCardProps {
  data: VideoData;
  onReset: () => void;
  lang: Language;
}

const ResultCard: React.FC<ResultCardProps> = ({ data, onReset, lang }) => {
  const isSlide = data.images && data.images.length > 0;
  const t = translations[lang].results;

  const handleDownload = (url: string, filename: string) => {
    // In a real app, this would trigger a blob download or proxy redirect
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Thumbnail/Preview */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="relative rounded-xl overflow-hidden shadow-md aspect-[9/16] bg-slate-900 group">
                <img 
                  src={data.cover} 
                  alt={data.description} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                {!isSlide && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                            <Play size={24} fill="currentColor" />
                        </div>
                    </div>
                )}
                {isSlide && (
                    <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                        <ImageIcon size={12} /> {data.images?.length} Slides
                    </div>
                )}
              </div>
            </div>

            {/* Right: Info & Actions */}
            <div className="flex-1 flex flex-col">
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-4">
                <img src={data.author.avatar} alt={data.author.nickname} className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-600" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white leading-tight">{data.author.nickname}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">@{data.author.uniqueId}</p>
                </div>
                <div className="ml-auto">
                    <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${data.platform === 'tiktok' ? 'bg-black text-white' : 'bg-red-600 text-white'}`}>
                        {data.platform}
                    </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 line-clamp-3">
                {data.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-2 mb-6 text-center">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2">
                    <span className="block text-xs text-slate-500 dark:text-slate-400">{t.plays}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{data.stats.plays.toLocaleString()}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2">
                    <span className="block text-xs text-slate-500 dark:text-slate-400">{t.likes}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{data.stats.likes.toLocaleString()}</span>
                </div>
                 <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2">
                    <span className="block text-xs text-slate-500 dark:text-slate-400">{t.comments}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{data.stats.comments.toLocaleString()}</span>
                </div>
                 <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2">
                    <span className="block text-xs text-slate-500 dark:text-slate-400">{t.shares}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{data.stats.shares.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-auto">
                {!isSlide ? (
                    <>
                    <button 
                        onClick={() => handleDownload(data.playUrl, `video_${data.id}.mp4`)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                    >
                    <Download size={20} /> {t.downloadNoWatermark}
                    </button>
                    
                    <button 
                        onClick={() => handleDownload(data.watermarkUrl, `video_wm_${data.id}.mp4`)}
                        className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 font-medium py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                    <Download size={18} /> {t.downloadWatermark}
                    </button>
                    </>
                ) : (
                    <button 
                        onClick={() => handleDownload('#', 'slides.zip')}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                    >
                    <ImageIcon size={20} /> {t.downloadSlides}
                    </button>
                )}

                <div className="grid grid-cols-2 gap-3">
                     <button 
                         onClick={() => handleDownload(data.musicUrl, `audio_${data.id}.mp3`)}
                         className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 font-medium py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                    <Music size={18} /> {t.downloadMp3}
                    </button>
                     <button 
                         onClick={onReset}
                         className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 font-medium py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                    <ExternalLink size={18} /> {t.downloadAnother}
                    </button>
                </div>
              </div>
            </div>
          </div>
          
          {isSlide && data.images && (
            <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">{t.galleryPreview}</h4>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                    {data.images.map((img, idx) => (
                        <img key={idx} src={img} alt={`Slide ${idx}`} className="h-32 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 flex-shrink-0" />
                    ))}
                </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResultCard;