import { VideoData, ChannelData } from '../types';

export const MOCK_VIDEO_TIKTOK: VideoData = {
  id: "728492019283",
  description: "POV: You found the perfect sunset spot 🌅 #travel #nature #vibes",
  cover: "https://picsum.photos/400/700",
  author: {
    id: "user123",
    uniqueId: "travel_addict",
    nickname: "Sarah Travels",
    avatar: "https://picsum.photos/100/100",
  },
  playUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder MP4
  watermarkUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  duration: 45,
  stats: {
    plays: 1500000,
    likes: 245000,
    comments: 1200,
    shares: 5600,
  },
  createdAt: "2023-10-15T10:00:00Z",
  platform: 'tiktok'
};

export const MOCK_VIDEO_DOUYIN: VideoData = {
  id: "882910293",
  description: "Delicious street food in Chengdu! 🍜🌶️ #foodie #china",
  cover: "https://picsum.photos/401/701",
  author: {
    id: "dy_999",
    uniqueId: "chengdu_eats",
    nickname: "Sichuan Flavor",
    avatar: "https://picsum.photos/101/101",
  },
  playUrl: "https://www.w3schools.com/html/movie.mp4", // Placeholder MP4
  watermarkUrl: "https://www.w3schools.com/html/movie.mp4",
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  duration: 60,
  stats: {
    plays: 5000000,
    likes: 890000,
    comments: 34000,
    shares: 12000,
  },
  createdAt: "2023-11-01T12:00:00Z",
  platform: 'douyin'
};

export const MOCK_SLIDES_TIKTOK: VideoData = {
    id: "728492019999",
    description: "My favorite wallpapers dump 📸 #aesthetic",
    cover: "https://picsum.photos/402/702",
    author: {
      id: "user456",
      uniqueId: "design_daily",
      nickname: "Design Daily",
      avatar: "https://picsum.photos/102/102",
    },
    playUrl: "", // Empty for slides
    watermarkUrl: "",
    musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: 0,
    stats: {
      plays: 50000,
      likes: 4000,
      comments: 100,
      shares: 50,
    },
    images: [
        "https://picsum.photos/600/800?random=1",
        "https://picsum.photos/600/800?random=2",
        "https://picsum.photos/600/800?random=3",
        "https://picsum.photos/600/800?random=4"
    ],
    createdAt: "2023-10-16T10:00:00Z",
    platform: 'tiktok'
};

export const MOCK_CHANNEL: ChannelData = {
    id: "ch_001",
    author: {
        id: "user123",
        uniqueId: "travel_addict",
        nickname: "Sarah Travels",
        avatar: "https://picsum.photos/100/100",
    },
    stats: {
        followerCount: 1200000,
        heartCount: 55000000,
        videoCount: 142
    },
    videos: [MOCK_VIDEO_TIKTOK, MOCK_VIDEO_DOUYIN, MOCK_SLIDES_TIKTOK, MOCK_VIDEO_TIKTOK]
}