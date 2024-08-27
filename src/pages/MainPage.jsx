import '../styles/MainPage.scss';
import MovieCard from '../components/MovieCard';
import { useEffect, useRef, useState } from 'react';
import { PrevBtn } from '../assets/data/icons/PrevBtn';
import { NextBtn } from '../assets/data/icons/NextBtn';
import Observer from '../components/Observer';

function MainPage({ popular, nowPlaying, trend, page, setPage }) {
    const playingRef = useRef(null); // .section의 DOM에 접근 DOM에 직접 참조하고싶을때 & 렌더링되도 초기화되지않게 하고싶을때.
    const popularRef = useRef(null); // .section의 DOM에 접근

    const [playingPosition, setPlayingPosition] = useState(0);
    const [popularPosition, setPopularPosition] = useState(0);

    const maxScroll = 8;

    const handleNextBtn = (ref, position, setPosition) => {
        if (position > -maxScroll) {
            const newPosition = position - 1;
            ref.current.style.transform = `translateX(${newPosition * 50}%)`;
            setPosition(newPosition);
        } else {
            ref.current.style.transform = `translateX(0%)`;
            setPosition(0);
        }
    };

    const handlePrevBtn = (ref, position, setPosition) => {
        if (position < 0) {
            const newPosition = position + 1;
            ref.current.style.transform = `translateX(${newPosition * 50}%)`;
            setPosition(newPosition);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextBtn(playingRef, playingPosition, setPlayingPosition);
        }, 3000);

        return () => clearInterval(interval);
    }, [playingPosition]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextBtn(popularRef, popularPosition, setPopularPosition);
        }, 5000);

        return () => clearInterval(interval);
    }, [popularPosition]);

    return (
        <div className="movies-container">
            <div className="now__playing">
                <h2>현재 상영중</h2>
                <div className="slide-box">
                    <button
                        className="slide-btn left"
                        onClick={() => handlePrevBtn(playingRef, playingPosition, setPlayingPosition)}
                    >
                        <PrevBtn />
                    </button>
                    <ul className="section" ref={playingRef}>
                        {nowPlaying?.map((item) => (
                            <MovieCard key={item.imdb_id} item={item} />
                        ))}
                    </ul>
                    <button
                        className="slide-btn right"
                        onClick={() => handleNextBtn(playingRef, playingPosition, setPlayingPosition)}
                    >
                        <NextBtn />
                    </button>
                </div>
            </div>
            <div className="popular">
                <h2>인기작</h2>
                <div className="slide-box">
                    <button
                        className="slide-btn left"
                        onClick={() => handlePrevBtn(popularRef, popularPosition, setPopularPosition)}
                    >
                        <PrevBtn />
                    </button>
                    <ul className="section" ref={popularRef}>
                        {popular?.map((item) => (
                            <MovieCard key={item.imdb_id} item={item} />
                        ))}
                    </ul>
                    <button
                        className="slide-btn right"
                        onClick={() => handleNextBtn(popularRef, popularPosition, setPopularPosition)}
                    >
                        <NextBtn />
                    </button>
                </div>
            </div>

            <div className="trending">
                <h2>트렌드</h2>
                <div className="movie-lists">
                    {trend?.map((item) => (
                        <MovieCard key={item.imdb_id} item={item} />
                    ))}
                </div>
            </div>
            <Observer page={page} setPage={setPage} />
        </div>
    );
}

export default MainPage;
