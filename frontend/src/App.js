import { useDispatch } from "react-redux";
import { Provider } from 'react-redux';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, NavLink, Route, Switch } from "react-router-dom";

import './App.css';
import * as userActions from './store/user';
import SignupForm from './components/SignupFormModal/SignupForm.js';
import LoginForm from './components/LoginFormModal/LoginForm.js';
import Navigation from "./components/Navigation";

function App({ store }) {
	let isLoaded;
	const is_logged_in = () => {
		(localStorage.getItem("token") !== null) ? isLoaded = true : isLoaded = false;
	}

	return (
		<BrowserRouter>
			<Provider store={store}>
				<div className="App">
				<header>ಥ_ಥ</header>
				<Navigation/>
				<Switch>
					<Route className='route-link login' path='/login'>
						<LoginForm/>
					</Route>
					<Route className='route-link signup' path='/signup'>
						<SignupForm/>
					</Route>
				</Switch>
				</div>
			</Provider>
		</BrowserRouter>
	);
}

export default App;