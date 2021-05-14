import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/user";
import './SignupForm.css';

function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [redirect, setRedirect] = useState(false);

    if (redirect) return <Redirect to='/home'/>;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .then(() => setRedirect(true))
                .catch(res => {
                    if (res.data && res.data.errors) setErrors(res.data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className='signup-form-container'>
            <h1 className='signup-title'>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div className='signup-errors'>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <div className='signup-email'>
                    <label className='email-label'>
                        Email<br/>
                    <input className='email-input'
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='signup-username'>
                    <label className='username-label'>
                        Username<br/>
                    <input className='username-input'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='signup-password'>
                    <label className='password-label'>
                        Password<br/>
                    <input className='password-input'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='signup-password'>
                    <label className='password-label'>
                        Confirm Password<br/>
                    <input className='password-input'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='signup-buttons'>
                    <button className='signup-button' type="submit">Signup</button>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;