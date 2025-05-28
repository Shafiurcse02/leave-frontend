import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
export const LoginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/login", credentials);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            }
            if (error.message === "Network Error") {
                return rejectWithValue("সার্ভারে সংযোগ করা যাচ্ছে না।");
            }
            return rejectWithValue("Login ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
        }

    });

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/profile");
            return response.data; // user info if logged in
        } catch (error) {
            return rejectWithValue('Failed to fetch user');
        }
    }
);
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await axiosInstance.post('/logout');
        } catch (err) {
            return rejectWithValue('logout করতে সমস্যা হয়েছে');
        }
    }
);