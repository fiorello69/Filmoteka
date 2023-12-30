import Notiflix from 'notiflix';
import createMarkup from '../../moviesListMarkup.js';
import API from '../moviesListOnSearch.js';

const moviesList = document.getElementById('movies-list');

function handleSyncPaginationOnSearch(targetedPageNumber) {
  const coefficient = (targetedPageNumber * 12) / 20;
  const condition = calcCondition(coefficient);

  handleCases(condition, coefficient);
  return;
}

function calcCondition(coefficient) {
  const condition = Number((Math.ceil(coefficient) - coefficient).toFixed(1));

  if (condition === 0.4) {
    return 1;
  }

  if (condition === 0.8) {
    return 2;
  }

  if (condition === 0.2) {
    return 3;
  }

  if (condition === 0.6) {
    return 4;
  }

  if (condition === 0) {
    return 5;
  }
}

function handleCases(condition, coefficient) {
  if (condition === 1 || condition === 3 || condition === 5) {
    const page = Math.ceil(coefficient);
    requestDataFromOnePage(page, condition);
    return;
  }

  if (condition === 2 || condition === 4) {
    const previousPage = Math.floor(coefficient);
    const followingPage = Math.ceil(coefficient);
    requestDataFromTwoPages(previousPage, followingPage, condition);
    return;
  }
}

async function requestDataFromOnePage(page, condition) {
  try {
    const data = await API.getSearchedMovie(page);

    let dataForMarkup;

    if (condition === 1) dataForMarkup = data.results.splice(0, 12);
    if (condition === 3) dataForMarkup = data.results.splice(4, 12);
    if (condition === 5) dataForMarkup = data.results.splice(8, 12);

    const markup = createMarkup(dataForMarkup);
    printMoviesList(markup);
    handleSmoothScroll();
  } catch (error) {
    onError(error.message);
  }
}

async function requestDataFromTwoPages(previousPage, followingPage, condition) {
  try {
    const previousData = await API.getSearchedMovie(previousPage);
    const followingData = await API.getSearchedMovie(followingPage);

    const allData = [...previousData.results, ...followingData.results];
    let dataForMarkup;

    if (condition === 2) dataForMarkup = allData.splice(12, 12);
    if (condition === 4) dataForMarkup = allData.splice(16, 12);

    const markup = createMarkup(dataForMarkup);
    printMoviesList(markup);
    handleSmoothScroll();
  } catch (error) {
    onError(error.message);
  }
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

function onError(error) {
  Notiflix.Notify.failure(error);
  // trecut eroare si in lista //
}

export default handleSyncPaginationOnSearch;
