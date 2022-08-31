import { createContext, useState } from 'react';

const API_KEY_FILLER = { value: '', enabled: false };

const APIContext = createContext(API_KEY_FILLER);
const APIContextSetter = createContext();

function APIContextProvider({ children }) {
	const [apiKey, setApiKey] = useState(API_KEY_FILLER);

	return <APIContext.Provider value={[apiKey, setApiKey]}>{children}</APIContext.Provider>;
}

export { APIContext, APIContextSetter, APIContextProvider, API_KEY_FILLER };
