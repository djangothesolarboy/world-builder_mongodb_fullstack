import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCharacters = createAction('GET_CHARACTERS');
export const getCharacter = createAction('GET_CHARACTER');
export const removeCharacter = createAction('REMOVE_CHARACTER');

export const fetchCharacters = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/characters', { crossorigin: true }).headers("Access-Control-Allow-Origin", "true");
        console.log('res -> ', res)
        dispatch(getCharacters(res.data));
    } catch (err) {
        console.log(err);
    }
};

export const submitCharacter = character => async dispatch => {
    try {
        const res = await axios.post('http://localhost:5000/api/characters', character);
        dispatch(getCharacter(res.data));
    } catch (err) {
        console.log(err);
    }
};

export const updateCharacters = character => async dispatch => {
    try {
        const res = await axios.patch('http://localhost:5000/api/characters', character);
        dispatch(getCharacter(res.data));
    } catch (err) {
        console.log(err);
    }
};

export const deletecharacter = id => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/characters/${id}`);
        dispatch(removeCharacter(res.data));
    } catch (err) {
        console.log(err);
    }
};