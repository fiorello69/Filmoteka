import axios from 'axios';

const API_KEY = '051a3d8a53317eb2948f5da4b81e4296';

class TmdbApi {
  constructor(searchedTerm) {
    this.searchQuery = searchedTerm;
  }

  async getAllMovies(page = 1) {
    const ENDPOINT = 'https://api.themoviedb.org/3/trending/movie/week';
    const URL = `${ENDPOINT}?api_key=${API_KEY}&page=${page}`;
    const response = await axios.get(URL);
    return response.data;
  }

  async getSearchedMovie(page = 1) {
    const ENDPOINT = 'https://api.themoviedb.org/3/search/movie';
    const URL = `${ENDPOINT}?api_key=${API_KEY}&query=${this.searchQuery}&page=${page}`;
    const response = await axios.get(URL);
    return response.data;
  }

  async getInfoAboutMovie(movieId) {
    const ENDPOINT = `https://api.themoviedb.org/3/movie`;
    const URL = `${ENDPOINT}/${movieId}?api_key=${API_KEY}`;
    const response = await axios.get(URL);
    return response.data;
  }
}

export default TmdbApi;
