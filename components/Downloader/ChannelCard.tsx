import React from 'react';
import { ChannelData, Language } from '../../types';
import { Download, Users, Heart, Video } from 'lucide-react';
import { translations } from '../../utils/translations';

interface ChannelCardProps {
  data: ChannelData;
  onReset: () => void;
  lang: Language;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ data, onReset, lang }) => {
  const t = translations[lang].results;
  
  return (
    <div className="w-full max-w-5xl mx-auto mt-10 animate-fade-in-up">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
            <img src={data.author.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-indigo-100 dark:border-indigo-900/50" />
            <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{data.author.nickname}</h2>
                <p className="text-slate-500 dark:text-slate-400">@{data.author.uniqueId}</p>
                <div className="flex justify-center md:justify-start gap-6 mt-4">
                    <div className="flex items-center gap-1.5">
                        <Users size={18} className="text-indigo-500" />
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{(data.stats.followerCount / 1000).toFixed(1)}k</span> <span className="text-xs text-slate-500">{t.followers}</span>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Heart size={18} className="text-pink-500" />
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{(data.stats.heartCount / 1000000).toFixed(1)}M</span> <span className="text-xs text-slate-500">{t.likes}</span>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Video size={18} className="text-blue-500" />
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{data.stats.videoCount}</span> <span className="text-xs text-slate-500">{t.videos}</span>
                    </div>
                </div>
            </div>
             <div className="flex flex-col gap-2 w-full md:w-auto">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl flex items-center justify-center gap-2 transition-all">
                    <Download size={18} /> {t.downloadAllZip}
                </button>
                 <button onClick={onReset} className="text-slate-500 hover:text-indigo-600 text-sm underline">
                    {t.analyzeAnother}
                </button>
            </div>
        </div>
      </div>

      {/* Video Grid */}
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 px-2">{t.latestVideos}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.videos.map((video, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group">
                <div className="relative aspect-[9/16] bg-slate-900 overflow-hidden">
                    <img src={video.cover} alt="thumb" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                         <div className="text-white text-xs flex justify-between items-center">
                            <span className="flex items-center gap-1"><Heart size={10} fill="currentColor" /> {(video.stats.likes / 1000).toFixed(1)}k</span>
                            <span>{video.duration}s</span>
                         </div>
                    </div>
                </div>
                <div className="p-3">
                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 mb-3 h-10">{video.description}</p>
                    <button className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-semibold py-2 rounded-lg transition-colors">
                        {t.download}
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelCard;