import { Suspense, lazy } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const DarkTheme = lazy(() => import('./themes/Dark'));
const LightTheme = lazy(() => import('./themes/Light'));

const darkMuiTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const ThemeHandler = ({ children }) => {
	const isDark = true;
	return isDark ? (
		<ThemeProvider theme={darkMuiTheme}>
			<CssBaseline />
			<Suspense fallback={() => null}>{<DarkTheme />}</Suspense>
			{children}
		</ThemeProvider>
	) : (
		<>
			<Suspense fallback={() => null}>{<LightTheme />}</Suspense>
			{children}
		</>
	);
};

export default ThemeHandler;
