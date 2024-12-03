import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import ticketReducer from './features/ticketSlice';
import gameReducer from './features/gameSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        ticket: ticketReducer,
        game: gameReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;