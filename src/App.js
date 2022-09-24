import './App.css';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';
import { APIContextProvider } from './contexts/APIContext';
import Router from './Router';
import ThemeHandler from './contexts/ThemeHandler';
import { MovieInfoContextProvider } from './contexts/MovieInfoContext';

function App() {
	return (
		<div className="app">
			<MovieInfoContextProvider>
				<APIContextProvider>
					<ThemeHandler>
						<BrowserRouter basename="/muhflix/">
							<Header />
							<Router />
						</BrowserRouter>
					</ThemeHandler>
				</APIContextProvider>
			</MovieInfoContextProvider>
		</div>
	);
}

export default App;
