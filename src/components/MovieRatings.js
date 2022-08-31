import './MovieRatings.css';

const MovieRatings = ({ movieDetails }) => {
	if (!movieDetails) return <></>;
	const keyToImage = new Map([
		['metacritic', 'https://www.seekpng.com/png/full/353-3537022_into-the-breach-metacritic-transparent.png'],
		['metacriticRating', 'https://www.seekpng.com/png/full/353-3537022_into-the-breach-metacritic-transparent.png'],
		['imDb', 'https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg'],
		['imDbRating', 'https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg'],
		['filmAffinity', 'https://www.filmaffinity.com/images/logo4.png'],
		['rottenTomatoes', 'https://www.rottentomatoes.com/assets/pizza-pie/images/rtlogo.9b892cff3fd.png'],
		['theMovieDb', 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'],
	]);
	let ratings = Object.entries(movieDetails.ratings).filter(([key, value]) => keyToImage.has(key) && value.length);
	if (!ratings.length) {
		ratings = Object.entries(movieDetails).filter(([key, value]) => keyToImage.has(key) && value.length);
	}

	function colorOfRating(rating) {
		if (rating > 10) return colorOfRating(rating / 10);
		if (rating > 9) return '#209c05';
		if (rating > 7) return '#85e62c';
		if (rating > 5) return '#ebff0a';
		if (rating > 3) return '#f2ce02';
		return '#ff0a0a';
	}

	return (
		<div className="movieRatings">
			{ratings.map(([key, value]) => (
				<div className="movieRatings_pair">
					<img className="movieRatings_image" key={key} src={keyToImage.get(key)} alt={key} /> <span style={{ textDecorationColor: colorOfRating(value) }}>{value <= 10 ? value * 10 : value}%</span>
				</div>
			))}
		</div>
	);
};

export default MovieRatings;
