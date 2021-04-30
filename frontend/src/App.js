import { useDispatch } from "react-redux";
import { Provider } from 'react-redux';
import React, { useState, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import './App.css';
import HomePage from './components/HomePage/HomePage';
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
// import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
// import Navigation from "./components/Navigation";
// import UserCharPage from "./components/UserCharPage/UserCharPage";
// import CharFormPage from "./components/CharFormPage/CharFormPage";

function App({ store }) {
	return (
		<Provider store={store}>
			<div className="App">
				<header>ಥ_ಥ</header>
				<div>
					{/* <HomePage/> */}
					<Signup/>
					<Login/>
						{/* <a href="/login" > */}
							{/* <LoginFormPage /> */}
						{/* </a> */}
						{/* <a href="/signup"> */}
							{/* <SignupFormPage /> */}
						{/* </a> */}
						{/* <a href="/characters/new">
							<CharFormPage />
						</a>
						<a href={`/characters/21`}>
							<UserCharPage />
						</a> */}
				</div>
			</div>
		</Provider>
	);
}

export default App;