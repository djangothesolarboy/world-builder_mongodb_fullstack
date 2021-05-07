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
      <>
        <NavLink className='nav-link home' to="/">Home</NavLink><br/>
        <ProfileButton user={sessionUser}/>
        <NavLink to='/characters/new'>
          New Character
        </NavLink><br/>
        <NavLink to='/characters'>Characters</NavLink>
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
      </>
    )
  }

  return (
    <>
      {isLoaded && sessionLinks}
    </>
  );
}

export default Navigation;