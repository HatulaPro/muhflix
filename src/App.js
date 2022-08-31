import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Search from './components/Search';
import LoadingScreen from './components/LoadingScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { APIContextProvider } from './APIContext';
import Settings from './components/Settings';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function App() {
	return (
		<div className="app">
			<APIContextProvider>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<Router basename="/muhflix/">
						<Header />
						<Routes>
							<Route exact path="/" element={<Main />} />
							<Route exact path="/search" element={<Search />} />
							<Route exact path="/settings" element={<Settings />} />
							<Route exact path="/load_debug" element={<LoadingScreen />} />
						</Routes>
					</Router>
				</ThemeProvider>
			</APIContextProvider>
		</div>
	);
}

export default App;
