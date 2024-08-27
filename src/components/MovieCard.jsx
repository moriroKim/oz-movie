import React, { useState } from 'react';
import { IMG_BASE_URL } from '../client/client';
import { useNavigate } from 'react-router-dom';

function MovieCard({ item }) {
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate(`/details/${item.id}`);
    };

    return (
        <li
            className="movie-card"
            onClick={handleRedirect}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="img-container">
                <img src={`${IMG_BASE_URL}/${item.poster_path}`} alt={item.title} />
            </div>

            <div className={`movie-desc ${hovered ? 'show' : 'hide'}`}>
                <h2>{item.title}</h2>
                <p>평점: {item.vote_average}</p>
            </div>
        </li>
    );
}

export default MovieCard;
