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

// export const post=()=>{
    //     if(!localStorage.getItem("token"))
    //     {
        
        //     }
        
        //     axios.post("api/post",{
            //         thread:"im gay",
            //         user:"asdasd",
            //         token:localStorage.getItem("token")
            //     },function(){
                
                //     });
                // }
                
export const login = (user) => async (dispatch) => {
    try {
        const { email, password } = user;
        const res = await axios({
            method: 'post',
            url: `http://localhost:5000/api/users/login`,
            data: {
                email,
                password
            }
        });
        // if (!res.data.data.token) return alert('You a dumb dumb.');
        localStorage.setItem('token', res.data.token);
        dispatch(setUser(res.data.user));
    } catch (e) {
        console.log(e);
    }
}

export const logout = () => async (dispatch) => {
    try {
        const res = await fetch(`http://localhost:5000/api/users/logout`, {
            method: "DELETE"
        });
        localStorage.removeItem('token');
        dispatch(removeUser());
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const restoreUser = () => async dispatch => {
    const res = await axios.get('http://localhost:5000/api/users/restore');
    dispatch(setUser(res.data.user));
    return res;
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