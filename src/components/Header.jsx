import React, { useEffect, useState } from 'react';
import '../styles/Header.scss';
import { API_KEY, client } from '../client/client';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';
import { getRegExp } from 'korean-regexp';
import useDebounce from '../hooks/debounce';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleDarkMode } from '../RTK/slice';
import { Link } from 'react-router-dom';
import supabase from '../supabase';

function Header({ setShowSignIn, isLogIn, setIsLogIn, userData }) {
    const [showSearch, setShowSearch] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    // 다크모드 상태
    const darkMode = useSelector((state) => state.theme.darkMode);
    console.log(darkMode);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowSignIn = () => {
        setShowSignIn((prev) => !prev);
    };
    const handleSearchBar = () => {
        setShowSearch((prev) => !prev);
    };
    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw error;
            }
            setIsLogIn(false);
            setShowMenu(false);
            alert('로그아웃되었습니다.');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };
    const handleCloseMyMenu = () => {
        setShowMenu(false);
    };
    const handleToggleMenu = () => {
        setShowMenu((prev) => !prev);
    };
    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode());
    };

    return (
        <>
            <div className="header">
                <h2 onClick={() => navigate('/')}>MOMO</h2>

                <div className="util-container">
                    {isLogIn ? <p>{`${userData?.user_metadata?.name} 님`}</p> : null}
                    {darkMode ? (
                        <button onClick={handleToggleDarkMode}>다크모드</button>
                    ) : (
                        <button onClick={handleToggleDarkMode}>라이트모드</button>
                    )}
                    <button onClick={handleSearchBar}>검색</button>
                    {isLogIn ? (
                        <>
                            <button onClick={handleToggleMenu}>유저썸네일(메뉴)</button>
                        </>
                    ) : (
                        <button onClick={handleShowSignIn}>로그인</button>
                    )}
                </div>
            </div>
            {showSearch ? <SearchBar setShowSearch={setShowSearch} /> : null}
            {isLogIn ? (
                showMenu ? (
                    <MyMenu handleCloseMyMenu={handleCloseMyMenu} handleSignOut={handleSignOut} />
                ) : null
            ) : null}
        </>
    );
}

function MyMenu({ handleCloseMyMenu, handleSignOut }) {
    return (
        <div className="my-menu">
            <ul>
                <button className="close-menu-btn" onClick={handleCloseMyMenu}>
                    X
                </button>
                <li>
                    <Link to={'/my-page'} onClick={handleCloseMyMenu}>
                        마이페이지
                    </Link>
                </li>
                <li>
                    <button onClick={handleSignOut}>로그아웃</button>
                </li>
            </ul>
        </div>
    );
}

function SearchBar({ setShowSearch }) {
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const debouncedSearchValue = useDebounce(searchInput, 500);
    const navigate = useNavigate();

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };
    const handleSearchResultBtn = () => {
        navigate(`/movie-search/${searchInput}`);
        setShowSearch(false);
    };

    useEffect(() => {
        const fetchSearchResult = async () => {
            if (debouncedSearchValue) {
                // debounce된 값이 있을 때만 요청 실행
                try {
                    const searchRegExp = getRegExp(debouncedSearchValue, { ignoreSpace: true });

                    const response = await client.get('search/movie', {
                        params: {
                            api_key: API_KEY,
                            query: debouncedSearchValue,
                            language: 'ko-KR',
                        },
                    });

                    const filteredResults = response.data.results.filter((movie) => searchRegExp.test(movie.title));
                    setSearchResult(filteredResults);
                } catch (error) {
                    console.error('에러', error);
                }
            }
        };

        fetchSearchResult();
    }, [debouncedSearchValue]);

    return (
        <div className="search-bar">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="찾고싶은 영화를 검색하세요."
                    onChange={handleSearchInput}
                    value={searchInput}
                />
                <button onClick={handleSearchResultBtn}>검색</button>
            </div>
            <div className="search-results">
                {searchResult?.map((item) => (
                    <MovieCard key={item.imdb_id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default Header;
