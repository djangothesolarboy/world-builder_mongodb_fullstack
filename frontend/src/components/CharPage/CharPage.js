import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import * as sessionActions from '../../store/user';
import * as charActions from '../../store/char';

import './CharPage.css';

function CharPage({ data }) {
    const dispatch = useDispatch();
    const { characterId } = useParams();

    const [redirect, setRedirect] = useState(false);

    const sessionUser = useSelector((state) => state.session.user);
    const userId = useSelector((state) => state.session.user);
    const char = useSelector((state) => state.characters.character);

    useEffect(() => {
        dispatch(charActions.getUserChar(characterId))
    }, [dispatch, characterId]);
    
    if (redirect) return <Redirect to='/characters'/>;

    const handleCharDelete = (e) => {
        e.preventDefault();

        if (char.userId === sessionUser.id || sessionUser.username === '_admin_') {
            console.log('delete pressed')
            dispatch(charActions.deleteCharacter(characterId));
            setRedirect(true);
        } else {
            alert("You cannot delete things that aren't yours!");
        }
    }

    const handleCharEdit = (e) => {
        e.preventDefault();
        if (char.userId === sessionUser.id || sessionUser.username === '_admin_') {
            dispatch(charActions.updateCharacters(char));
        } else {
            alert("You cannot edit things that aren't yours!");
        }
    }

    return (
        <div className='char-page-container'>
            <div className='char'>
                <p>
                    {char.name}
                    {char.bio}
                    {char.age}
                    {char.userId}
                    {char.gender}
                    {char.height}
                    {char.bodyType}
                    {char.hairColor}
                    {char.race}
                    {char.personality}
                    {char.motivation}
                    {char.posture}
                    {char.facialHair}
                    {char.eyes}
                    {char.behavior}
                    {char.dailyLife}
                    {char.quirks}
                    {char.fatalFlaw}
                    {char.talents}
                    {char.skills}
                    {char.occupation}
                    {char.hobbies}
                    {char.wounds}
                    {char.fearOne}
                    {char.fearTwo}
                    {char.fearThree}
                    {char.fearFour}
                    {char.fearFive}
                    {char.fearSix}
                    {char.positiveTraits}
                    {char.negativeTraits}
                    {char.idle}
                    {char.stressed}
                    {char.exhausted}
                    {char.inebriated}
                    {char.anxious}
                    {char.distracted}
                    {char.attraction}
                    {char.aroused}
                    {char.anger}
                    {char.provoke}
                    {char.overreact}
                    {char.denial}
                    {char.negCoping}
                    {char.posCoping}
                    {char.outerMot}
                    {char.innerMotGen}
                    {char.innerMotSpec}
                </p>
                <button className='delete-char-button' onClick={handleCharDelete}>Delete Character</button>
            </div>
        </div>
    )
}

export default CharPage;