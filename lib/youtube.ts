import axios from 'axios';
import { YouTubeVideo } from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

export async function getRecentVideos(maxResults: number = 6): Promise<YouTubeVideo[]> {
    if (!API_KEY || !CHANNEL_ID) {
        console.warn('YouTube API credentials not configured');
        return getMockVideos();
    }

    try {
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
                params: {
                    key: API_KEY,
                    channelId: CHANNEL_ID,
                    part: 'snippet',
                    order: 'date',
                    maxResults,
                    type: 'video',
                },
            }
        );

        return response.data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            publishedAt: item.snippet.publishedAt,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        return getMockVideos();
    }
}

// Mock data for when API is not configured
function getMockVideos(): YouTubeVideo[] {
    return [
        {
            id: '1',
            title: 'Epic Gaming Moment #1 - The Binding of Isaac',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/ef4444?text=Video+1',
            publishedAt: new Date().toISOString(),
            url: '#',
        },
        {
            id: '2',
            title: 'Speedrun Attempt - New Personal Best!',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/a855f7?text=Video+2',
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            url: '#',
        },
        {
            id: '3',
            title: 'Crazy Boss Fight - You Won\'t Believe This',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/10b981?text=Video+3',
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            url: '#',
        },
        {
            id: '4',
            title: 'Best Moments Compilation',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/ef4444?text=Video+4',
            publishedAt: new Date(Date.now() - 259200000).toISOString(),
            url: '#',
        },
        {
            id: '5',
            title: 'New Game First Impressions',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/a855f7?text=Video+5',
            publishedAt: new Date(Date.now() - 345600000).toISOString(),
            url: '#',
        },
        {
            id: '6',
            title: 'Community Challenge Complete!',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/10b981?text=Video+6',
            publishedAt: new Date(Date.now() - 432000000).toISOString(),
            url: '#',
        },
    ];
}
