import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { charReducer } from './char';

export const configureAppStore = preloadedState => {
    const store = configureStore({
        reducer: charReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware()
            .concat(process.env.NODE_ENV !== 'production' ? logger : []),
        preloadedState
    })

    return store;
}