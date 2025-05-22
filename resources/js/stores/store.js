import { configureStore } from "@reduxjs/toolkit";
import flashMessageReducer from './slices/flashMessageSlice';

const store = configureStore({
    reducer: {
        flashMessage: flashMessageReducer,
    }
});

export default store;