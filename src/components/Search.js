import { useEffect, useState } from 'react';
import { fetchTop250 } from '../axios';
import LoadingScreen from './LoadingScreen';
import MovieListViewer from './MovieListViewer';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import './Search.css';

const movieToFilterString = (movie) => {
	return movie.title + movie.fullTitle + movie.crew + movie.year;
};
const filterOptions = createFilterOptions({
	stringify: movieToFilterString,
});

const Search = () => {
	const [top250Movies, setTop250Movies] = useState([]);
	const [topMoviesOptions, setTopMoviesOptions] = useState([]);
	const [query, setQuery] = useState('');

	console.log({ query });
	function updateQuery(e, value) {
		if (value === undefined) return;
		value = value || '';
		if (typeof value === 'object') {
			value = value.fullTitle;
		}
		setQuery(value);
		setTopMoviesOptions(top250Movies.filter((movie) => movieToFilterString(movie).toLowerCase().includes(value.toLowerCase())));
	}

	useEffect(() => {
		const results = fetchTop250();
		results.then((top250) => {
			setTop250Movies(
				top250.data.items.map((x) => {
					delete x.imDbRating;
					delete x.imDbRatingCount;
					delete x.rank;
					return x;
				})
			);
			setTopMoviesOptions(top250.data.items);
		});
	}, []);

	return top250Movies ? (
		<div className="search">
			<h1>Search Movies</h1>
			<Autocomplete freeSolo autoComplete inputValue={query} onChange={updateQuery} onInputChange={updateQuery} filterOptions={filterOptions} getOptionLabel={(movie) => movie.fullTitle || (topMoviesOptions.length && topMoviesOptions[0].fullTitle) || movie} options={topMoviesOptions} renderInput={(params) => <TextField {...params} label="Movie" />} />
			<br />
			<br />
			<div style={{ marginTop: '80px' }}>
				<MovieListViewer
					list={topMoviesOptions}
					title={
						Boolean(query) && (
							<>
								{topMoviesOptions.length === 0 ? 'No' : ''} Results For <span style={{ color: 'violet' }}>{query}</span>
							</>
						)
					}
					wrap
				/>
			</div>
		</div>
	) : (
		<LoadingScreen />
	);
};

export default Search;
