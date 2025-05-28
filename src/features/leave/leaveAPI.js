import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const applyLeave = createAsyncThunk(
    "leave/applyLeave",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/leave", data);
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'ছুটি আবেদন ব্যর্থ হয়েছে'
            );
        }
    }
);

export const fetchLeave = createAsyncThunk(
    "leave/fetchLeave",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("/leaves");
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || err.message || 'ছুটির তালিকা লোড করতে সমস্যা হয়েছে'
            );
        }
    }
);
