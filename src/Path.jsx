import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';

function Path({ movies }) {
    return (
        <Routes>
            <Route path="/" element={<MainPage movies={movies} />} />
            <Route path="/details/:id" element={<DetailPage />} />
        </Routes>
    );
}

export default Path;
