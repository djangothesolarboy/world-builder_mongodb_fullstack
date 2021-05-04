import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import * as userActions from '../../store/user';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(userActions.logout());
  };

  // window.onbeforeunload = function () {
  //   console.log('things happening')
  //   // if (sessionUser._id === null) {
  //   //   console.log('things happening againnnnn')
  //   //   dispatch(userActions.logout());
  //   //   return localStorage.removeItem('token');
  //   // } else {
  //     //   return dispatch(userActions.restoreUser());
  //     // }
  //   return localStorage.removeItem('token');
  // }

  return (
    <div className='profile-button'>
      <button onClick={openMenu}>
        user
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
