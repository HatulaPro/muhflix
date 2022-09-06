import { ErrorBoundary } from 'react-error-boundary';

const TRAILER_WIDTH = 858;
const Trailer = ({ parentWidth, title, src, maxed }) => {
	if (maxed) parentWidth = Math.min(parentWidth || TRAILER_WIDTH, TRAILER_WIDTH);
	const trailerScale = `${(0.95 * parentWidth) / TRAILER_WIDTH}`;

	return (
		<ErrorBoundary onError={() => {}} FallbackComponent={<h3>Can not show trailer</h3>}>
			<div style={{ width: `calc(${TRAILER_WIDTH}px * ${trailerScale})`, height: `calc(${TRAILER_WIDTH}px * ${trailerScale} / 2)`, position: 'relative', margin: '20px 0px' }}>
				<iframe title={title} src={src} allowFullScreen="true" allow="fullscreen" style={{ width: `${TRAILER_WIDTH}px`, height: `${TRAILER_WIDTH / 2}px`, transform: `scale(${trailerScale})`, transformOrigin: '0 0', inset: '0', position: 'absolute' }} />
			</div>
		</ErrorBoundary>
	);
};

export default Trailer;
