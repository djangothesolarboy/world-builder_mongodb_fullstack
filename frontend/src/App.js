import { useDispatch, useSelector } from "react-redux";
import { Provider } from 'react-redux';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, NavLink, Redirect, Route, Switch } from "react-router-dom";

import './App.css';
import * as userActions from './store/user';
import SignupForm from './components/SignupFormModal/SignupForm.js';
import LoginForm from './components/LoginFormModal/LoginForm.js';
import Navigation from "./components/Navigation";
import CharFormPage from "./components/CharFormPage/CharFormPage";
import CharPage from './components/CharPage/CharPage';
import HomePage from "./components/HomePage/HomePage";

function App({ store }) {
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(userActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	if (!isLoaded) return null;

	return (
		<>
			<header>ಥ_ಥ</header>
			<Navigation isLoaded={isLoaded}/>
			{isLoaded && (
				<>
					<Switch>
						<Route exact path='/characters'>
							<HomePage/>
						</Route>
						<Route path='/characters/new'>
							<CharFormPage/>
						</Route>
						<Route exact path='/characters/:characterId'>
							<CharPage/>
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