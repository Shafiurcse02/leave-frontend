// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import leaveReducer from '../features/leave/leaveSlice';
import leaveTypeReducer from '../features/leaveType/leaveTypeSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        leaveType: leaveTypeReducer,
        leave: leaveReducer,
    },
});

export default store;
