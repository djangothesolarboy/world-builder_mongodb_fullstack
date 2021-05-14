import { useState } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './TaleFormPage.css';
import { fetchTales, submitTale } from '../../store/tale';

function TaleFormPage() {
    const userId = useSelector((state) => state.session.user._id);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: '',
        userId: userId,
        beginning: '',
        event: '',
        middle: '',
        climax: '',
        end: '',
        briefDesc: '',
        taleSpine: '',
        taleType: '',
        purpose: '',
        listChar: '',
        theTale: ''
    });
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitTale({
            name: state.name,
            userId: userId,
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
        setRedirect(true);
    }

    if (redirect) {
        dispatch(fetchTales());
        return <Redirect to='/home'/>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    }

    const handleCancel = () => {
        setRedirect(true);
    }

    return (
        <div className='tale-form-container'>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="_csrf" value="{{csrfToken}}"/>
                <div className='tale-name-container'>
                    <label className='input-label'>
                        Name:
                        <input className='input' type='text' name='name' value={state.name} onChange={handleChange} className='tale-name-input'/>
                    </label>
                </div>
                <div className='tale-beginning-container'>
                    <label className='input-label'>
                        Beginning:
                        The world of the story is introduced and the main character's routine is established.
                        <input className='input' type='text' name='beginning' value={state.beginning} onChange={handleChange} className='tale-beginning-input'/>
                    </label>
                </div>
                <div className='tale-event-container'>
                    <label className='input-label'>
                        Event:
                        The main character breaks the routine.
                        <input className='input' type='text' name='event' value={state.event} onChange={handleChange} className='tale-event-input'/>
                    </label>
                </div>
                <div className='tale-middle-container'>
                    <label className='input-label'>
                        Middle:
                        There are dire consequences for having broken the routine. It is unclear if the main character will come out alright in the end.
                        <input className='input' type='text' name='middle' value={state.middle} onChange={handleChange} className='tale-middle-input'/>
                    </label>
                </div>
                <div className='tale-climax-container'>
                    <label className='input-label'>
                        Climax:
                        The main character embarks upon success or failure.
                        <input className='input' type='text' name='climax' value={state.climax} onChange={handleChange} className='tale-climax-input'/>
                    </label>
                </div>
                <div className='tale-end-container'>
                    <label className='input-label'>
                        End:
                        The main character succeeds or fails, and then a new routine is established.
                        <input className='input' type='text' name='end' value={state.end} onChange={handleChange} className='tale-end-input'/>
                    </label>
                </div>
                <div className='tale-breif-desc-container'>
                    <label className='input-label'>
                        Brief Description:
                        <input className='input' type='text' name='briefDesc' value={state.briefDesc} onChange={handleChange} className='tale-breif-desc-input'/>
                    </label>
                </div>
                <div className='tale_tale-spine-container'>
                    <label className='input-label'>
                        Tale Spine(Fill in the blanks):
                        Once upon a time there was ____. Every day, ____. One day ____. Because of that, ____. Until finally ____.
                        <input className='input' type='text' name='taleSpine' value={state.taleSpine} onChange={handleChange} className='tale_tale-spine-input'/>
                    </label>
                </div>
                <div className='tale_tale-type-container'>
                    <label className='input-label'>
                        Tale Type(Genre):
                        <input className='input' type='text' name='taleType' value={state.taleType} onChange={handleChange} className='tale_tale-type-input'/>
                    </label>
                </div>
                <div className='tale-purpose-container'>
                    <label className='input-label'>
                        Purpose:
                        Why must THIS tale be told?
                        <input className='input' type='text' name='purpose' value={state.purpose} onChange={handleChange} className='tale-purpose-input'/>
                    </label>
                </div>
                <div className='tale-char-list-container'>
                    <label className='input-label'>
                        List Of Characters:
                        <input className='input' type='text' name='listChar' value={state.listChar} onChange={handleChange} className='tale-char-list-input'/>
                    </label>
                </div>
                <div className='tale-the-tale-container'>
                    <label className='input-label'>
                        The Tale:
                        <input className='input' type='text' name='theTale' value={state.theTale} onChange={handleChange} className='tale-the-tale-input'/>
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

export default TaleFormPage;