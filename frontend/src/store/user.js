import axios from 'axios';

const SET_USER = 'user/setUser';
const REMOVE_USER = 'user/removeUser';

const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const removeUser = () => ({
    type: REMOVE_USER
});

export const signup = (user) => async (dispatch) => {
    try {
        const { username, email, password } = user;
        const res = await axios({
            method: 'post',
            url: 'http://localhost:5000/api/users/signup',
            data: {
                username,
                email,
                password
            }
        })
        dispatch(setUser(res.data.user));
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const login = (user) => async (dispatch) => {
    try {
        const { email, password } = user;
        const res = await axios.post(`http://localhost:5000/api/users/login`, user);
        dispatch(setUser(res.data));
    } catch (e) {
        console.log(e);
    }
}

export const logout = () => async (dispatch) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/users/logout`);
        dispatch(removeUser());
        return res;
    } catch (e) {
        console.log(e);
    }
}


// reducer
const userReducer = (state = { user: null }, action) => {
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
}

export default userReducer;