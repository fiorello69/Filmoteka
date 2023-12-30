import createModalMarkup from './modalMarkup.js';
import TmdbApi from '../API/TMDB_API.js';
import StackedData from './StackedData.js';
import Notiflix from 'notiflix';

const API = new TmdbApi();
const stackedData = new StackedData();

const moviesList = document.querySelector('#movies-list');
const myModal = document.querySelector('.modal-window');
const closeBtn = document.querySelector('.close-button');

moviesList.addEventListener('click', ({ target }) => {
  if (target.nodeName === 'UL') {
    return;
  }

  let movieId;

  if (target.parentNode.nodeName === 'LI') {
    movieId = target.parentNode.dataset.id;
  }

  if (target.nodeName === 'LI') {
    movieId = target.dataset.id;
  }

  loadMovieInfo(movieId);
});

async function loadMovieInfo(id) {
  try {
    const data = await API.getInfoAboutMovie(id);

    createModalMarkup(data);
    openModal();

    stackData(data);
  } catch {
    Notiflix.Notify.failure('The resource you requested could not be found.');
  }
}

function openModal() {
  myModal.classList.remove('isHidden');
  addCloseEvents();
}

function addCloseEvents() {
  window.addEventListener('keydown', closeOnEsc);
  myModal.addEventListener('click', closeOnClickOutside);
  closeBtn.addEventListener('click', closeModal);
}

function closeOnEsc(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function closeOnClickOutside(event) {
  if (event.target === myModal) {
    closeModal();
  }
}

function closeModal() {
  myModal.classList.add('isHidden');
  window.removeEventListener('keydown', closeOnEsc);
  myModal.removeEventListener('click', closeOnClickOutside);
}

function stackData(data) {
  stackedData.dataStacked = {
    id: data.id,
    poster_path: data.poster_path,
    title: data.title,
    genre_ids: data.genres.map(item => item.id),
    genres: data.genres,
    release_date: data.release_date,
    vote_average: data.vote_average,
    vote_count: data.vote_count,
    popularity: data.popularity,
    original_title: data.original_title,
    overview: data.overview,
  };
}

export default stackedData;
