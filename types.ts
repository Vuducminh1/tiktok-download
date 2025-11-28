export type Platform = 'tiktok' | 'douyin';
export type DownloadType = 'single' | 'channel';
export type Language = 'en' | 'vi';

export interface Author {
  id: string;
  uniqueId: string;
  nickname: string;
  avatar: string;
}

export interface VideoStats {
  plays: number;
  likes: number;
  comments: number;
  shares: number;
}

export interface VideoData {
  id: string;
  description: string;
  cover: string;
  author: Author;
  playUrl: string; // The No-Watermark URL
  watermarkUrl: string;
  musicUrl: string;
  duration: number; // in seconds
  stats: VideoStats;
  images?: string[]; // For slide posts
  createdAt: string;
  platform: Platform;
}

export interface ChannelData {
  id: string;
  author: Author;
  stats: {
    followerCount: number;
    heartCount: number;
    videoCount: number;
  };
  videos: VideoData[]; // Simplified list for the channel
}

export interface ApiError {
  message: string;
  code?: string;
}