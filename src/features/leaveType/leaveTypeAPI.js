import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance'; // your configured axios instance

// Fetch all leave types
export const fetchLeaveTypes = createAsyncThunk(
    'leaveType/fetchLeaveTypes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/leave-types');  // Adjust endpoint accordingly
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'ছুটির ধরন লোড করতে ব্যর্থ'
            );
        }
    }
);
export const fetchLeaveTypeById = createAsyncThunk(
    'leaveType/fetchLeaveTypes',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/leave-type/${id');  // Adjust endpoint accordingly
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'ছুটির ধরন লোড করতে ব্যর্থ'
            );
        }
    }
);

// Create a new leave type
export const createLeaveType = createAsyncThunk(
    'leaveType/createLeaveType',
    async (leaveTypeData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/leave-type', leaveTypeData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'ছুটির ধরন তৈরি করতে ব্যর্থ'
            );
        }
    }
);
export const updateLeaveType = createAsyncThunk(
    'leaveType/updateLeaveType',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/ leave - types / ${id}`, data);
            return response.data;  // return updated leave type object
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'ছুটির ধরন আপডেট করতে ব্যর্থ'
            );
        }
    }
);
// Delete a leave type by ID
export const deleteLeaveType = createAsyncThunk(
    'leaveType/deleteLeaveType',
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/leave-type/${id}`);
            return id;  // return deleted ID for reducer filtering
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'ছুটির ধরন মুছে ফেলতে ব্যর্থ'
            );
        }
    }
);
