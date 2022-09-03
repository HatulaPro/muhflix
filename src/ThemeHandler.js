import { useState, useEffect, createContext, Suspense, lazy } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const DarkTheme = lazy(() => import('./themes/Dark'));
const LightTheme = lazy(() => import('./themes/Light'));

const darkMuiTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const lightMuiTheme = createTheme();

function getThemePreferenceFromLocalStorage() {
	return JSON.parse(localStorage.getItem('THEME')) || false;
}

export const ThemeContext = createContext(getThemePreferenceFromLocalStorage());

const ThemeHandler = ({ children }) => {
	const [isDark, setDark] = useState(getThemePreferenceFromLocalStorage);

	useEffect(() => {
		localStorage.setItem('THEME', JSON.stringify(isDark));
		// Using magic css API to disable the stylesheet that is no longer used
		const styleSheets = [...document.styleSheets].filter((styleSheet) => styleSheet.cssRules.item(0)?.cssText.includes('_THEME_NAME'));
		const toDisable = isDark ? 'LIGHT' : 'DARK';
		for (const styleSheet of styleSheets) {
			if (styleSheet.cssRules.item(0)?.cssText.includes(toDisable)) {
				styleSheet.disabled = true;
			} else {
				styleSheet.disabled = false;
			}
		}
	}, [isDark]);

	return (
		<ThemeContext.Provider value={[isDark, setDark]}>
			{isDark ? (
				<>
					<ThemeProvider theme={darkMuiTheme}>
						<CssBaseline />
						<Suspense fallback={() => null}>
							<DarkTheme />
						</Suspense>
						{children}
					</ThemeProvider>
				</>
			) : (
				<>
					<ThemeProvider theme={lightMuiTheme}>
						<CssBaseline />
						<Suspense fallback={() => null}>
							<LightTheme />
						</Suspense>
						{children}
					</ThemeProvider>
				</>
			)}
		</ThemeContext.Provider>
	);
};

export default ThemeHandler;
