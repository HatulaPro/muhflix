import { useContext, useEffect, useState } from 'react';
import { APIContext } from '../APIContext';
import { fetchMostPopular, fetchInTheaters } from '../axios';
import LoadingScreen from './LoadingScreen';
import MovieListViewer from '../components/MovieListViewer';
import NoAPIKeyWarning from '../components/NoAPIKeyWarning';
import TopMovie from '../components/TopMovie';

const Main = () => {
	const [mostPopularMovies, setMostPopularMovies] = useState(null);
	const [inTheatersMovies, setInTheatersMovies] = useState(null);
	const [apiKey] = useContext(APIContext);

	useEffect(() => {
		Promise.all([fetchMostPopular(apiKey), fetchInTheaters(apiKey)]).then(([mostPopularResults, inTheatersResults]) => {
			setMostPopularMovies(mostPopularResults.data.items);
			setInTheatersMovies(inTheatersResults.data.items);
		});
		document.title = 'Muhflix | Home';
	}, [apiKey]);

	return (
		<div>
			{mostPopularMovies ? (
				<div>
					<NoAPIKeyWarning />
					<TopMovie movie={mostPopularMovies[0]} />
					<MovieListViewer title="Most Popular" list={mostPopularMovies.slice(1)} />
					<MovieListViewer title="In Theaters" list={inTheatersMovies} />
				</div>
			) : (
				<LoadingScreen />
			)}
		</div>
	);
};

export default Main;
