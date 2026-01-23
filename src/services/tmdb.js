import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

if (!API_KEY) {
  console.warn(
    "Missing EXPO_PUBLIC_TMDB_API_KEY. Add it to .env and restart with: npx expo start -c"
  );
}

const client = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const img = {
  w200: (path) => (path ? `https://image.tmdb.org/t/p/w200${path}` : null),
  w300: (path) => (path ? `https://image.tmdb.org/t/p/w300${path}` : null),
  w500: (path) => (path ? `https://image.tmdb.org/t/p/w500${path}` : null),
  original: (path) => (path ? `https://image.tmdb.org/t/p/original${path}` : null),
};

export const tmdb = {
  popularMovies: (page = 1) => client.get("/movie/popular", { params: { page } }).then(r => r.data),

  trendingContent: (timeWindow = "week", page = 1) =>
    client.get(`/trending/all/${timeWindow}`, { params: { page } }).then(r => r.data),

  topRatedTV: (page = 1) => client.get("/tv/top_rated", { params: { page } }).then(r => r.data),

  search: (query, page = 1) =>
    client
      .get("/search/multi", { params: { query, page, include_adult: false } })
      .then((r) => r.data),

  movieDetails: (id) => client.get(`/movie/${id}`).then((r) => r.data),
  tvDetails: (id) => client.get(`/tv/${id}`).then((r) => r.data),

  movieCredits: (id) => client.get(`/movie/${id}/credits`).then((r) => r.data),
  tvCredits: (id) => client.get(`/tv/${id}/credits`).then((r) => r.data),
};
