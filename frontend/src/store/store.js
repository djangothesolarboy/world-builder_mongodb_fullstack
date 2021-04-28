import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { characterReducer } from '../reducers/character_reducer';

export const configureAppStore = preloadedState => {
    const store = configureStore({
        reducer: characterReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware()
            .concat(process.env.NODE_ENV !== 'production' ? logger : []),
        preloadedState
    })

    return store;
}