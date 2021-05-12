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
    const [submitRedirect, setSubmitRedirect] = useState(false);

    const sessionUser = useSelector((state) => state.session.user);
    const userId = useSelector((state) => state.session.user);
    const char = useSelector((state) => state.characters.character);
    
    const [state, setState] = useState({
        name: char.name,
        bio: char.bio,
        age: char.age,
        gender: char.gender,
        height: char.height,
        bodyType: char.bodyType,
        hairColor: char.hairColor,
        race: char.race,
        personality: char.personality,
        motivation: char.motivation,
        posture: char.posture,
        facialHair: char.facialHair,
        eyes: char.eyes,
        behavior: char.behavior,
        dailyLife: char.dailyLife,
        quirks: char.quirks,
        fatalFlaw: char.fatalFlaw,
        talents: char.talents,
        skills: char.skills,
        occupation: char.occupation,
        hobbies: char.hobbies,
        wounds: char.wounds,
        fearOne: char.fearOne,
        fearTwo: char.fearTwo,
        fearThree: char.fearThree,
        fearFour: char.fearFour,
        fearFive: char.fearFive,
        fearSix: char.fearSix,
        positiveTraits: char.positiveTraits,
        negativeTraits: char.negativeTraits,
        idle: char.idle,
        stressed: char.stressed,
        exhausted: char.exhausted,
        inebriated: char.inebriated,
        anxious: char.anxious,
        distracted: char.distracted,
        attraction: char.attraction,
        aroused: char.aroused,
        anger: char.anger,
        provoke: char.provoke,
        overreact: char.overreact,
        denial: char.denial,
        negCoping: char.negCoping,
        posCoping: char.posCoping,
        outerMot: char.outerMot,
        innerMotGen: char.innerMotGen,
        innerMotSpec: ''
    })
    
    const [edit, setEdit] = useState(false);
    
    useEffect(() => {
        dispatch(charActions.getUserChar(characterId))
        dispatch(charActions.fetchCharacters())
    }, [dispatch, characterId]);
    
    if (submitRedirect) return <Redirect to={`/characters/${char._id}`}/>;
    if (redirect) return <Redirect to='/characters'/>;

    const handleCharDelete = (e) => {
        e.preventDefault();

        if (char.userId === sessionUser.id || sessionUser.username === '_admin_') {
            dispatch(charActions.deleteCharacter(characterId));
            dispatch(charActions.fetchCharacters());
            setRedirect(true);
        } else {
            alert("You cannot delete things that aren't yours!");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    }

    console.log('state', state.name)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(charActions.updateCharacters(characterId, {
            name: state.name,
            bio: state.bio,
            age: state.age,
            gender: state.gender,
            height: state.height,
            bodyType: state.bodyType,
            hairColor: state.hairColor,
            race: state.race,
            personality: state.personality,
            motivation: state.motivation,
            posture: state.posture,
            facialHair: state.facialHair,
            eyes: state.eyes,
            behavior: state.behavior,
            dailyLife: state.dailyLife,
            quirks: state.quirks,
            fatalFlaw: state.fatalFlaw,
            talents: state.talents,
            skills: state.skills,
            occupation: state.occupation,
            hobbies: state.hobbies,
            wounds: state.wounds,
            fearOne: state.fearOne,
            fearTwo: state.fearTwo,
            fearThree: state.fearThree,
            fearFour: state.fearFour,
            fearFive: state.fearFive,
            fearSix: state.fearSix,
            positiveTraits: state.positiveTraits,
            negativeTraits: state.negativeTraits,
            idle: state.idle,
            stressed: state.stressed,
            exhausted: state.exhausted,
            inebriated: state.inebriated,
            anxious: state.anxious,
            distracted: state.distracted,
            attraction: state.attraction,
            aroused: state.aroused,
            anger: state.anger,
            provoke: state.provoke,
            overreact: state.overreact,
            denial: state.denial,
            negCoping: state.negCoping,
            posCoping: state.posCoping,
            outerMot: state.outerMot,
            innerMotGen: state.innerMotGen,
            innerMotSpec: state.innerMotSpec
        }));
        dispatch(charActions.getUserChar(characterId));
        dispatch(charActions.fetchCharacters());
        setRedirect(true);
    }

    if (edit) {
        return (
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="_csrf" value="{{csrfToken}}" />
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Name:
                    <input name='name' placeholder={state.name} value={state.name} onChange={handleChange} className='char-name-input' required />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Age:
                    <input type='number' name='age' placeholder={state.age} value={state.age} onChange={handleChange} className='char-age-input' required />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Bio:
                    <textarea name='bio' placeholder={state.bio} value={state.bio} onChange={handleChange} className='char-bio-input' required />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Gender:
                    <input name='gender' placeholder={state.gender} value={state.gender} onChange={handleChange} className='char-gender-input' required />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Height:
                    <input name='height' placeholder={state.height} value={state.height} onChange={handleChange} className='char-height-input' required />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Body Type:
                    <input name='bodyType' placeholder={state.bodyType} value={state.bodyType} onChange={handleChange} className='char-bodyType-input' required />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Hair Color:
                    <input name='hairColor' placeholder={state.hairColor} value={state.hairColor} onChange={handleChange} className='char-hairColor-input' required />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Race:
                    <input name='race' placeholder={state.race} value={state.race} onChange={handleChange} className='char-race-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Personality:
                    <input name='personality' placeholder={state.personality} value={state.personality} onChange={handleChange} className='char-personality-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Motivation:
                    <input name='motivation' placeholder={state.motivation} value={state.motivation} onChange={handleChange} className='char-motivation-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Posture:
                    <input name='posture' placeholder={state.posture} value={state.posture} onChange={handleChange} className='char-posture-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Facial Hair:
                    <input name='facialHair' placeholder={state.facialHair} value={state.facialHair} onChange={handleChange} className='char-facial_hair-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Eyes:
                    <input name='eyes' placeholder={state.eyes} value={state.eyes} onChange={handleChange} className='char-eyes-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Behavior:
                    <input name='behavior' placeholder={state.behavior} value={state.behavior} onChange={handleChange} className='char-behavior-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Daily Life:
                    <input name='dailyLife' placeholder={state.dailyLife} value={state.dailyLife} onChange={handleChange} className='char-daily_life-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Quirks:
                    <input name='quirks' placeholder={state.quirks} value={state.quirks} onChange={handleChange} className='char-quirks-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Fatal Flaw:
                    <input name='fatalFlaw' placeholder={state.fatalFlaw} value={state.fatalFlaw} onChange={handleChange} className='char-fatal_flaw-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Talents:
                    <input name='talents' placeholder={state.talents} value={state.talents} onChange={handleChange} className='char-talents-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Skills:
                    <input name='skills' placeholder={state.skills} value={state.skills} onChange={handleChange} className='char-skills-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Occupation:
                    <input name='occupation' placeholder={state.occupation} value={state.occupation} onChange={handleChange} className='char-occupation-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Hobbies:
                    <input name='hobbies' placeholder={state.hobbies} value={state.hobbies} onChange={handleChange} className='char-hobbies-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Wounds:
                    <input name='wounds' placeholder={state.wounds} value={state.wounds} onChange={handleChange} className='char-wounds-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        What situations will the character now avoid?:
                    <input name='fearOne' placeholder={state.fearOne} value={state.fearOne} onChange={handleChange} className='char-' fear_one-input />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        In what situations or settings will the character now feel threatened, unsafe, or vulnerable?:
                    <input name='fearTwo' placeholder={state.fearTwo} value={state.fearTwo} onChange={handleChange} className='char-fear_two-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        How does the character hide this fear from others?:
                    <input name='fearThree' placeholder={state.fearThree} value={state.fearThree} onChange={handleChange} className='char-fear_three-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        How does the fear impact the character’s relationships with others (negatively and/or positively)?:
                    <input name='fearFour' placeholder={state.fearFour} value={state.fearFour} onChange={handleChange} className='char-fear_four-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        How does the fear affect the character at work?:
                    <input name='fearFive' placeholder={state.fearFive} value={state.fearFive} onChange={handleChange} className='char-fear_five-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        How has the character’s fear diminished their self-esteem?:
                    <input name='fearSix' placeholder={state.fearSix} value={state.fearSix} onChange={handleChange} className='char-fear_six-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Positive Traits:
                    <input name='positiveTraits' placeholder={state.positiveTraits} value={state.positiveTraits} onChange={handleChange} className='char-positive_traits-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Negative Traits:
                    <input name='negativeTraits' placeholder={state.negativeTraits} value={state.negativeTraits} onChange={handleChange} className='char-negative_traits-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When idle:
                    <input name='idle' placeholder={state.idle} value={state.idle} onChange={handleChange} className='char-idle-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When stressed:
                    <input name='stressed' placeholder={state.stressed} value={state.stressed} onChange={handleChange} className='char-stressed-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When exhausted:
                    <input name='exhausted' placeholder={state.exhausted} value={state.exhausted} onChange={handleChange} className='char-exhausted-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When inebriated:
                    <input name='inebriated' placeholder={state.inebriated} value={state.inebriated} onChange={handleChange} className='char-inebriated-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When anxious:
                    <input name='anxious' placeholder={state.anxious} value={state.anxious} onChange={handleChange} className='char-anxious-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When distracted:
                    <input name='distracted' placeholder={state.distracted} value={state.distracted} onChange={handleChange} className='char-distracted-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When attracted:
                    <input name='attraction' placeholder={state.attraction} value={state.attraction} onChange={handleChange} className='char-attraction-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When aroused:
                    <input name='aroused' placeholder={state.aroused} value={state.aroused} onChange={handleChange} className='char-aroused-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Quick to anger?:
                    <input name='anger' placeholder={state.anger} value={state.anger} onChange={handleChange} className='char-anger-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        What it takes to provoke:
                    <input name='provoke' placeholder={state.provoke} value={state.provoke} onChange={handleChange} className='char-provoke-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Will overreact when:
                    <input name='overreact' placeholder={state.overreact} value={state.overreact} onChange={handleChange} className='char-overreact-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        In denial about:
                    <input name='denial' placeholder={state.denial} value={state.denial} onChange={handleChange} className='char-denial-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Negative Coping Mechanisms:
                    <input name='negCoping' placeholder={state.negCoping} value={state.negCoping} onChange={handleChange} className='char-negCoping-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Positive Coping Mechanisms:
                    <input name='posCoping' placeholder={state.posCoping} value={state.posCoping} onChange={handleChange} className='char-posCoping-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Outer Motivation;
                        1. What's at stake if goal isn't achieved(primary stake)
                        2. Forms this might take
                        3. Talents/Skills that will help reach goal:
                    <input name='outerMot' placeholder={state.outerMot} value={state.outerMot} onChange={handleChange} className='char-outerMot-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        General Inner Motivation (Unmet Need):
                    <input name='innerMotGen' placeholder={state.innerMotGen} value={state.innerMotGen} onChange={handleChange} className='char-innerMotGen-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Specific Inner Motivation (Unmet Need):
                    <input name='innerMotSpec' placeholder={state.innerMotSpec} value={state.innerMotSpec} onChange={handleChange} className='char-innerMotSpec-input' />
                    </label>
                </div>
                <button type='submit' className='char-button'>Submit</button>
            </form>
        )
    }

    const handleCharEdit = (e) => {
        e.preventDefault();
        dispatch(charActions.getUserChar(char._id));
        setEdit(true);
        // if (char.userId === sessionUser.id || sessionUser.username === '_admin_') {
        //     dispatch(charActions.getUserChar(characterId));
        //     setEdit(true);
        //     // dispatch(charActions.updateCharacters(char));
        // } else {
        //     alert("You cannot edit things that aren't yours!");
        // }
    }

    return (
        <div className='char-page-container'>
            <div className='char'>
                <p>
                    <div className='char-property'>
                        Name: {char.name}
                    </div>
                    <div className='char-property'>
                        Bio: {char.bio}
                    </div>
                    <div className='char-property'>
                        Age: {char.age}
                    </div>
                    <div className='char-property'>
                        Gender: {char.gender}
                    </div>
                    <div className='char-property'>
                        Height: {char.height}
                    </div>
                    <div className='char-property'>
                        Body Type: {char.bodyType}
                    </div>
                    <div className='char-property'>
                        Hair Color: {char.hairColor}
                    </div>
                    <div className='char-property'>
                        Race: {char.race}
                    </div>
                    <div className='char-property'>
                        Personality: {char.personality}
                    </div>
                    <div className='char-property'>
                        Motivation: {char.motivation}
                    </div>
                    <div className='char-property'>
                        Posture: {char.posture}
                    </div>
                    <div className='char-property'>
                        Facial Hair: {char.facialHair}
                    </div>
                    <div className='char-property'>
                        Eyes: {char.eyes}
                    </div>
                    <div className='char-property'>
                        Behavior: {char.behavior}
                    </div>
                    <div className='char-property'>
                        Daily Life: {char.dailyLife}
                    </div>
                    <div className='char-property'>
                        Quirks: {char.quirks}
                    </div>
                    <div className='char-property'>
                        Fatal Flaw/s: {char.fatalFlaw}
                    </div>
                    <div className='char-property'>
                        Talent/s: {char.talents}
                    </div>
                    <div className='char-property'>
                        Skill/s: {char.skills}
                    </div>
                    <div className='char-property'>
                        Occupation: {char.occupation}
                    </div>
                    <div className='char-property'>
                        Hobbies: {char.hobbies}
                    </div>
                    <div className='char-property'>
                        Wound/s: {char.wounds}
                    </div>
                    <div className='char-property'>
                        What situations will the character now avoid?: {char.fearOne}
                    </div>
                    <div className='char-property'>
                        In what situations or settings will the character now feel threatened, unsafe, or vulnerable?: {char.fearTwo}
                    </div>
                    <div className='char-property'>
                        How does the character hide this fear from others?: {char.fearThree}
                    </div>
                    <div className='char-property'>
                        How does the fear impact the character’s relationships with others (negatively and/or positively)?: {char.fearFour}
                    </div>
                    <div className='char-property'>
                        How does the fear affect the character at work?: {char.fearFive}
                    </div>
                    <div className='char-property'>
                        How has the character’s fear diminished their self-esteem?: {char.fearSix}
                    </div>
                    <div className='char-property'>
                        Character: {char.positiveTraits}
                    </div>
                    <div className='char-property'>
                        Character: {char.negativeTraits}
                    </div>
                    <div className='char-property'>
                        Character: {char.idle}
                    </div>
                    <div className='char-property'>
                        Character: {char.stressed}
                    </div>
                    <div className='char-property'>
                        Character: {char.exhausted}
                    </div>
                    <div className='char-property'>
                        Character: {char.inebriated}
                    </div>
                    <div className='char-property'>
                        Character: {char.anxious}
                    </div>
                    <div className='char-property'>
                        Character: {char.distracted}
                    </div>
                    <div className='char-property'>
                        Character: {char.attraction}
                    </div>
                    <div className='char-property'>
                        Character: {char.aroused}
                    </div>
                    <div className='char-property'>
                        Character: {char.anger}
                    </div>
                    <div className='char-property'>
                        Character: {char.provoke}
                    </div>
                    <div className='char-property'>
                        Character: {char.overreact}
                    </div>
                    <div className='char-property'>
                        Character: {char.denial}
                    </div>
                    <div className='char-property'>
                        Character: {char.negCoping}
                    </div>
                    <div className='char-property'>
                        Character: {char.posCoping}
                    </div>
                    <div className='char-property'>
                        Character: {char.outerMot}
                    </div>
                    <div className='char-property'>
                        Character: {char.innerMotGen}
                    </div>
                    <div className='char-property'>
                        Character: {char.innerMotSpec}
                    </div>
                </p>
                <button className='delete-char-button' onClick={handleCharDelete}>Delete Character</button> <button className='edit-char-button' onClick={handleCharEdit}>Edit Character</button>
            </div>
        </div>
    )
}

export default CharPage;