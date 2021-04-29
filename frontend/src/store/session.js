import { fetch } from './csrf.js';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER
});

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await fetch('http://localhost:5000/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    dispatch(setUser(response.data.user));
    console.log('user ->', user);
    return response;
};

export const demoLogin = () => async (dispatch) => {
    let credential = "Demo-lition";
    let password = "password";
    const response = await fetch('http://localhost:5000/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    dispatch(setUser(response.data.user));
    return response;
};

export const restoreUser = () => async (dispatch) => {
    const res = await fetch('http://localhost:5000/api/session');
    dispatch(setUser(res.data.user));
    console.log('user ->', res.data.user);
    return res;
};

export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password
        })
    });
    dispatch(setUser(res.data.user));
    return res;
}

export const logout = () => async (dispatch) => {
    const response = await fetch('http://localhost:5000/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
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

export default sessionReducer;