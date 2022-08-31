import { useEffect, useState } from 'react';
import { fetchMostPopular, fetchInTheaters } from './../axios';
import LoadingScreen from './LoadingScreen';
import MovieListViewer from './MovieListViewer';
import TopMovie from './TopMovie';

const Main = () => {
	const [mostPopularMovies, setMostPopularMovies] = useState(null);
	const [inTheatersMovies, setInTheatersMovies] = useState(null);

	useEffect(() => {
		Promise.all([fetchMostPopular(), fetchInTheaters()]).then(([mostPopularResults, inTheatersResults]) => {
			setMostPopularMovies(mostPopularResults.data.items);
			setInTheatersMovies(inTheatersResults.data.items);
		});
	}, []);

	return (
		<div>
			{mostPopularMovies ? (
				<div>
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
