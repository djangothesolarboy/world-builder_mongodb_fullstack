import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect, useParams, Route } from 'react-router-dom';

import * as charActions from '../../store/char';
import CharPage from '../CharPage/CharPage';

import './HomePage.css';

function HomePage({ data }) {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const chars = useSelector((state) => state.characters.characters);
    useEffect(() => {
        dispatch(charActions.fetchCharacters())
    }, [dispatch]);

    return (
        <div className='home-page-container'>
            <div className='char-section_container'>
                <div className='char-section'>
                    {chars && chars.map((char) => 
                        <div className='char' key={char._id}>
                            <Link className='chars-list char-link' to={`/characters/${char._id}`}>
                                {char.name}
                            </Link>
                        </div>
                    )}
                    <p>{data}</p>
                </div>
            </div>
        </div>
    )
}

export default HomePage;