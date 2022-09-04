import { useMemo, useRef, useState, useDeferredValue } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ImageLoader from './ImageLoader';
import './MovieCast.css';

const MovieCast = ({ actorList }) => {
	const [actorsStart, setActorsStart] = useState(0);
	const parentRef = useRef(null);
	const actorsStartDeferred = useDeferredValue(actorsStart);

	// Calculating the space each actor has
	const MIN_ACTORS_ON_SCREEN = Math.floor((parentRef.current?.clientWidth - 120) / 160 || 4);
	const actorsElementsList = useMemo(() => {
		return actorList.map((actor, index) =>
			index >= actorsStartDeferred && index <= actorsStartDeferred + MIN_ACTORS_ON_SCREEN ? (
				<CSSTransition key={actor.id} timeout={{ appear: 0, enter: 100, exit: 50 }} classNames="movieCast_shrink">
					<div className="movieCast_actor">
						<ImageLoader src={actor.image} alt={actor.name} />
						<p>{actor.name}</p>
						<p>{actor.asCharacter}</p>
					</div>
				</CSSTransition>
			) : null
		);
	}, [actorsStartDeferred, actorList]);

	function moveActorsForward() {
		const practicalLength = actorList.length - MIN_ACTORS_ON_SCREEN;
		setActorsStart(Math.min(actorsStart + 1, practicalLength));
	}
	function moveActorsBack() {
		setActorsStart(Math.max(actorsStart - 1, 0));
	}
	return (
		<div className="movieCast_castContent" ref={parentRef}>
			<button className="btn movieCast_scrollButtons" onClick={moveActorsBack}>
				&lt;
			</button>
			<TransitionGroup component={'div'} className="movieCast_castScroller" appear={false}>
				{actorsElementsList}
			</TransitionGroup>
			<button className="btn movieCast_scrollButtons" onClick={moveActorsForward}>
				&gt;
			</button>
		</div>
	);
};

export default MovieCast;
