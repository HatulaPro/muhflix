import React, { useState } from 'react';
import MovieViewer from './MovieViewer';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './MovieListViewer.css';

const MovieListViewer = ({ list, title, wrap, disableClick, ...rest }) => {
	const [currentMovieViewing, setCurrentMovieViewing] = useState(-1);

	const setShowingIndex = disableClick ? () => {} : setCurrentMovieViewing;
	return (
		<div className="movieListViewer" {...rest}>
			<h2>{title}</h2>
			{Boolean(list && list.length) && (
				<TransitionGroup component="div" className={`scrollbar movieListViewer_list ${wrap && 'movieListViewer_listWrapped'}`}>
					{list.map((movie, index) => (
						<CSSTransition timeout={500} classNames="item" key={movie.id}>
							<MovieViewer index={index} movie={movie} currentShowingIndex={currentMovieViewing} setShowingIndex={setShowingIndex} />
						</CSSTransition>
					))}
				</TransitionGroup>
			)}
		</div>
	);
};

export default MovieListViewer;
