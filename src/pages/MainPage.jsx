import React from 'react';
import '../styles/MainPage.scss';
import MovieCard from '../components/MovieCard';

function MainPage({ movies }) {
    return (
        <>
            <ul className="movie-list">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </ul>
        </>
    );
}

export default MainPage;
