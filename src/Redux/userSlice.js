// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload; // Set username
        },
    },
});

export const { setUsername } = userSlice.actions; // Export action
export default userSlice.reducer; // Export reducer
