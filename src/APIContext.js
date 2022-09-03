import { createContext, useEffect, useState } from 'react';

const API_KEY_FILLER = { value: '', enabled: false };
function getApiKeyFromLocalStorage() {
	return JSON.parse(localStorage.getItem('API_KEY')) || API_KEY_FILLER;
}

const APIContext = createContext(API_KEY_FILLER);

function APIContextProvider({ children }) {
	const [apiKey, setApiKey] = useState(getApiKeyFromLocalStorage);

	useEffect(() => {
		localStorage.setItem('API_KEY', JSON.stringify(apiKey));
	}, [apiKey]);

	return <APIContext.Provider value={[apiKey, setApiKey]}>{children}</APIContext.Provider>;
}

export { APIContext, APIContextProvider, API_KEY_FILLER };
