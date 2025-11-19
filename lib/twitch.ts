import axios from 'axios';
import { TwitchStream } from '@/types';

const CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET;
const USERNAME = process.env.NEXT_PUBLIC_TWITCH_USERNAME;

let accessToken: string | null = null;

async function getAccessToken(): Promise<string> {
    if (accessToken) return accessToken;

    if (!CLIENT_ID || !CLIENT_SECRET) {
        throw new Error('Twitch API credentials not configured');
    }

    try {
        const response = await axios.post(
            'https://id.twitch.tv/oauth2/token',
            null,
            {
                params: {
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    grant_type: 'client_credentials',
                },
            }
        );

        accessToken = response.data.access_token;
        return accessToken as string;
    } catch (error) {
        console.error('Error getting Twitch access token:', error);
        throw error;
    }
}

export async function checkLiveStatus(): Promise<boolean> {
    if (!CLIENT_ID || !USERNAME) {
        return false; // Mock: not live
    }

    try {
        const token = await getAccessToken();
        const response = await axios.get(
            `https://api.twitch.tv/helix/streams?user_login=${USERNAME}`,
            {
                headers: {
                    'Client-ID': CLIENT_ID,
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.data.length > 0;
    } catch (error) {
        console.error('Error checking Twitch live status:', error);
        return false;
    }
}

export async function getRecentStreams(maxResults: number = 3): Promise<TwitchStream[]> {
    if (!CLIENT_ID || !USERNAME) {
        return getMockStreams();
    }

    try {
        const token = await getAccessToken();

        // First, get user ID
        const userResponse = await axios.get(
            `https://api.twitch.tv/helix/users?login=${USERNAME}`,
            {
                headers: {
                    'Client-ID': CLIENT_ID,
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const userId = userResponse.data.data[0]?.id;
        if (!userId) return getMockStreams();

        // Get recent videos/VODs
        const videosResponse = await axios.get(
            `https://api.twitch.tv/helix/videos?user_id=${userId}&first=${maxResults}`,
            {
                headers: {
                    'Client-ID': CLIENT_ID,
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return videosResponse.data.data.map((video: any) => ({
            id: video.id,
            title: video.title,
            thumbnail: video.thumbnail_url.replace('%{width}', '480').replace('%{height}', '360'),
            viewerCount: video.view_count,
            startedAt: video.created_at,
            isLive: false,
        }));
    } catch (error) {
        console.error('Error fetching Twitch streams:', error);
        return getMockStreams();
    }
}

// Mock data for when API is not configured
function getMockStreams(): TwitchStream[] {
    return [
        {
            id: '1',
            title: 'Chill Gaming Session - The Binding of Isaac',
            thumbnail: 'https://via.placeholder.com/480x360/6441a5/ffffff?text=Stream+1',
            viewerCount: 1234,
            startedAt: new Date(Date.now() - 3600000).toISOString(),
            isLive: false,
        },
        {
            id: '2',
            title: 'Speedrun Practice - Going for WR!',
            thumbnail: 'https://via.placeholder.com/480x360/6441a5/ffffff?text=Stream+2',
            viewerCount: 2345,
            startedAt: new Date(Date.now() - 86400000).toISOString(),
            isLive: false,
        },
        {
            id: '3',
            title: 'Community Game Night',
            thumbnail: 'https://via.placeholder.com/480x360/6441a5/ffffff?text=Stream+3',
            viewerCount: 3456,
            startedAt: new Date(Date.now() - 172800000).toISOString(),
            isLive: false,
        },
    ];
}
