import axios from 'axios';
import { YouTubeVideo } from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

export async function getRecentVideos(maxResults: number = 6): Promise<YouTubeVideo[]> {
    if (!API_KEY || !CHANNEL_ID) {
        console.warn('Credenciales de la API de YouTube no configuradas');
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
        console.error('Error al obtener los videos de YouTube:', error);
        return getMockVideos();
    }
}

// Datos de ejemplo para cuando la API no está configurada
function getMockVideos(): YouTubeVideo[] {
    return [
        {
            id: '1',
            title: 'Momento épico #1 - The Binding of Isaac',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/ef4444?text=Video+1',
            publishedAt: new Date().toISOString(),
            url: '#',
        },
        {
            id: '2',
            title: 'Intento de speedrun - ¡Nuevo récord personal!',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/a855f7?text=Video+2',
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            url: '#',
        },
        {
            id: '3',
            title: 'Pelea brutal contra el jefe - No te lo pierdas',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/10b981?text=Video+3',
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            url: '#',
        },
        {
            id: '4',
            title: 'Compilación de mejores momentos',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/ef4444?text=Video+4',
            publishedAt: new Date(Date.now() - 259200000).toISOString(),
            url: '#',
        },
        {
            id: '5',
            title: 'Primeras impresiones del nuevo juego',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/a855f7?text=Video+5',
            publishedAt: new Date(Date.now() - 345600000).toISOString(),
            url: '#',
        },
        {
            id: '6',
            title: '¡Reto comunitario completado!',
            thumbnail: 'https://via.placeholder.com/480x360/1f2937/10b981?text=Video+6',
            publishedAt: new Date(Date.now() - 432000000).toISOString(),
            url: '#',
        },
    ];
}
