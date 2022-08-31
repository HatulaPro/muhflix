import { useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './TrailerView.css';

const TrailerView = ({ trailer, show, update }) => {
	const bgRef = useRef(null);

	let trailerScale = '0';
	if (bgRef.current) {
		trailerScale = `${Math.min((0.95 * bgRef.current.clientWidth) / 858, 1)}`;
	}

	return (
		<div className={'trailerView_trailerViewerDiv ' + (show ? 'trailerView_trailerViewerDivShow' : '')} onClick={update}>
			<div className="trailerView_trailerViewerDivBG" ref={bgRef} onClick={update}></div>
			<ErrorBoundary onError={() => {}} FallbackComponent={<></>}>
				{trailer && show && <iframe title={trailer.title} src={trailer.linkEmbed} height="100%" style={{ scale: trailerScale }} />}
			</ErrorBoundary>
		</div>
	);
};

export default TrailerView;
