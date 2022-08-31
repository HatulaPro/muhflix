import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Search from './components/Search';
import LoadingScreen from './components/LoadingScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function App() {
	return (
		<div className="app">
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Router basename="/muhflix/">
					<Header />
					<Routes>
						<Route exact path="/" element={<Main />} />
						<Route exact path="/search" element={<Search />} />
						<Route exact path="/load_debug" element={<LoadingScreen />} />
					</Routes>
				</Router>
			</ThemeProvider>
		</div>
	);
}

export default App;
