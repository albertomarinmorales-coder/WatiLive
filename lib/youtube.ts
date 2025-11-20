import axios from 'axios';
import { YouTubeVideo } from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

export async function getRecentVideos(maxResults: number = 6, channelType: 'live' | 'plus' = 'live'): Promise<YouTubeVideo[]> {
    if (!API_KEY || !CHANNEL_ID) {
        console.warn('Credenciales de la API de YouTube no configuradas');
        return getMockVideos(channelType);
    }

    // TODO: Use different CHANNEL_ID based on channelType if provided in the future
    // const currentChannelId = channelType === 'live' ? CHANNEL_ID_LIVE : CHANNEL_ID_PLUS;

    try {
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
                params: {
                    key: API_KEY,
                    channelId: CHANNEL_ID, // Replace with dynamic ID when available
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
        console.error('Error al obtener los videos de YouTube:', error);
        return getMockVideos(channelType);
    }
}

// Datos de ejemplo para cuando la API no está configurada
function getMockVideos(channelType: 'live' | 'plus'): YouTubeVideo[] {
    if (channelType === 'plus') {
        return [
            {
                id: 'p1',
                title: 'WatiPlus: Análisis en profundidad',
                thumbnail: 'https://via.placeholder.com/480x360/1f2937/3b82f6?text=WatiPlus+1',
                publishedAt: new Date().toISOString(),
                url: '#',
            },
            {
                id: 'p2',
                title: 'WatiPlus: Tutorial avanzado',
                thumbnail: 'https://via.placeholder.com/480x360/1f2937/6366f1?text=WatiPlus+2',
                publishedAt: new Date(Date.now() - 86400000).toISOString(),
                url: '#',
            },
            {
                id: 'p3',
                title: 'WatiPlus: Secretos revelados',
                thumbnail: 'https://via.placeholder.com/480x360/1f2937/8b5cf6?text=WatiPlus+3',
                publishedAt: new Date(Date.now() - 172800000).toISOString(),
                url: '#',
            },
             {
                id: 'p4',
                title: 'WatiPlus: Guía de estrategia',
                thumbnail: 'https://via.placeholder.com/480x360/1f2937/3b82f6?text=WatiPlus+4',
                publishedAt: new Date(Date.now() - 259200000).toISOString(),
                url: '#',
            },
            {
                id: 'p5',
                title: 'WatiPlus: Mejores momentos del mes',
                thumbnail: 'https://via.placeholder.com/480x360/1f2937/6366f1?text=WatiPlus+5',
                publishedAt: new Date(Date.now() - 345600000).toISOString(),
                url: '#',
            },
            {
                id: 'p6',
                title: 'WatiPlus: Preguntas y respuestas',
                thumbnail: 'https://via.placeholder.com/480x360/1f2937/8b5cf6?text=WatiPlus+6',
                publishedAt: new Date(Date.now() - 432000000).toISOString(),
                url: '#',
            },
        ];
    }

    return [
        {
            id: '1',
            title: 'WatiLive: Momento épico #1 - The Binding of Isaac',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/ef4444?text=WatiLive+1',
            publishedAt: new Date().toISOString(),
            url: '#',
        },
        {
            id: '2',
            title: 'WatiLive: Intento de speedrun - ¡Nuevo récord personal!',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/a855f7?text=WatiLive+2',
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            url: '#',
        },
        {
            id: '3',
            title: 'WatiLive: Pelea brutal contra el jefe - No te lo pierdas',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/10b981?text=WatiLive+3',
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            url: '#',
        },
        {
            id: '4',
            title: 'WatiLive: Compilación de mejores momentos',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/ef4444?text=WatiLive+4',
            publishedAt: new Date(Date.now() - 259200000).toISOString(),
            url: '#',
        },
        {
            id: '5',
            title: 'WatiLive: Primeras impresiones del nuevo juego',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/a855f7?text=WatiLive+5',
            publishedAt: new Date(Date.now() - 345600000).toISOString(),
            url: '#',
        },
        {
            id: '6',
            title: 'WatiLive: ¡Reto comunitario completado!',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/10b981?text=WatiLive+6',
            publishedAt: new Date(Date.now() - 432000000).toISOString(),
            url: '#',
        },
    ];
}
