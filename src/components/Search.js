import { useContext, useEffect, useState, useTransition } from 'react';
import { fetchTop250 } from '../axios';
import LoadingScreen from './LoadingScreen';
import MovieListViewer from './MovieListViewer';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './Search.css';
import { APIContext } from '../APIContext';
import { LinearProgress } from '@mui/material';
import { CSSTransition } from 'react-transition-group';

const movieToFilterString = (movie) => {
	return movie.title + movie.fullTitle + movie.crew + movie.year;
};
const filterOptions = createFilterOptions({
	stringify: movieToFilterString,
});

const Search = () => {
	const [top250Movies, setTop250Movies] = useState([]);
	const [topMoviesOptions, setTopMoviesOptions] = useState([]);
	const [pending, startTransition] = useTransition();
	const [query, setQuery] = useState('');
	const [apiKey] = useContext(APIContext);

	function updateQuery(e, value) {
		if (value === undefined) return;
		value = value || '';
		if (typeof value === 'object') {
			value = value.fullTitle;
		}
		setQuery(value);
		startTransition(() => {
			setTopMoviesOptions(top250Movies.filter((movie) => movieToFilterString(movie).toLowerCase().includes(value.toLowerCase())));
		});
	}

	useEffect(() => {
		const results = fetchTop250(apiKey);
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
	}, [apiKey]);

	return top250Movies ? (
		<div className="search">
			<h1>Search Movies</h1>
			<CSSTransition in={pending} timeout={400} classNames="search_progress">
				<LinearProgress className="search_progress" />
			</CSSTransition>
			<Autocomplete freeSolo autoComplete inputValue={query} onChange={updateQuery} onInputChange={updateQuery} filterOptions={filterOptions} getOptionLabel={(movie) => movie.fullTitle || (topMoviesOptions.length && topMoviesOptions[0].fullTitle) || movie} options={topMoviesOptions} renderInput={(params) => <TextField {...params} label="Movie" />} />
			<br />
			<br />
			<div style={{ marginTop: '80px' }}>
				<MovieListViewer
					list={topMoviesOptions.slice(0, 25)}
					title={
						Boolean(query) && (
							<>
								{topMoviesOptions.length === 0 ? 'No' : ''} Results For <span style={{ color: 'violet' }}>{query}</span>
							</>
						)
					}
					wrap
					disableClick={pending}
				/>
			</div>
		</div>
	) : (
		<LoadingScreen />
	);
};

export default Search;
