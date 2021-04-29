import axios from 'axios';

const GET_CHARS = 'chars/all';
const USER_CHAR = 'char/one';
const DEL_CHAR = 'char/del';
const EDIT_CHAR = 'char/edit';
const NEW_CHAR = 'char/new';

function allChars(characters) {
    return {
        type: GET_CHARS,
        payload: characters
    }
}

function userChar(character) {
    return {
        type: USER_CHAR,
        payload: character
    }
}

function delChar(character) {
    return {
        type: DEL_CHAR,
        payload: character
    }
}

function editChar(character) {
    return {
        type: EDIT_CHAR,
        payload: character
    }
}

function newChar(character) {
    return {
        type: NEW_CHAR,
        payload: character
    }
}


export const fetchCharacters = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/characters');
        console.log('res -> ', res.data)
        dispatch(allChars(res.data));
    } catch (err) {
        console.log(err);
    }
};

export const submitCharacter = character => async dispatch => {
    try {
        const res = await axios.post('http://localhost:5000/api/characters', character);
        dispatch(userChar(res.data));
    } catch (err) {
        console.log(err);
    }
};

export const updateCharacters = character => async dispatch => {
    try {
        const res = await axios.patch('http://localhost:5000/api/characters', character);
        dispatch(editChar(res.data));
    } catch (err) {
        console.log(err);
    }
};

export const deletecharacter = id => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/characters/${id}`);
        dispatch(delChar(res.data));
    } catch (err) {
        console.log(err);
    }
};


// reducer
const charReducer = (state = { characters: {}, character: {} }, action) => {
    let newState;
    switch (action.type) {
        case GET_CHARS:
            return { ...state, characters: action.payload };
        case USER_CHAR:
            return { ...state, character: action.payload };
        case NEW_CHAR:
            return { ...state, character: action.payload };
        case DEL_CHAR:
            newState = state.filter(character => character === action.payload);
            return newState;
        default:
            return state;
    }
}

export default charReducer;