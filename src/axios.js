import axios from 'axios';
import mostPopular from './responses/mostPopular.json';
import inTheaters from './responses/inTheaters.json';
import topMovie from './responses/topMovie.json';
import top250 from './responses/top250.json';

const API_INSTANCE = axios.create({
	baseURL: 'https://imdb-api.com/en/API/',
});

const API_KEY = 'k_21l5zyap';

const GET_FROM_API = false;

// Api endpoints to add:
// /MostPopularMovies/API_KEY
// /InTheaters/API_KEY
// /ComingSoon/API_KEY
// /BoxOfficeAllTime/API_KEY

export async function fetchTop250() {
	if (GET_FROM_API) {
		return API_INSTANCE.get(`/Top250Movies/${API_KEY}`);
	} else {
		return Promise.resolve({ data: top250 });
	}
}

export async function fetchMostPopular() {
	if (GET_FROM_API) {
		return API_INSTANCE.get(`/MostPopularMovies/${API_KEY}`);
	} else {
		return Promise.resolve({ data: mostPopular });
	}
}

export async function fetchInTheaters() {
	if (GET_FROM_API) {
		return API_INSTANCE.get(`/InTheaters/${API_KEY}`);
	} else {
		return Promise.resolve({ data: inTheaters });
	}
}

export async function searchMovies(query) {
	return API_INSTANCE.get(`/Search/${API_KEY}/${query}`);
}

export async function getMovieDetails(movieId) {
	if (GET_FROM_API) {
		return API_INSTANCE.get(`/Title/${API_KEY}/${movieId}/FullActor,FullCast,Posters,Images,Trailer,Ratings,Wikipedia,`);
	} else {
		return Promise.resolve({ data: topMovie });
	}
}
