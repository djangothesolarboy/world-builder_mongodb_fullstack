import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom';

import * as charActions from '../../actions/character_actions';

import './HomePage.css';

function HomePage({ data }) {
    const dispatch = useDispatch();
    // const { charId } = useParams();

    // const sessionUser = useSelector((state) => state.session.user);
    // const userId = useSelector((state) => state.session.user);
    useEffect(() => {
        dispatch(charActions.fetchCharacters())
    }, [dispatch]);

    const chars = useSelector((state) => state.characters);

    console.log('chars -->', chars)


    return (
        <div className='home-page-container'>
            <div className='char-section_container'>
                <div className='char-section'>
                    {<ul>
                        {/* {chars && chars.map((char) => 
                            {/* <Link to={`/characters/${char.id}`}>
                                char
                                {char.name}
                            </Link> */}
                        )} */}
                    </ul>}
                </div>
            </div>
        </div>
    )
}

export default HomePage;