import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import './App.css';
import * as userActions from './store/user';

import SignupForm from './components/SignupFormModal/SignupForm.js';
import LoginForm from './components/LoginFormModal/LoginForm.js';

import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage/HomePage";

import CharFormPage from "./components/CharFormPage/CharFormPage";
import CharPage from './components/CharPage/CharPage';

import TalePage from './components/TalePage/TalePage';
import TaleFormPage from "./components/TaleFormPage/TaleFormPage";

function App({ store }) {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(userActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	if (!isLoaded) return null;

	return (
		<>
			<Navigation isLoaded={isLoaded}/>
			{isLoaded && (
				<>
					<Switch>
						<Route exact path='/home'>
							<HomePage/>
						</Route>
						<Route path='/characters/new'>
							<CharFormPage/>
						</Route>
						<Route exact path='/characters/:characterId'>
							<CharPage/>
						</Route>
						<Route path='/tales/new'>
							<TaleFormPage/>
						</Route>
						<Route exact path='/tales/:taleId'>
							<TalePage/>
						</Route>
						<Route className='route-link login' path='/login'>
							<LoginForm/>
						</Route>
						<Route className='route-link signup' path='/signup'>
							<SignupForm/>
						</Route>
					</Switch>
				</>
			)}
		</>
	);
}

export default App;