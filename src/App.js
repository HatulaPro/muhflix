import './App.css';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';
import { APIContextProvider } from './contexts/APIContext';
import Router from './Router';
import ThemeHandler from './contexts/ThemeHandler';

function App() {
	return (
		<div className="app">
			<APIContextProvider>
				<ThemeHandler>
					<BrowserRouter basename="/muhflix/">
						<Header />
						<Router />
					</BrowserRouter>
				</ThemeHandler>
			</APIContextProvider>
		</div>
	);
}

export default App;
