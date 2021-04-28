import './App.css';
import { Provider } from 'react-redux';
import HomePage from './components/HomePage/HomePage';

function App({ store }) {
	return (
		<Provider store={store}>
			<div className="App">
				<header>ಥ_ಥ</header>
				<div>
					<HomePage/>
				</div>
			</div>
		</Provider>
	);
}

export default App;