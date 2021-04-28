import React from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CharFormPage from "../CharFormPage/CharFormPage";

import './Navigation.css';
import { getUserChar } from '../../store/char';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onClick = () => {
    const userId = sessionUser.id;
    dispatch(getUserChar(userId))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to='/characters/new'>New Character</NavLink>
        <NavLink to={`/characters/21`} onClick={onClick}>
        Char 21
        </NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal/>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink><br/>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;