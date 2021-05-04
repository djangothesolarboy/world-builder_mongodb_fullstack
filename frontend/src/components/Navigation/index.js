import React, { useState } from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/index.js';
import SignupFormModal from '../SignupFormModal/index.js';

import * as userActions from '../../store/user';

import './Navigation.css';
import HomePage from "../HomePage/HomePage";
import CharFormPage from "../CharFormPage/CharFormPage";

function Navigation(){
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  
  const is_logged_in = () => {
    return localStorage.getItem("token") !== null;
  }
  const loggedIn = is_logged_in();

  let sessionLinks;
  if (loggedIn) {
    sessionLinks = (
      <>
        <NavLink className='nav-link home' exact to="/">Home</NavLink><br/>
        <ProfileButton user={sessionUser}/>
        <HomePage/>
        <NavLink to='/characters/new'>
          New Character
        </NavLink>
      </>
    )
  } else {
    sessionLinks = (
      <>
        <NavLink className='nav-link home' exact to="/">Home</NavLink><br/>
        <NavLink to='/login'>
          <LoginFormModal />
        </NavLink>
        <NavLink to='/signup'>
          <SignupFormModal/>
        </NavLink>
        <HomePage/>
      </>
    )
  }

  return (
    <>
      {sessionLinks}
    </>
  );
}

export default Navigation;