import { VideoData, ChannelData, ApiError } from '../types';
import { MOCK_VIDEO_DOUYIN, MOCK_VIDEO_TIKTOK, MOCK_SLIDES_TIKTOK, MOCK_CHANNEL } from './mockData';

// In a real app, this would point to your Node/Python backend
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  /**
   * Simulate fetching single video data
   */
  getVideo: async (url: string): Promise<VideoData> => {
    await delay(1500); // Simulate network latency

    if (!url.includes('tiktok.com') && !url.includes('douyin.com')) {
      throw new Error('Invalid URL. Please provide a valid TikTok or Douyin link.');
    }

    // Mock logic to return different types of content based on URL keywords
    if (url.includes('slide')) {
        return MOCK_SLIDES_TIKTOK;
    }
    
    if (url.includes('douyin')) {
      return MOCK_VIDEO_DOUYIN;
    }

    return MOCK_VIDEO_TIKTOK;
  },

  /**
   * Simulate fetching channel/profile data
   */
  getChannel: async (url: string): Promise<ChannelData> => {
    await delay(2000);
    
    if (!url) throw new Error("URL is required");

    return MOCK_CHANNEL;
  }
};