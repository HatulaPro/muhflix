import React, { useEffect, useState } from 'react';

const ImageLoader = ({ src, ...rest }) => {
	const [tempImage, setTempImage] = useState('/muhflix/images/play.png');
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

	return <img src={tempImage} {...rest} />;
};

export default ImageLoader;
