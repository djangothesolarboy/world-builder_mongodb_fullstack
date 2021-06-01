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
        const res = await axios.get('https://world--builder.herokuapp.com/api/characters', {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
        dispatch(allChars(res.data));
    } catch (err) {
        console.log(err);
    }
};

export const submitCharacter = character => async dispatch => {
    try { 
        const { 
            name, bio, age, userId, gender, height, bodyType, hairColor, race, personality, motivation, posture, facialHair, eyes, behavior, dailyLife, quirks, fatalFlaw, talents, skills, occupation, hobbies, wounds, fearOne, fearTwo, fearThree, fearFour, fearFive, fearSix, positiveTraits, negativeTraits, idle, stressed, exhausted, inebriated, anxious, distracted, attraction, aroused, anger, provoke, overreact, denial, negCoping, posCoping, outerMot, innerMotGen, innerMotSpec } = character;
        const res = await axios({
            method: 'post',
            url: 'https://world--builder.herokuapp.com/api/characters/new',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true,
            crossDomain: true,
            data: {
                name, bio, age, userId, gender, height, bodyType, hairColor, race, personality, motivation, posture, facialHair, eyes, behavior, dailyLife, quirks, fatalFlaw, talents, skills, occupation, hobbies, wounds, fearOne, fearTwo, fearThree, fearFour, fearFive, fearSix, positiveTraits, negativeTraits, idle, stressed, exhausted, inebriated, anxious, distracted, attraction, aroused, anger, provoke, overreact, denial, negCoping, posCoping, outerMot, innerMotGen, innerMotSpec
            }
        });
        return dispatch(newChar(res.data));
    } catch (err) {
        console.log(err);
    }
};

export const updateCharacters = (characterId, character) => async dispatch => {
    try {
        const {
            name, bio, age, userId, gender, height, bodyType, hairColor, race, personality, motivation, posture, facialHair, eyes, behavior, dailyLife, quirks, fatalFlaw, talents, skills, occupation, hobbies, wounds, fearOne, fearTwo, fearThree, fearFour, fearFive, fearSix, positiveTraits, negativeTraits, idle, stressed, exhausted, inebriated, anxious, distracted, attraction, aroused, anger, provoke, overreact, denial, negCoping, posCoping, outerMot, innerMotGen, innerMotSpec 
        } = character;
        const res = await axios({
            method: 'patch',
            url: `https://world--builder.herokuapp.com/api/characters/edit/`,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            params: {
                _id: characterId
            },
            withCredentials: true,
            crossDomain: true,
            data: {
                name, bio, age, userId, gender, height, bodyType, hairColor, race, personality, motivation, posture, facialHair, eyes, behavior, dailyLife, quirks, fatalFlaw, talents, skills, occupation, hobbies, wounds, fearOne, fearTwo, fearThree, fearFour, fearFive, fearSix, positiveTraits, negativeTraits, idle, stressed, exhausted, inebriated, anxious, distracted, attraction, aroused, anger, provoke, overreact, denial, negCoping, posCoping, outerMot, innerMotGen, innerMotSpec
            }
        });
        dispatch(editChar());
    } catch (err) {
        console.log(err);
    }
};

export const getUserChar = (characterId) => async dispatch => {
    try {
        const res = await axios({
            method: 'get',
            url: `https://world--builder.herokuapp.com/api/characters/${characterId}`, 
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true,
            crossDomain: true,
            params: {
                _id: characterId
            }
        });
        console.log('char -->', res.data);
        dispatch(userChar(res.data));
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const deleteCharacter = (characterId) => async dispatch => {
    try {
        const res = await axios({
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true,
            crossDomain: true,
            url: `https://world--builder.herokuapp.com/api/characters/delete`, 
            params: {
                _id: characterId
            }
        });
        dispatch(delChar());
        return res;
    } catch (err) {
        console.log(err);
    }
};


// reducer
const charReducer = (state = { characters: [], character: {} }, action) => {
    switch (action.type) {
        case GET_CHARS:
            return { ...state, characters: action.payload };
        case USER_CHAR:
            return { ...state, character: action.payload };
        case NEW_CHAR:
            return { ...state, character: action.payload };
        case EDIT_CHAR:
            return action.payload;
        case DEL_CHAR:
            return state;
        default:
            return state;
    }
}

export default charReducer;