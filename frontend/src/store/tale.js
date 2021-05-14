import axios from 'axios';
import { fetch } from './fetch';

const GET_TALES = 'tales/all';
const USER_TALE = 'tale/one';
const DEL_TALE = 'tale/del';
const EDIT_TALE = 'tale/edit';
const NEW_TALE = 'tale/new';

function allTales(tales) {
    return {
        type: GET_TALES,
        payload: tales
    }
}

function userTale(tale) {
    return {
        type: USER_TALE,
        payload: tale
    }
}

function delTale(tale) {
    return {
        type: DEL_TALE,
        payload: tale
    }
}

function editTale(tale) {
    return {
        type: EDIT_TALE,
        payload: tale
    }
}

function newTale(tale) {
    return {
        type: NEW_TALE,
        payload: tale
    }
}


export const fetchTales = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/tales');
        dispatch(allTales(res.data));
    } catch (err) {
        console.log(err);
    }
};

export const submitTale = tale => async dispatch => {
    try {
        const {
            name, userId, beginning, event, middle, climax, end, briefDesc, taleSpine, taleType, purpose, charList, theTale } = tale;
        const res = await axios({
            method: 'post',
            url: 'http://localhost:5000/api/tales/new',
            data: {
                name, userId, beginning, event, middle, climax, end, briefDesc, taleSpine, taleType, purpose, charList, theTale
            }
        });
        return dispatch(newTale(res.data));
    } catch (err) {
        console.log(err);
    }
};

export const updateTale = (taleId, tale) => async dispatch => {
    try {
        const {
            name, userId, beginning, event, middle, climax, end, briefDesc, taleSpine, taleType, purpose, charList, theTale
        } = tale;
        const res = await axios({
            method: 'patch',
            url: `http://localhost:5000/api/tales/edit/`,
            params: {
                _id: taleId
            },
            data: {
                name, userId, beginning, event, middle, climax, end, briefDesc, taleSpine, taleType, purpose, charList, theTale
            }
        });
        dispatch(editTale());
    } catch (err) {
        console.log(err);
    }
};

export const getUserTale = (taleId) => async dispatch => {
    try {
        const res = await axios({
            method: 'get',
            url: `http://localhost:5000/api/tales/${taleId}`,
            params: {
                _id: taleId
            }
        });
        dispatch(userTale(res.data));
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const deleteTale = (taleId) => async dispatch => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://localhost:5000/api/tales/delete`,
            params: {
                _id: taleId
            }
        });
        dispatch(delTale());
        return res;
    } catch (err) {
        console.log(err);
    }
};


// reducer
const taleReducer = (state = { tales: [], tale: {} }, action) => {
    let newState;
    switch (action.type) {
        case GET_TALES:
            return { ...state, tales: action.payload };
        case USER_TALE:
            return { ...state, tale: action.payload };
        case NEW_TALE:
            return { ...state, tale: action.payload };
        case EDIT_TALE:
            return action.payload;
        case DEL_TALE:
            return state;
        default:
            return state;
    }
}

export default taleReducer;