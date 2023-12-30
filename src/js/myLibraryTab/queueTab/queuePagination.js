import TuiPagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { localStorage } from '../../movieModal/modalMarkup.js';
import createMarkup from '../../moviesList/moviesListMarkup.js';

const paginationEL = document.getElementById('tui-pagination-container');
const loadingSpinner = document.querySelector('.loader');
const moviesList = document.getElementById('movies-list');

function setTuiQueuePagination(totalItems) {
  const paginationOptions = {
    totalItems,
    itemsPerPage: 12,
    visiblePages: 7,
    page: 1,
    centerAlign: true,
  };

  const myPagination = new TuiPagination(paginationEL, paginationOptions);

  myPagination.on('afterMove', eventData => {
    handleSyncPagination(eventData.page);
  });
}

function handleSyncPagination(page) {
  handleSmoothScroll();
  moviesList.innerHTML = '';
  loadingSpinner.classList.remove('hidden');

  const data = localStorage.load('queue-list');

  const firstIndex = (page - 1) * 12;
  const lastIndex = page * 12;

  const dataForMarkup = data.slice(firstIndex, lastIndex);
  const markup = createMarkup(dataForMarkup);

  loadingSpinner.classList.add('hidden');
  printMoviesList(markup);
}

function printMoviesList(markup) {
  moviesList.innerHTML = markup;
}

function handleSmoothScroll() {
  window.scrollTo({
    top: 30,
    behavior: 'smooth',
  });
}

export default setTuiQueuePagination;
