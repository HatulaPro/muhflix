import { useRef } from 'react';
import Trailer from './Trailer';
import './TrailerView.css';

const TrailerView = ({ trailer, show, update }) => {
	const bgRef = useRef(null);

	return (
		<div className={'trailerView_trailerViewerDiv ' + (show ? 'trailerView_trailerViewerDivShow' : '')} onClick={update}>
			<div className="trailerView_trailerViewerDivBG" ref={bgRef} onClick={update}></div>
			{show && trailer && <Trailer parentWidth={bgRef.current?.clientWidth} maxed title={trailer?.title} src={trailer?.linkEmbed} />}
		</div>
	);
};

export default TrailerView;
