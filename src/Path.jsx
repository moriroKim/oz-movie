import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import MyPage from './pages/MyPage';

function Path({
    popular,
    nowPlaying,
    trend,
    page,
    setPage,
    isLogIn,
    setIsLogIn,
    showSignIn,
    setShowSignIn,
    userData,
    setUserData,
}) {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <MainPage popular={popular} nowPlaying={nowPlaying} trend={trend} page={page} setPage={setPage} />
                }
            />
            <Route path="/details/:id" element={<DetailPage />} />
            <Route path="/movie-search/:params" element={<SearchPage />} />
            <Route
                path="/my-page"
                element={
                    <MyPage
                        isLogIn={isLogIn}
                        setIsLogIn={setIsLogIn}
                        showSignIn={showSignIn}
                        setShowSignIn={setShowSignIn}
                        userData={userData}
                        setUserData={setUserData}
                    />
                }
            />
        </Routes>
    );
}

export default Path;
