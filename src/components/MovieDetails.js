import { useEffect, useRef } from 'react';
import './MovieDetails.css';
import MovieRatings from './MovieRatings';
import MovieCast from './MovieCast';

const MovieDetails = ({ show, update, movieDetails }) => {
	const refToTop = useRef(null);
	const trailerHeadingRef = useRef(null);

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

	const releaseDate = new Date(movieDetails?.releaseDate || '01/01/1999');
	const nowDate = new Date();

	let trailerScale = '1';
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
							{movieDetails && <MovieCast actorList={movieDetails.actorList} />}
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
										<b style={{ color: 'var(--theme-secondary)' }}>{parseInt((releaseDate - nowDate) / (1000 * 60 * 60 * 24))} days until release!</b>
									</p>
								)}
							</div>
							<div>
								<h3>Runtime</h3>
								<p>{movieDetails?.runtimeStr || '4y'}</p>
							</div>
						</div>
						<div className="movieDetails_section">
							<h3>Ratings: </h3>
							<MovieRatings movieDetails={movieDetails} />
						</div>
						<div className="movieDetails_section movieDetails_trailer" ref={trailerHeadingRef}>
							<h3>{movieDetails?.trailer?.videoTitle}</h3>
							<p>{movieDetails?.trailer?.videoDescription}</p>
							<div style={{ width: `calc(858px * ${trailerScale})`, height: `calc(858px * ${trailerScale} / 2)`, position: 'relative', margin: '20px 0px' }}>
								<iframe title={movieDetails?.trailer?.title} src={movieDetails?.trailer?.linkEmbed} style={{ width: '858px', height: `${858 / 2}px`, transform: `scale(${trailerScale})`, transformOrigin: '0 0', inset: '0' }} />
							</div>
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
