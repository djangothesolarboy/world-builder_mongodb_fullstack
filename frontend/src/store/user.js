
import React from 'react';
import { fetch } from './fetch';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

function setUser(user) {
    return {
        type: SET_USER,
        payload: user,
    };
};

function removeUser() {
    return {
        type: REMOVE_USER,
    };
};

export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    dispatch(setUser(res.data.newUser));
    return res;
}

export const login = (user) => async (dispatch) => {
    const { email, password } = user;
    const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
    });
    dispatch(setUser(res.data.user));
    return res;
}

export const demoLogin = () => async (dispatch) => {
    let email = "Demo-lition";
    let password = "password";
    const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
    });
    dispatch(setUser(response.data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const res = await fetch('http://localhost:5000/api/users/logout', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return res;
}

const initialState = { user: null };

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export const restoreUser = () => async dispatch => {
    const res = await fetch('http://localhost:5000/api/users');
    dispatch(setUser(res.data.user));
    return res;
}

export default userReducer;