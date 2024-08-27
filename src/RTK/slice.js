import { createSlice } from '@reduxjs/toolkit';

// 슬라이스
const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        darkMode: false,
    },
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        },
    },
});

export const { toggleDarkMode } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
