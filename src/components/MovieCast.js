import { useMemo, useRef, useState, useEffect } from 'react';
import { TransitionGroup } from 'react-transition-group';
import './MovieCast.css';

const MovieCast = ({ actorList }) => {
	const [actorsStart, setActorsStart] = useState(0);
	const parentRef = useRef(null);
	const currentActor = useRef(null);

	// Calculating the space each actor has
	const MIN_ACTORS_ON_SCREEN = Math.floor((parentRef.current?.clientWidth - 120) / 160 || 4);
	const actorsElementsList = useMemo(() => {
		return actorList.map((actor, index) => (
			<div key={actor.id} className="movieCast_actor" ref={index === actorsStart ? currentActor : undefined}>
				<img src={actor.image} alt={actor.name} />
				<p>{actor.name}</p>
				<p>{actor.asCharacter}</p>
			</div>
		));
	}, [actorsStart, actorList]);

	function moveActorsForward() {
		const practicalLength = actorList.length - MIN_ACTORS_ON_SCREEN;
		setActorsStart(Math.min(actorsStart + 1, practicalLength));
	}
	function moveActorsBack() {
		setActorsStart(Math.max(actorsStart - 1, 0));
	}

	useEffect(() => {
		if (!currentActor.current) return;
		currentActor.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
	}, [currentActor, actorsElementsList]);

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
