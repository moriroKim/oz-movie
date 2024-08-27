import React from 'react';
import { IMG_BASE_URL } from '../client/client';

function DetailCard({ details }) {
    console.log(details);
    return (
        <div className="detail-card">
            <div className="desc-container">
                <div className="title-vote-genre">
                    <h2>{details.title}</h2>
                    <p>평점: {details.vote_average}</p>
                    <p>상영시간: {details.runtime}분</p>
                    <ul>
                        {details.genres.map((genre) => (
                            <li key={genre.id}>
                                <span>{genre.name}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="summary">
                        <p>{details.overview}</p>
                    </div>
                </div>
                <img src={`${IMG_BASE_URL}/${details.poster_path}`} alt={details.title} />
            </div>
        </div>
    );
}

export default DetailCard;
