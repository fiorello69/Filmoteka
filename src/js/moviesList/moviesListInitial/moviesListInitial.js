import TmdbApi from '../../API/TMDB_API.js';
import Notiflix from 'notiflix';
import createMarkup from '../moviesListMarkup.js';
import setTuiPagination from './pagination/TuiPagination.js';

const API = new TmdbApi();
const moviesList = document.getElementById('movies-list');
const loadingSpinner = document.querySelector('.loader');

window.addEventListener('DOMContentLoaded', fillInitialMoviesList);

function fillInitialMoviesList() {
  moviesList.innerHTML = '';
  loadingSpinner.classList.remove('hidden');
  loadInitialMoviesFromDB();
}

async function loadInitialMoviesFromDB() {
  try {
    const data = await API.getAllMovies();

    if (data.results.length === 0) {
      onError('There is no data');
      return;
    }

    const dataForMarkup = [...data.results].splice(0, 12);
    const markup = createMarkup(dataForMarkup);

    loadingSpinner.classList.add('hidden');

    printMoviesList(markup);

    if (data.total_results > 12) {
      showPagination(data.total_results);
    }
  } catch (error) {
    onError(error.message);
  }
}

function onError(error) {
  loadingSpinner.classList.add('hidden');
  moviesList.innerHTML = `<p>We are sorry, there is a server error that prevents data loading</p>`;
  Notiflix.Notify.failure(error);
}

function printMoviesList(markup) {
  moviesList.innerHTML = markup;
}

function showPagination(totalItems) {
  const myPagination = setTuiPagination(totalItems);
}

export default fillInitialMoviesList;
