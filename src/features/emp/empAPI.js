import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const register = createAsyncThunk("emp/registerUser",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/register", data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login ব্যর্থ হয়েছে');
        }
    });

export const fetchProfile = createAsyncThunk(
    'emp/fetchProfile',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const res = await axiosInstance.get('/profile');
            return res.data;
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch(logout());
            }
            return rejectWithValue('প্রোফাইল লোড করতে সমস্যা হয়েছে');
        }
    }
);
