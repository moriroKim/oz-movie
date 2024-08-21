import React from 'react';
import { IMG_BASE_URL } from '../client/client';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
    return (
        <Link to={`/detail/${movie.id}`}>
            <li className="movie-card">
                <div className="img-container">
                    <img src={`${IMG_BASE_URL}/${movie.poster_path}`} alt={movie.title} />
                </div>

                <div className="movie-desc">
                    <h2>{movie.title}</h2>
                    <p>평점: {movie.vote_average}</p>
                </div>
            </li>
        </Link>
    );
}

export default MovieCard;
