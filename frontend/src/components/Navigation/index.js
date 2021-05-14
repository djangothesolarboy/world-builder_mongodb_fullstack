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

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-container'>
        <div className='nav'>
          <NavLink className='nav-link home' to="/characters">Home</NavLink>
          <ProfileButton className='nav-link profile' user={sessionUser}/>
          <NavLink className='nav-link new-char' to='/characters/new'>
            New Character
          </NavLink>
        </div>
      </div>
    )
  } else {
    sessionLinks = (
      <div className='nav-container'>
        <NavLink className='nav-link login' to='/login'>
          <LoginFormModal/>
        </NavLink>
        <NavLink className='nav-link signup' to='/signup'>
          <SignupFormModal/>
        </NavLink>
      </div>
    )
  }

  return (
    <>
      {isLoaded && sessionLinks}
    </>
  );
}

export default Navigation;