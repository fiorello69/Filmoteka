import Notiflix from 'notiflix';
import TmdbApi from '../../API/TMDB_API.js';
import createMarkup from '../moviesListMarkup.js';
import setTuiPaginationForSearch from './paginationOnSearch/TuiPaginationOnSearch.js';

const API = new TmdbApi();

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const moviesList = document.getElementById('movies-list');
const loadingSpinner = document.querySelector('.loader');
const errorEl = document.querySelector('.search-error');
const paginationEl = document.querySelector('.tui-pagination');

searchForm.addEventListener('submit', fillMoviesListOnSearch);

function fillMoviesListOnSearch(event) {
  event.preventDefault();

  const inputValue = searchInput.value.trim();

  if (inputValue.length === 0) {
    onError('Please, write a movie name');
    errorEl.classList.add('isHidden');
    return;
  }

  clear();
  loadingSpinner.classList.remove('hidden');

  loadMoviesOnSearch(inputValue);
}

async function loadMoviesOnSearch(searchedTerm) {
  API.searchQuery = searchedTerm;

  try {
    const data = await API.getSearchedMovie();

    if (data.results.length === 0) {
      onError('Search result not successful. Enter the correct movie name');
      errorEl.classList.remove('isHidden');
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

function clear() {
  moviesList.innerHTML = '';
  searchForm.reset();
  errorEl.classList.add('isHidden');
  paginationEl.classList.add('isHidden');
}

function printMoviesList(markup) {
  moviesList.innerHTML = markup;
}

function showPagination(totalItems) {
  const myPagination = setTuiPaginationForSearch(totalItems);
  paginationEl.classList.remove('isHidden');
  // update aici //
}

function onError(error) {
  loadingSpinner.classList.add('hidden');
  Notiflix.Notify.failure(error);
}

export default API;
