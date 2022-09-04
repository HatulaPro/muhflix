import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ImageLoader from './ImageLoader';
import './MovieCast.css';

const MovieCast = ({ actorList }) => {
	const [actorsStart, setActorsStart] = useState(0);

	console.log(actorList.length);

	function moveActorsForward() {
		const practicalLength = actorList.length - 2;
		setActorsStart(Math.min(actorsStart + 1, practicalLength - 1) % practicalLength);
	}
	function moveActorsBack() {
		setActorsStart(Math.max(actorsStart - 1, 0));
	}
	return (
		<div className="movieCast_castContent">
			<button className="btn movieCast_scrollButtons" onClick={moveActorsBack}>
				&lt;
			</button>
			<TransitionGroup component={'div'} className="movieCast_castScroller" appear={false}>
				{actorList &&
					actorList.map((actor, index) =>
						index >= actorsStart && index < actorsStart + 6 ? (
							<CSSTransition key={actor.id} timeout={{ appear: 0, enter: 400, exit: 400 }} classNames="movieCast_shrink">
								<div className="movieCast_actor">
									<ImageLoader src={actor.image} alt={actor.name} />
									<p>{actor.name}</p>
									<p>{actor.asCharacter}</p>
								</div>
							</CSSTransition>
						) : null
					)}
			</TransitionGroup>
			<button className="btn movieCast_scrollButtons" onClick={moveActorsForward}>
				&gt;
			</button>
		</div>
	);
};

export default MovieCast;
