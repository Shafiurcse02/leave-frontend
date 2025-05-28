import { createSlice } from "@reduxjs/toolkit";
import { applyLeave, fetchLeave } from "./leaveAPI"; // adjust path as needed

const initialState = {
    leaves: [],        // fetched leaves list
    loading: false,    // general loading state
    error: null,       // error message
    successMessage: null,  // success message for applyLeave
};

const leaveSlice = createSlice({
    name: "leave",
    initialState,
    reducers: {
        clearMessages(state) {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        // fetchLeave
        builder
            .addCase(fetchLeave.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(fetchLeave.fulfilled, (state, action) => {
                state.loading = false;
                state.leaves = action.payload;
            })
            .addCase(fetchLeave.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "ছুটির তালিকা লোড করতে সমস্যা হয়েছে";
            });

        // applyLeave
        builder
            .addCase(applyLeave.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(applyLeave.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = "ছুটি আবেদন সফল হয়েছে!";
                state.leaves.push(action.payload);
            })
            .addCase(applyLeave.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "ছুটি আবেদন ব্যর্থ হয়েছে";
            });
    },
});

export const { clearMessages } = leaveSlice.actions;

export default leaveSlice.reducer;
