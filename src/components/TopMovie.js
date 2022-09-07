import { useContext, useEffect, useState } from 'react';
import { getMovieDetails } from '../axios';
import IMDBRating from './IMDBRating';
import './TopMovie.css';
import TrailerView from './TrailerView';
import { useMediaQuery } from 'react-responsive';
import Carousel from './Carousel';
import MovieDetails from './MovieDetails';
import { APIContext } from '../contexts/APIContext';

const TopMovie = ({ movie }) => {
	const [movieDetails, setMovieDetails] = useState(null);
	const [showTrailer, setShowTrailer] = useState(false);
	const [showInfo, setShowInfo] = useState(false);
	const isSmallScreen = useMediaQuery({ maxWidth: 992 });
	const [apiKey, setApiKey] = useContext(APIContext);

	useEffect(() => {
		async function getData() {
			const res = await getMovieDetails(apiKey, movie.id);
			if (res.data.errorMessage) {
				setApiKey({ ...apiKey, enabled: false });
			} else {
				setMovieDetails(res.data);
			}
		}
		if (movie) {
			getData();
		}
	}, [movie, apiKey, setApiKey]);

	function handleTrailerOpen() {
		setShowTrailer(!showTrailer);
	}

	function handleInfoOpen() {
		setShowInfo(!showInfo);
	}

	const backgroundImage = { backgroundImage: `url(${movieDetails?.trailer.thumbnailUrl})` };

	return (
		movieDetails &&
		movie && (
			<div className="topMovie">
				{<TrailerView trailer={movieDetails?.trailer} show={showTrailer} update={handleTrailerOpen} />}
				<MovieDetails show={showInfo} update={handleInfoOpen} movieDetails={movieDetails} />
				<div className="topMovie_main" style={isSmallScreen ? {} : backgroundImage}>
					<div className="topMovie_info">
						<h1 className="topMovie_title" style={isSmallScreen ? backgroundImage : {}}>
							<span className="topMovie_numberOne">#1</span> {movie.title} <span>({movie.year})</span>
						</h1>
						<IMDBRating rating={movie.imDbRating} />
						<span className="topMovie_madeBy">
							<b>By:</b> {movie.crew}
						</span>
						<div className="topMovie_buttons">
							<button className="btn action-btn info-btn" onClick={handleInfoOpen}>
								More Info
							</button>
							<button className="btn action-btn play-btn" onClick={handleTrailerOpen}>
								Watch Trailer
							</button>
						</div>
					</div>
				</div>
				<div className="topMovie_carousel">
					<Carousel movieDetails={movieDetails} bottomText={movieDetails?.stars} bottomTextTitle="Starring: " />
				</div>
			</div>
		)
	);
};

export default TopMovie;
