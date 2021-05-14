import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import * as userActions from '../../store/user';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    <Redirect to='/home'/>
    return dispatch(userActions.login({ email, password }))
      .then(() => {
        history.push('/home')
      })
      .catch((res) => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });
  };
  
  const demo = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(userActions.demoLogin())
      .then(() => {
        history.push('/home')
      })
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };

  return (
    <div className='login-form-container'>
      <h1 className='login-title'>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className='login-errors'>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <div className='login-email'>
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
        <div className='login-password'>
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
        <div className='login-buttons'>
          <button className='login-button' type="submit">Login</button>
          <button className='demo-button' onClick={demo}>Demo-login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;