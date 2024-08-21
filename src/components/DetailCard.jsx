import React from 'react';
import { IMG_BASE_URL } from '../client/client';

function DetailCard({ details }) {
    return (
        <div className="detail-card">
            <div className="img-container">
                <img src={`${IMG_BASE_URL}/${details.poster_path}`} alt={details.title} />
            </div>
            <div className="desc-container">
                <div className="title-vote-genre">
                    <h2>{details.title}</h2>
                    <p>평점: {details.vote_average}</p>
                    <ul>
                        {details.genres.map((genre) => (
                            <li key={genre.id}>
                                <span>{genre.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="summary">
                    <h3>줄거리:</h3>
                    <p>{details.overview}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailCard;
