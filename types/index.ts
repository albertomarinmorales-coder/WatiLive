// TypeScript interfaces for the gamer landing page

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}

export interface TwitchStream {
  id: string;
  title: string;
  thumbnail: string;
  viewerCount: number;
  startedAt: string;
  isLive: boolean;
}

export interface StreamerInfo {
  name: string;
  avatar: string;
  bio: string;
  socialLinks: {
    twitch?: string;
    youtube?: string;
    discord?: string;
    twitter?: string;
  };
}

export type TabType = 'about' | 'youtube' | 'twitch' | 'clips';
