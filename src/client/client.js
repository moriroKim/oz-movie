import axios from 'axios';

export const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const client = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    },
});
