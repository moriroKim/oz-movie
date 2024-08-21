import { useEffect, useState } from 'react';
import { client } from './client/client';
import Path from './Path';
import movieListData from './assets/data/movieListData.json';

function App() {
    const [movies] = useState(movieListData);
    // useEffect(() => {
    //     try {
    //         const fetchMovies = async () => {
    //             const response = await client.get('movie/popular', {
    //                 params: {
    //                     language: 'ko-KR',
    //                     page: 1,
    //                 },
    //             });
    //             setMovies([...response.data.results]);
    //         };

    //         fetchMovies();
    //     } catch (error) {
    //         console.error('에러', error);
    //     }
    // }, []);

    console.log(movies);
    return <Path movies={movies.results} />;
}

export default App;
