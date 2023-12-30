import Notiflix from 'notiflix';
import { localStorage } from '../../movieModal/modalMarkup.js';
import createMarkup from '../../moviesList/moviesListMarkup.js';
import setTuiWatchedPagination from './watchedPagination.js';

const queueTabBtn = document.querySelector('.queue-tab-btn');
const watchedTabBtn = document.querySelector('.watched-tab-btn');
const moviesList = document.getElementById('movies-list');
const paginationEl = document.querySelector('.tui-pagination');
const errorEl = document.querySelector('.search-error');
const loadingSpinner = document.querySelector('.loader');
const addBtns = document.querySelector('.buttons-wrapper');
const removeBtn = document.querySelector('.remove-btn');

watchedTabBtn.addEventListener('click', fillWatchedMoviesList);

function fillWatchedMoviesList() {
  watchedTabBtn.disabled = true;
  queueTabBtn.disabled = false;

  clear();
  loadingSpinner.classList.remove('hidden');
  loadWatchedMoviesList();
}

function loadWatchedMoviesList() {
  const data = localStorage.load('watched-list');

  if (!data) {
    onError('There is no movie saved in your watched list');
    return;
  }

  const dataForMarkup = data.slice(0, 12);
  const markup = createMarkup(dataForMarkup);

  setButtons();

  loadingSpinner.classList.add('hidden');

  printMovicesList(markup);

  if (data.length > 12) {
    const myPagination = setTuiWatchedPagination(data.length);
    paginationEl.classList.remove('isHidden');
  }
}

function setButtons() {
  addBtns.classList.add('isHidden');
  removeBtn.classList.remove('isHidden');
  removeBtn.textContent = 'Remove from watched';
}

function clear() {
  moviesList.innerHTML = '';
  paginationEl.classList.add('isHidden');
  errorEl.classList.add('isHidden');
}

function printMovicesList(markup) {
  moviesList.innerHTML = markup;
}

function onError(error) {
  Notiflix.Notify.warning(error);
  loadingSpinner.classList.add('hidden');
  moviesList.innerHTML = `<p class="local-error">${error}</p>`;
}

export default fillWatchedMoviesList;
