import { useContext } from 'react';
import { APIContext } from '../contexts/APIContext';
import { getMovieDetails } from '../axios';
import ImageLoader from './ImageLoader';
import './MovieViewer.css';
import { MovieInfoContext } from '../contexts/MovieInfoContext';

const MovieViewer = ({ movie, index, currentShowingIndex, setShowingIndex, ...rest }) => {
	const [apiKey] = useContext(APIContext);
	const [, setCurrentMovie, moviesCache] = useContext(MovieInfoContext);

	async function loadDetails() {
		if (moviesCache.has(movie.id)) {
			setCurrentMovie(movie.id, moviesCache.get(movie.id));
		} else {
			const res = await getMovieDetails(apiKey, movie.id);
			setCurrentMovie(movie.id, res.data);
		}
	}

	return (
		<div className="movieViewer" onClick={loadDetails} {...rest}>
			<div className="movieViewer_movieTitle">{movie.title}</div>
			<ImageLoader src={movie.image} alt={movie.fullTitle} />
			{movie.rank && <span className="movieViewer_rank">#{movie.rank}</span>}
		</div>
	);
};

export default MovieViewer;
