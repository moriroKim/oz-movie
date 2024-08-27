import { useEffect, useState } from 'react';
import { API_KEY, client } from './client/client';
import Path from './Path';
import Header from './components/Header';
import SignIn from './components/SignIn';
import supabase from './supabase';
import { useSelector } from 'react-redux';

function App() {
    const [isLogIn, setIsLogIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [popular, setPopular] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [trend, setTrend] = useState([]);
    const [showSignIn, setShowSignIn] = useState(false);
    const [page, setPage] = useState(0);
    const darkMode = useSelector((state) => state.theme.darkMode);

    // 다크모드 토글
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        const fetchUserLoginData = async () => {
            try {
                const {
                    data: { session },
                    error,
                } = await supabase.auth.getSession();
                if (error) {
                    console.error('유저 로그인 정보를 불러오는데 실패했습니다:', error.message);
                    return;
                }
                if (session) {
                    console.log(session);
                    setUserData(session.user);
                    setIsLogIn(true);
                } else {
                    setIsLogIn(false);
                }
            } catch (error) {
                console.error('에러:', error);
            }
        };

        fetchUserLoginData();
    }, []);

    useEffect(() => {
        try {
            const fetchPopularMovies = async () => {
                const response = await client.get('movie/top_rated', {
                    params: {
                        api_key: API_KEY,
                        language: 'ko-KR',
                        page: 1,
                    },
                });
                setPopular([...response.data.results]);
            };

            fetchPopularMovies();
        } catch (error) {
            console.error('에러', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchNowPlaying = async () => {
                const response = await client.get('movie/now_playing', {
                    params: {
                        api_key: API_KEY,
                        language: 'ko-KR',
                        page: 1,
                    },
                });
                setNowPlaying([...response.data.results]);
            };

            fetchNowPlaying();
        } catch (error) {
            console.error('에러', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchTrendMovies = async () => {
                const response = await client.get('trending/all/day', {
                    params: {
                        api_key: API_KEY,
                        language: 'ko-KR',
                        page: page,
                    },
                });
                setTrend((prev) => [...prev, ...response.data.results]);
            };

            fetchTrendMovies();
        } catch (error) {
            console.error('에러', error);
        }
    }, [page]);

    return (
        <>
            <Header setShowSignIn={setShowSignIn} isLogIn={isLogIn} setIsLogIn={setIsLogIn} userData={userData} />
            {showSignIn ? (
                <SignIn setShowSignIn={setShowSignIn} setIsLogIn={setIsLogIn} setUserData={setUserData} />
            ) : null}
            <Path
                popular={popular}
                nowPlaying={nowPlaying}
                trend={trend}
                page={page}
                setPage={setPage}
                isLogIn={isLogIn}
                setIsLogIn={setIsLogIn}
                showSignIn={showSignIn}
                setShowSignIn={setShowSignIn}
                userData={userData}
                setUserData={setUserData}
            />
        </>
    );
}

export default App;
