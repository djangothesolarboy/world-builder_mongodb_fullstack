import axios from 'axios';

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
        const res = await axios.get('https://world--builder.herokuapp.com/api/tales', {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
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
            url: 'https://world--builder.herokuapp.com/api/tales/new',
            withCredentials: true,
            crossDomain: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
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
            url: `https://world--builder.herokuapp.com/api/tales/edit/`,
            params: {
                _id: taleId
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true,
            crossDomain: true,
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
            url: `https://world--builder.herokuapp.com/api/tales/${taleId}`,
            crossDomain: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
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
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true,
            crossDomain: true,
            url: `https://world--builder.herokuapp.com/api/tales/delete`,
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