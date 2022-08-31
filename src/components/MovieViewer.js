import { useContext, useState } from 'react';
import { APIContext } from '../APIContext';
import { getMovieDetails } from '../axios';
import MovieDetails from './MovieDetails';
import ImageLoader from './ImageLoader';
import './MovieViewer.css';

const MovieViewer = ({ movie, index, currentShowingIndex, setShowingIndex, ...rest }) => {
	const [apiKey] = useContext(APIContext);
	const [movieDetails, setMovieDetails] = useState(null);
	function update() {
		if (index === currentShowingIndex) {
			setShowingIndex(-1);
		} else {
			setShowingIndex(index);
		}
	}

	async function loadDetails() {
		if (movieDetails) return update();
		update();
		const res = await getMovieDetails(apiKey, movie.id);
		setMovieDetails(res.data);
	}

	return (
		<div className="movieViewer" onClick={loadDetails} {...rest}>
			<ImageLoader src={movie.image} alt={movie.fullTitle} loading="lazy" />
			{movie.rank && <span className="movieViewer_rank">#{movie.rank}</span>}
			<MovieDetails show={index === currentShowingIndex} update={update} movieDetails={movieDetails} />
		</div>
	);
};

export default MovieViewer;
