import './App.css';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { APIContextProvider } from './APIContext';
import Router from './Router';

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
					<BrowserRouter basename="/muhflix/">
						<Header />
						<Router />
					</BrowserRouter>
				</ThemeProvider>
			</APIContextProvider>
		</div>
	);
}

export default App;
