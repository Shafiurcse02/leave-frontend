import { createSlice } from '@reduxjs/toolkit';
import { createLeaveType, deleteLeaveType, fetchLeaveTypes } from './leaveTypeAPI';

const initialState = {
    loading: false,
    leaveTypes: [],
    error: null,
};

const leaveTypeSlice = createSlice({
    name: 'leaveType',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeaveTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeaveTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.leaveTypes = action.payload;
            })
            .addCase(fetchLeaveTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                if (action.payload === 'Unauthorized') {
                    state.leaveTypes = [];
                }
            })
            .addCase(createLeaveType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createLeaveType.fulfilled, (state, action) => {
                state.loading = false;
                state.leaveTypes.push(action.payload);
            })
            .addCase(createLeaveType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteLeaveType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLeaveType.fulfilled, (state, action) => {
                state.leaveTypes = state.leaveTypes.filter(lt => lt.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteLeaveType.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const { clearError } = leaveTypeSlice.actions;

export default leaveTypeSlice.reducer;
