import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import * as charActions from '../../store/char';

import './UserCharPage.css';

function UserCharPage({ data }) {
    const dispatch = useDispatch();
    const { charId } = useParams();

    const sessionUser = useSelector((state) => state.session.user);
    const userId = useSelector((state) => state.session.user);

    const char = useSelector((state) => state.character);

    useEffect(() => {
        dispatch(charActions.getUserChar(userId, charId))
    }, [dispatch, userId, charId]);

    const handleCharDelete = (e) => {
        e.preventDefault();

        if (char.userId === sessionUser.id || sessionUser.username === 'admin') {
            dispatch(charActions.deleteCharacter(userId, charId));
        } else {
            alert("You cannot delete things that aren't yours!");
        }
    }

    return (
        <div className='char-page-container'>
            <div className='char'>
                <p>
                    {char.name}
                </p>
            </div>
        </div>
    )
}

export default UserCharPage;