import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import * as taleActions from '../../store/tale';

import './TalePage.css';

function TalePage({ data }) {
    const dispatch = useDispatch();
    const { taleId } = useParams();
    const tale = useSelector((state) => state.tales.tale);

    const [state, setState] = useState({
        name: tale.name,
        bio: tale.bio,
        age: tale.age,
        gender: tale.gender,
        height: tale.height,
        bodyType: tale.bodyType,
        hairColor: tale.hairColor,
        race: tale.race,
        personality: tale.personality,
        motivation: tale.motivation,
        posture: tale.posture,
        facialHair: tale.facialHair,
        eyes: tale.eyes,
        behavior: tale.behavior,
        dailyLife: tale.dailyLife,
        quirks: tale.quirks,
        fatalFlaw: tale.fatalFlaw,
        talents: tale.talents,
        skills: tale.skills,
        occupation: tale.occupation,
        hobbies: tale.hobbies,
        wounds: tale.wounds,
        fearOne: tale.fearOne,
        fearTwo: tale.fearTwo,
        fearThree: tale.fearThree,
        fearFour: tale.fearFour,
        fearFive: tale.fearFive,
        fearSix: tale.fearSix,
        positiveTraits: tale.positiveTraits,
        negativeTraits: tale.negativeTraits,
        idle: tale.idle,
        stressed: tale.stressed,
        exhausted: tale.exhausted,
        inebriated: tale.inebriated,
        anxious: tale.anxious,
        distracted: tale.distracted,
        attraction: tale.attraction,
        aroused: tale.aroused,
        anger: tale.anger,
        provoke: tale.provoke,
        overreact: tale.overreact,
        denial: tale.denial,
        negCoping: tale.negCoping,
        posCoping: tale.posCoping,
        outerMot: tale.outerMot,
        innerMotGen: tale.innerMotGen,
        innerMotSpec: tale.innerMotSpec
    })

    const [redirect, setRedirect] = useState(false);
    // const [submitRedirect, setSubmitRedirect] = useState(false);

    const sessionUser = useSelector((state) => state.session.user);

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        dispatch(taleActions.getUserTale(taleId));
        dispatch(taleActions.fetchTales());
    }, [dispatch, taleId]);

    // if (submitRedirect) return <Redirect to={`/tales/${tale._id}`}/>;
    if (redirect) return <Redirect to='/home' />;

    const handletaleDelete = (e) => {
        e.preventDefault();

        if (tale.userId === sessionUser.id || sessionUser.username === '_admin_') {
            dispatch(taleActions.deleteTale(taleId));
            dispatch(taleActions.fetchTales());
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
        dispatch(taleActions.updateTale(taleId, {
            name: state.name,
            beginning: state.beginning,
            event: state.event,
            middle: state.middle,
            climax: state.climax,
            end: state.end,
            briefDesc: state.briefDesc,
            taleSpine: state.taleSpine,
            taleType: state.taleType,
            purpose: state.purpose,
            listChar: state.listChar,
            theTale: state.theTale
        }));

        dispatch(taleActions.getUserTale(taleId));
        dispatch(taleActions.fetchTales());
        setRedirect(true);
    }

    // FIXME input fields are retaining previous state
    // ex. if you click tale Allen, then click Pygmy
    // the edit input fields will display Allen's info
    // NOT Pygmy
    if (edit) {
        return (
            <div className='tale-form-container'>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="_csrf" value="{{csrfToken}}" />
                    <div className='tale-name-container'>
                        <label className='input-label tale-name-label'>
                            Name:
                        <input className='input' type='text' name='name' value={state.name} onChange={handleChange} className='tale-name-input' />
                        </label>
                    </div>
                    <div className='tale-beginning-container'>
                        <label className='input-label'>
                            Beginning:
                            The world of the story is introduced and the main character's routine is established.
                        <input className='input' type='text' name='beginning' value={state.beginning} onChange={handleChange} className='tale-beginning-input' />
                        </label>
                    </div>
                    <div className='tale-event-container'>
                        <label className='input-label'>
                            Event:
                            The main character breaks the routine.
                        <input className='input' type='text' name='event' value={state.event} onChange={handleChange} className='tale-event-input' />
                        </label>
                    </div>
                    <div className='tale-middle-container'>
                        <label className='input-label'>
                            Middle:
                            There are dire consequences for having broken the routine. It is unclear if the main character will come out alright in the end.
                        <input className='input' type='text' name='middle' value={state.middle} onChange={handleChange} className='tale-middle-input' />
                        </label>
                    </div>
                    <div className='tale-climax-container'>
                        <label className='input-label'>
                            Climax:
                            The main character embarks upon success or failure.
                        <input className='input' type='text' name='climax' value={state.climax} onChange={handleChange} className='tale-climax-input' />
                        </label>
                    </div>
                    <div className='tale-end-container'>
                        <label className='input-label'>
                            End:
                            The main character succeeds or fails, and then a new routine is established.
                        <input className='input' type='text' name='end' value={state.end} onChange={handleChange} className='tale-end-input' />
                        </label>
                    </div>
                    <div className='tale-breif-desc-container'>
                        <label className='input-label'>
                            Brief Description:
                        <input className='input' type='text' name='briefDesc' value={state.briefDesc} onChange={handleChange} className='tale-breif-desc-input' />
                        </label>
                    </div>
                    <div className='tale_tale-spine-container'>
                        <label className='input-label'>
                            Tale Spine(Fill in the blanks):
                            Once upon a time there was ____. Every day, ____. One day ____. Because of that, ____. Until finally ____.
                        <input className='input' type='text' name='taleSpine' value={state.taleSpine} onChange={handleChange} className='tale_tale-spine-input' />
                        </label>
                    </div>
                    <div className='tale_tale-type-container'>
                        <label className='input-label'>
                            Tale Type(Genre):
                        <input className='input' type='text' name='taleType' value={state.taleType} onChange={handleChange} className='tale_tale-type-input' />
                        </label>
                    </div>
                    <div className='tale-purpose-container'>
                        <label className='input-label'>
                            Purpose:
                            Why must THIS tale be told?
                        <input className='input' type='text' name='purpose' value={state.purpose} onChange={handleChange} className='tale-purpose-input' />
                        </label>
                    </div>
                    <div className='tale-char-list-container'>
                        <label className='input-label'>
                            List Of Characters:
                        <input className='input' type='text' name='listChar' value={state.listChar} onChange={handleChange} className='tale-char-list-input' />
                        </label>
                    </div>
                    <div className='tale-the-tale-container'>
                        <label className='input-label'>
                            The Tale:
                        <input className='input' type='text' name='theTale' value={state.theTale} onChange={handleChange} className='tale-the-tale-input' />
                        </label>
                    </div>
                    <div className='tale-buttons'>
                        <button type='submit' className='new-tale-button'>Submit</button>
                        <button className='cancel-button' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }

    // FIXME tale information not displayed on initial click of edit
    // displays info after navigating to other page, then back to tale page edit
    // tale state is displayed in redux store
    const handletaleEdit = (e) => {
        e.preventDefault();
        if (tale.userId === sessionUser.id || sessionUser.username === '_admin_') {
            dispatch(taleActions.getUserTale(taleId));
            setEdit(true);
        } else {
            alert("You cannot edit things that aren't yours!");
        }
    }

    return (
        <div className='tale-page-container'>
            <div className='tale'>
                <p>
                    <div className='tale-property'>
                        <p className='tale-prop'>Name:</p> {tale.name}
                    </div>
                    <div className='tale-property'>
                        <p className='tale-prop'>Beginning:
                        The world of the story is introduced and the main character's routine is established.:</p> {tale.beginning}
                    </div>
                    <div className='tale-property'>
                        <p className='tale-prop'>Event:
                        The main character breaks the routine.</p> {tale.event}
                    </div>
                    <div className='tale-property'>
                        <p className='tale-prop'>Middle:
                        There are dire consequences for having broken the routine. It is unclear if the main character will come out alright in the end.</p> {tale.middle}
                    </div>
                    <div className='tale-property'>
                        <p className='tale-prop'>Climax:
                        The main character embarks upon success or failure.</p> {tale.climax}
                    </div>
                    <div className='tale-property'>
                        <p className='tale-prop'>End:
                        The main character succeeds or fails, and then a new routine is established.</p> {tale.end}
                    </div>
                    <div className='tale-property'>
                        <p className='tale-prop'>Brief Description:</p> {tale.briefDesc}
                    </div>
                    <div className='tale-property'>
                        <p className='tale-prop'>Tale Spine(Fill in the blanks):
                        Once upon a time there was ____. Every day, ____. One day ____. Because of that, ____. Until finally ____.</p> {tale.taleSpine}
                    </div>
                    <div className='tale-property'>
                        <p className='tale-prop'>Tale Type(Genre):</p> {tale.taleType}
                    </div>
                    <div className='tale-property'>
                        <p className='tale-prop'>Purpose:
                        Why must THIS tale be told?</p> {tale.purpose}
                    </div>
                    <div className='tale-property'>

                        <p className='tale-prop'>List Of Characters:</p> {tale.listChar}
                    </div>
                    <div className='tale-property'>
                        <p className='tale-prop'>The Tale:</p> {tale.theTale}
                    </div>
                </p>
                <div className='del-edit-buttons'>
                    <button className='delete-tale-button' onClick={handletaleDelete}>Delete Tale</button> <button className='edit-tale-button' onClick={handletaleEdit}>Edit Tale</button>
                </div>
            </div>
        </div>
    )
}

export default TalePage;