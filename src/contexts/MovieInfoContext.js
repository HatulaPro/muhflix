import { createContext, useState } from 'react';
import MovieDetails from '../components/MovieDetails';

const moviesCache = new Map();

const MovieInfoContext = createContext(moviesCache);

function MovieInfoContextProvider({ children }) {
	const [currentMovie, setCurrentMovie] = useState(null);

	function setCurrentMovieWrapper(id, data) {
		if (data) {
			moviesCache.set(id, data);
			setCurrentMovie(data);
		} else {
			setCurrentMovie(null);
		}
	}

	return (
		<MovieInfoContext.Provider value={[currentMovie, setCurrentMovieWrapper, moviesCache]}>
			{children}
			<MovieDetails show={Boolean(currentMovie)} update={() => setCurrentMovie(false)} movieDetails={currentMovie} />
		</MovieInfoContext.Provider>
	);
}

export { MovieInfoContext, MovieInfoContextProvider };
