import { useEffect, useState } from 'react';
import './Carousel.css';

const Carousel = ({ movieDetails, bottomText, bottomTextTitle }) => {
	const [images, setImages] = useState(['#1', '#2', '#3']);

	useEffect(() => {
		if (movieDetails?.posters?.posters) {
			setImages(movieDetails.posters.posters.map((x) => x.link).slice(0, 3));
		}
	}, [movieDetails]);

	useEffect(() => {
		const interval = setInterval(shiftImages, 2200);
		return () => {
			clearInterval(interval);
		};
	}, []);

	function shiftImages() {
		setImages((oldImages) => {
			oldImages.push(oldImages.shift());
			return [...oldImages];
		});
	}

	return (
		<div className="carousel">
			<div className="carousel_images">
				{images.map((image, index) => (
					<img className="carousel_image" src={image} key={image} alt={`${index} poster`} onClick={shiftImages} />
				))}
			</div>
			<p>
				<b style={{ color: '#f5c518' }}>{bottomTextTitle} </b>
				{bottomText || ' abc, aksjd aisod, pasoid aoisd'}
			</p>
		</div>
	);
};

export default Carousel;
