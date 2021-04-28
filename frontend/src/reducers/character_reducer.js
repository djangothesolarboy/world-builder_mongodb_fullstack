import { createReducer } from '@reduxjs/toolkit';

export const characterReducer = createReducer({}, builder => {
    builder
        .addCase('GET_CHARACTERS', (state, action) => {
            state = action.payload
        })
        .addCase('GET_CHARACTER', (state, action) => {
            state[action.payload._id] = action.payload
        })
        .addCase('REMOVE_CHARACTER', (state, action) => {
            return state.delete(action.payload._id)
        })
    // .addDefaultCase(state => {
    //     return state;
    // })
})