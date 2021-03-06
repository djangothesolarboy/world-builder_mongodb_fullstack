import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router";

import * as userActions from '../../store/user';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [redirect, setRedirect] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  if (redirect) return <Redirect to='/'/>;

  const logout = (e) => {
    e.preventDefault();
    dispatch(userActions.logout());
    setRedirect(true);
  };

  return (
    <div className='profile-button'>
      <button className='nav-link profile' onClick={openMenu}>
        {user.username}
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <p>{user.email}</p>
          <p>
            <button className='logout' onClick={logout}>Logout</button>
          </p>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
