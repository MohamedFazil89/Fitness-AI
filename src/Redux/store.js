// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import user reducer

const store = configureStore({
    reducer: {
        user: userReducer, // Add user reducer to the store
    },
});

export default store; // Export the configured store
