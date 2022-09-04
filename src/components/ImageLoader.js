import React, { useEffect, useState } from 'react';
import LoadingImage from '../images/loading.png';

const ImageLoader = ({ src, alt, ...rest }) => {
	const [tempImage, setTempImage] = useState(LoadingImage);
	useEffect(() => {
		const image = new Image();
		image.src = src;

		const listener = () => {
			setTempImage(src);
		};
		image.addEventListener('load', listener);

		return () => {
			image.removeEventListener(image, listener);
		};
	}, [src]);

	return <img src={tempImage} alt={alt} {...rest} />;
};

export default ImageLoader;
