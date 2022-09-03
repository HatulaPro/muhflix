import { useEffect, useRef, useState } from 'react';
import './MovieDetails.css';
import MovieRatings from './MovieRatings';

const MovieDetails = ({ show, update, movieDetails }) => {
	const refToTop = useRef(null);
	const trailerHeadingRef = useRef(null);
	const [actorsStart, setActorsStart] = useState(0);

	useEffect(() => {
		if (show) {
			document.body.style.overflow = 'hidden';
			refToTop.current.scrollTop = 0;
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [show]);

	function moveActorsForward() {
		const practicalLength = movieDetails.fullCast.actors.length - 2;
		setActorsStart(Math.min(actorsStart + 1, practicalLength - 1) % practicalLength);
	}
	function moveActorsBack() {
		setActorsStart(Math.max(actorsStart - 1, 0));
	}

	const releaseDate = new Date(movieDetails?.releaseDate || '01/01/1999');
	const nowDate = new Date();

	let trailerScale = '0';
	if (trailerHeadingRef.current) {
		trailerScale = `${Math.min((0.95 * trailerHeadingRef.current.clientWidth) / 858, 1)}`;
	}

	return (
		<div className={`scrollbar movieDetails ${show && 'movieDetails_show'}`} onClick={update} ref={refToTop}>
			<div className={`movieDetails_movieInfo ${show && 'movieDetails_movieInfoShow'}`} onClick={(e) => e.stopPropagation()}>
				{show && (
					<>
						<button className="btn movieDetails_close" onClick={update}>
							X
						</button>
						<h2>
							About <u>{movieDetails?.title || '______'}</u>
						</h2>
						<div className="movieDetails_section">
							<h3>Cast:</h3>
							<div className="movieDetails_castContent">
								<button className="btn movieDetails_scrollButtons" onClick={moveActorsBack}>
									&lt;
								</button>
								<div className="movieDetails_castScroller">
									{movieDetails &&
										movieDetails.actorList.slice(actorsStart, actorsStart + 12).map((actor, index) => (
											<div className={`movieDetails_actor ${!index && 'movieDetails_actorShrink'}`} key={actor.id}>
												<img src={actor.image} alt={actor.name} />
												<p>{actor.name}</p>
												<p>{actor.asCharacter}</p>
											</div>
										))}
								</div>
								<button className="btn movieDetails_scrollButtons" onClick={moveActorsForward}>
									&gt;
								</button>
							</div>
						</div>

						<div className="movieDetails_info">
							{movieDetails?.awards && (
								<div>
									<h3>Awards</h3>
									<p>{movieDetails.awards}</p>
								</div>
							)}
							<div>
								<h3>Genres</h3>
								<p>{movieDetails?.genres || '________'}</p>
							</div>
							<div>
								<h3>Directors & Writers</h3>
								<p>{(movieDetails ? [...movieDetails.directorList, ...movieDetails.writerList] : []).map((x) => x.name).join(', ')}</p>
							</div>
							<div className="flexLineBreak"></div>
							<div>
								<h3>Release Date</h3>
								<p>{releaseDate.toLocaleDateString() || 'In the future'}</p>
								{releaseDate > nowDate && (
									<p>
										<b style={{ color: 'white' }}>{parseInt((releaseDate - nowDate) / (1000 * 60 * 60 * 24))} days until release!</b>
									</p>
								)}
							</div>
							<div>
								<h3>Runtime</h3>
								<p>{movieDetails?.runtimeStr || '4y'}</p>
							</div>
						</div>
						<div className="movieDetails_section">
							<h3 ref={trailerHeadingRef}>Ratings: </h3>
							<MovieRatings movieDetails={movieDetails} />
						</div>
						<div className="movieDetails_section movieDetails_trailer">
							<h3>{movieDetails?.trailer?.videoTitle}</h3>
							<p>{movieDetails?.trailer?.videoDescription}</p>
							<iframe title={movieDetails?.trailer?.title} src={movieDetails?.trailer?.linkEmbed} height="100%" style={{ width: '858px', aspectRatio: '2', marginTop: '-20px', scale: trailerScale }} />
						</div>
						<div className="movieDetails_wiki">
							<a href={movieDetails?.wikipedia.url}>
								<div>
									<img src="images/wiki.svg" alt={"Wikipedia's Logo"} />
									<h3>Wikipedia Plot Summary:</h3>
								</div>
							</a>
							<p>{movieDetails?.wikipedia.plotShort.plainText.substring(0, movieDetails?.wikipedia.plotShort.plainText.indexOf('\n'))}</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default MovieDetails;
