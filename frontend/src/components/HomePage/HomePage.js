import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect, useParams, Route } from 'react-router-dom';

import * as charActions from '../../store/char';
import { fetchTales } from '../../store/tale';
import CharPage from '../CharPage/CharPage';

import './HomePage.css';

function HomePage({ data }) {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const chars = useSelector((state) => state.characters.characters);
    const tales = useSelector((state) => state.tales.tales);

    useEffect(() => {
        dispatch(charActions.fetchCharacters());
        dispatch(fetchTales());
    }, [dispatch]);

    return (
        <div className='home-page-container'>
            <div className='char-section_container'>
                <div className='char-section'>
                    <h1>All Characters</h1>
                    {chars && chars.map((char) => 
                        <div className='char' key={char._id}>
                            <Link className='chars-list char-link' to={`/characters/${char._id}`}>
                                {char.name}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className='tale-section_container'>
                <div className='tale-section'>
                    <h1>All Tales</h1>
                    {tales && tales.map((tale) => 
                        <div className='tale' key={tale._id}>
                            <Link className='tales-list' to={`/tales/${tale._id}`}>
                                {tale.name}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage;