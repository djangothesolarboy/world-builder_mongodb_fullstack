import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import * as sessionActions from '../../store/user';
import * as charActions from '../../store/char';

import './CharPage.css';

function CharPage({ data }) {
    const dispatch = useDispatch();
    const { character_id } = useParams();

    const sessionUser = useSelector((state) => state.session.user);
    const userId = useSelector((state) => state.session.user);

    const char = useSelector((state) => state.characters.character);

    console.log('char id -->', character_id)

    useEffect(() => {
        dispatch(charActions.getUserChar(character_id))
    }, [dispatch, character_id]);

    const handleCharDelete = (e) => {
        e.preventDefault();

        if (char.userId === sessionUser.id || sessionUser.username === 'admin') {
            dispatch(charActions.deleteCharacter(userId, character_id));
        } else {
            alert("You cannot delete things that aren't yours!");
        }
    }

    return (
        <div className='char-page-container'>
            <div className='char'>
                <p>
                    {char.name}<br/>
                    {char.age}<br/>
                    {char.bio}<br/>
                    {char.height}<br/>
                </p>
            </div>
        </div>
    )
}

export default CharPage;