import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import * as sessionActions from '../../store/user';
import * as charActions from '../../store/char';

import './CharPage.css';

function CharPage({ data }) {
    const dispatch = useDispatch();
    const { characterId } = useParams();
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
        innerMotSpec: char.innerMotSpec
    })

    const [redirect, setRedirect] = useState(false);
    const [submitRedirect, setSubmitRedirect] = useState(false);

    const sessionUser = useSelector((state) => state.session.user);
    const userId = useSelector((state) => state.session.user);
    
    
    const [edit, setEdit] = useState(false);
    
    useEffect(() => {
        dispatch(charActions.getUserChar(characterId));
        dispatch(charActions.fetchCharacters());
    }, [dispatch, characterId]);
    
    if (submitRedirect) return <Redirect to={`/characters/${char._id}`}/>;
    if (redirect) return <Redirect to='/home'/>;

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

    const handleCancel = () => {
        setEdit(false);
    }

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

    // FIXME input fields are retaining previous state
        // ex. if you click char Allen, then click Pygmy
        // the edit input fields will display Allen's info
        // NOT Pygmy
    if (edit) {
        return (
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="_csrf" value="{{csrfToken}}" />
                <div className='input-label-containers'>
                    <label className='input-label char-name-label'>
                        Name:
                    <input type='text' name='name' value={state.name} onChange={handleChange} className='char-name-input' required />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Age:
                    <input type='number' name='age' value={state.age} onChange={handleChange} className='char-age-input' required />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Bio:
                    <textarea name='bio' value={state.bio} onChange={handleChange} className='char-bio-input' required />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Gender:
                    <input name='gender' value={state.gender} onChange={handleChange} className='char-gender-input' required />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Height:
                    <input name='height' value={state.height} onChange={handleChange} className='char-height-input' required />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Body Type:
                    <input name='bodyType' value={state.bodyType} onChange={handleChange} className='char-bodyType-input' required />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Hair Color:
                    <input name='hairColor' value={state.hairColor} onChange={handleChange} className='char-hairColor-input' required />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Race:
                    <input name='race' value={state.race} onChange={handleChange} className='char-race-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Personality:
                    <input name='personality' value={state.personality} onChange={handleChange} className='char-personality-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Motivation:
                    <input name='motivation' value={state.motivation} onChange={handleChange} className='char-motivation-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Posture:
                    <input name='posture' value={state.posture} onChange={handleChange} className='char-posture-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Facial Hair:
                    <input name='facialHair' value={state.facialHair} onChange={handleChange} className='char-facial_hair-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Eyes:
                    <input name='eyes' value={state.eyes} onChange={handleChange} className='char-eyes-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Behavior/s:
                    <input name='behavior' value={state.behavior} onChange={handleChange} className='char-behavior-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Daily Life:
                    <input name='dailyLife' value={state.dailyLife} onChange={handleChange} className='char-daily_life-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Quirk/s:
                    <input name='quirks' value={state.quirks} onChange={handleChange} className='char-quirks-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Fatal Flaw/s:
                    <input name='fatalFlaw' value={state.fatalFlaw} onChange={handleChange} className='char-fatal_flaw-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Talent/s:
                    <input name='talents' value={state.talents} onChange={handleChange} className='char-talents-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Skill/s:
                    <input name='skills' value={state.skills} onChange={handleChange} className='char-skills-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Occupation:
                    <input name='occupation' value={state.occupation} onChange={handleChange} className='char-occupation-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Hobbies:
                    <input name='hobbies' value={state.hobbies} onChange={handleChange} className='char-hobbies-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Wounds:
                    <input name='wounds' value={state.wounds} onChange={handleChange} className='char-wounds-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        What situations will the character now avoid?:
                    <input name='fearOne' value={state.fearOne} onChange={handleChange} className='char-' fear_one-input />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        In what situations or settings will the character now feel threatened, unsafe, or vulnerable?:
                    <input name='fearTwo' value={state.fearTwo} onChange={handleChange} className='char-fear_two-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        How does the character hide this fear from others?:
                    <input name='fearThree' value={state.fearThree} onChange={handleChange} className='char-fear_three-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        How does the fear impact the character’s relationships with others (negatively and/or positively)?:
                    <input name='fearFour' value={state.fearFour} onChange={handleChange} className='char-fear_four-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        How does the fear affect the character at work?:
                    <input name='fearFive' value={state.fearFive} onChange={handleChange} className='char-fear_five-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        How has the character’s fear diminished their self-esteem?:
                    <input name='fearSix' value={state.fearSix} onChange={handleChange} className='char-fear_six-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Positive Traits:
                    <input name='positiveTraits' value={state.positiveTraits} onChange={handleChange} className='char-positive_traits-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Negative Traits:
                    <input name='negativeTraits' value={state.negativeTraits} onChange={handleChange} className='char-negative_traits-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When idle they will:
                    <input name='idle' value={state.idle} onChange={handleChange} className='char-idle-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When stressed they will:
                    <input name='stressed' value={state.stressed} onChange={handleChange} className='char-stressed-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When exhausted they will:
                    <input name='exhausted' value={state.exhausted} onChange={handleChange} className='char-exhausted-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When inebriated they will:
                    <input name='inebriated' value={state.inebriated} onChange={handleChange} className='char-inebriated-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When anxious they will:
                    <input name='anxious' value={state.anxious} onChange={handleChange} className='char-anxious-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When distracted they will:
                    <input name='distracted' value={state.distracted} onChange={handleChange} className='char-distracted-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When attracted to someone they will:
                    <input name='attraction' value={state.attraction} onChange={handleChange} className='char-attraction-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When aroused they will:
                    <input name='aroused' value={state.aroused} onChange={handleChange} className='char-aroused-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        When they are angry they will:
                    <input name='anger' value={state.anger} onChange={handleChange} className='char-anger-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        What it takes to provoke:
                    <input name='provoke' value={state.provoke} onChange={handleChange} className='char-provoke-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Will overreact when:
                    <input name='overreact' value={state.overreact} onChange={handleChange} className='char-overreact-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        In denial about:
                    <input name='denial' value={state.denial} onChange={handleChange} className='char-denial-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Negative Coping Mechanisms:
                    <input name='negCoping' value={state.negCoping} onChange={handleChange} className='char-negCoping-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Positive Coping Mechanisms:
                    <input name='posCoping' value={state.posCoping} onChange={handleChange} className='char-posCoping-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Outer Motivation;
                        1. What's at stake if goal isn't achieved(primary stake)
                        2. Forms this might take
                        3. Talents/Skills that will help reach goal:
                    <input name='outerMot' value={state.outerMot} onChange={handleChange} className='char-outerMot-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        General Inner Motivation (Unmet Need):
                    <input name='innerMotGen' value={state.innerMotGen} onChange={handleChange} className='char-innerMotGen-input' />
                    </label>
                </div>
                <div className='input-label-containers'>
                    <label className='input-label'>
                        Specific Inner Motivation (Unmet Need):
                    <input name='innerMotSpec' value={state.innerMotSpec} onChange={handleChange} className='char-innerMotSpec-input' />
                    </label>
                </div>
                <div className='char-buttons'>
                    <button type='submit' className='char-button'>Submit</button> <button className='cancel-button' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        )
    }

    // FIXME character information not displayed on initial click of edit
    // displays info after navigating to other page, then back to character page edit
    // character state is displayed in redux store
    const handleCharEdit = (e) => {
        e.preventDefault();
        if (char.userId === sessionUser.id || sessionUser.username === '_admin_') {
            dispatch(charActions.getUserChar(characterId));
            setEdit(true);
        } else {
            alert("You cannot edit things that aren't yours!");
        }
    }

    return (
        <div className='char-page-container'>
            <div className='char'>
                <p>
                    <div className='char-property'>
                        <p className='char-prop'>Name:</p> {char.name}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Bio:</p> {char.bio}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Age:</p> {char.age}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Gender:</p> {char.gender}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Height:</p> {char.height}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Body Type:</p> {char.bodyType}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Hair Color:</p> {char.hairColor}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Race:</p> {char.race}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Personality:</p> {char.personality}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Motivation:</p> {char.motivation}
                    </div>
                    <div className='char-property'>

                        <p className='char-prop'>Posture:</p> {char.posture}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Facial Hair:</p> {char.facialHair}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Eyes:</p> {char.eyes}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Behavior:</p> {char.behavior}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Daily Life:</p> {char.dailyLife}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Quirks:</p> {char.quirks}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Fatal Flaw/s:</p> {char.fatalFlaw}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Talent/s:</p> {char.talents}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Skill/s:</p> {char.skills}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Occupation:</p> {char.occupation}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Hobbies:</p> {char.hobbies}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Wound/s:</p> {char.wounds}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>What situations will the character now avoid?:</p> {char.fearOne}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>In what situations or settings will the character now feel threatened, unsafe, or vulnerable?:</p> {char.fearTwo}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>How does the character hide this fear from others?:</p> {char.fearThree}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>How does the fear impact the character’s relationships with others (negatively and/or positively)?:</p> {char.fearFour}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>How does the fear affect the character at work?:</p> {char.fearFive}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>How has the character’s fear diminished their self-esteem?:</p> {char.fearSix}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Character's Positive Traits:</p> {char.positiveTraits}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>Character's Negative Traits:</p> {char.negativeTraits}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>When idle, {char.name} will:</p> {char.idle}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>When stressed, {char.name} will:</p> {char.stressed}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>When exhausted, {char.name} will:</p> {char.exhausted}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>When inebriated, {char.name} will:</p> {char.inebriated}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>When anxious, {char.name} will:</p> {char.anxious}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>When distracted, {char.name} will:</p> {char.distracted}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>When attracted to someone, {char.name} will:</p> {char.attraction}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>When {char.name} is aroused they will:</p> {char.aroused}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>When angry, {char.name} will:</p> {char.anger}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>When {char.name} is provoked they will:</p> {char.provoke}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>When {char.name} overreacts they will:</p> {char.overreact}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>When in denial, {char.name} will:</p> {char.denial}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>{char.name}'s Negative Coping Mechanism/s:</p> {char.negCoping}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>{char.name}'s Positive Coping Mechanism/s:</p> {char.posCoping}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop mot-p'>Outer Motivation;</p>
                        <p className='char-prop mot-p'>1. What's at stake if goal isn't achieved(primary stake)</p>
                        <p className='char-prop mot-p'>2. Forms this might take</p>
                        <p className='char-prop mot-p'>3. Talents/Skills that will help reach goal:</p> {char.outerMot}
                    </div>
                    <div className='char-property'>
                        <p className='char-prop'>General Inner Motivation (Unmet Need):</p> {char.innerMotGen}
                    </div>
                    <div className='char-property'>

                        <p className='char-prop'>Specific Inner Motivation (Unmet Need):</p> {char.innerMotSpec}
                    </div>
                </p>
                <div className='del-edit-buttons'>
                    <button className='delete-char-button' onClick={handleCharDelete}>Delete Character</button> <button className='edit-char-button' onClick={handleCharEdit}>Edit Character</button> 
                </div> 
            </div>
        </div>
    )
}

export default CharPage;