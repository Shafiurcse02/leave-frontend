import { createSlice } from '@reduxjs/toolkit';
import { fetchProfile, register } from '../auth/authAPI';

const initialState = {
    users: null,
    loading: false,
    isAuthenticated: false,
    error: null,
};

const empSlice = createSlice({
    name: 'emp',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Registration failed";
            })
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                if (action.payload === "Unauthorized") {
                    state.users = null;
                }
            })

    },
});
export default empSlice.reducer;
