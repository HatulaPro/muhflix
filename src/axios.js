import axios from 'axios';
import mostPopular from './responses/mostPopular.json';
import inTheaters from './responses/inTheaters.json';
import topMovie from './responses/topMovie.json';
import top250 from './responses/top250.json';

const API_INSTANCE = axios.create({
	baseURL: 'https://imdb-api.com/en/API/',
});

// const API_KEY = null; // 'k_21l5zyap';

// Api endpoints to add:
// /MostPopularMovies/API_KEY
// /InTheaters/API_KEY
// /ComingSoon/API_KEY
// /BoxOfficeAllTime/API_KEY

export async function fetchTop250({ value, enabled }) {
	if (enabled) {
		return API_INSTANCE.get(`/Top250Movies/${value}`);
	} else {
		return Promise.resolve({ data: top250 });
	}
}

export async function fetchMostPopular({ value, enabled }) {
	if (enabled) {
		return API_INSTANCE.get(`/MostPopularMovies/${value}`);
	} else {
		return Promise.resolve({ data: mostPopular });
	}
}

export async function fetchInTheaters({ value, enabled }) {
	if (enabled) {
		return API_INSTANCE.get(`/InTheaters/${value}`);
	} else {
		return Promise.resolve({ data: inTheaters });
	}
}

export async function getMovieDetails({ value, enabled }, movieId) {
	if (enabled) {
		return API_INSTANCE.get(`/Title/${value}/${movieId}/FullActor,FullCast,Posters,Images,Trailer,Ratings,Wikipedia,`);
	} else {
		return Promise.resolve({ data: topMovie });
	}
}

export async function validateAPIKey(key) {
	const response = await API_INSTANCE.get(`https://imdb-api.com/API/Usage/${key}`);
	return !Boolean(response.data.errorMessage);
}
