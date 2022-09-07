import { useContext, useEffect, useState } from 'react';
import { APIContext } from '../contexts/APIContext';
import { fetchMostPopular, fetchInTheaters } from '../axios';
import LoadingScreen from './LoadingScreen';
import MovieListViewer from '../components/MovieListViewer';
import NoAPIKeyWarning from '../components/NoAPIKeyWarning';
import TopMovie from '../components/TopMovie';
import { Divider } from '@mui/material';
import IMDBListViewer from '../components/IMDBListViewer';
import './Main.css';

const Main = () => {
	const [mostPopularMovies, setMostPopularMovies] = useState(null);
	const [inTheatersMovies, setInTheatersMovies] = useState(null);
	const [apiKey, setApiKey] = useContext(APIContext);
	const imdbLists = ['ls004285275', 'ls504069050', 'ls063385017', 'ls058726648', 'ls043300993'];

	useEffect(() => {
		Promise.all([fetchMostPopular(apiKey), fetchInTheaters(apiKey)]).then(([mostPopularResults, inTheatersResults]) => {
			if (mostPopularResults.data.errorMessage || inTheatersResults.data.errorMessage) {
				setApiKey({ ...apiKey, enabled: false });
			}
			setMostPopularMovies(mostPopularResults.data.items);
			setInTheatersMovies(inTheatersResults.data.items);
		});
		document.title = 'Muhflix | Home';
	}, [apiKey, setApiKey]);

	return (
		<div>
			{mostPopularMovies ? (
				<div>
					<NoAPIKeyWarning />
					<TopMovie movie={mostPopularMovies[0]} />
					<Divider sx={{ borderBottomWidth: 5 }} />
					<h1 className="main_heading">IMDB's recommendations</h1>
					<MovieListViewer title="Most Popular" list={mostPopularMovies.slice(1)} />
					<MovieListViewer title="In Theaters" list={inTheatersMovies} />
					<Divider sx={{ borderBottomWidth: 5 }} />
					<h1 className="main_heading">Popular IMDB Lists</h1>
					{apiKey.enabled ? (
						imdbLists.map((list) => <IMDBListViewer listId={list} key={list} />)
					) : (
						<>
							<span style={{ marginLeft: '20px' }}>Use your own API key to customize the following lists:</span>
							<IMDBListViewer listId={imdbLists[0]} />
						</>
					)}
				</div>
			) : (
				<LoadingScreen />
			)}
		</div>
	);
};

export default Main;
