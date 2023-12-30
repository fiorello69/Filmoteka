import fillWatchedMoviesList from './watchedTab/watchedTab.js';

const libraryBtn = document.querySelector('.library-btn');
const homeBtn = document.querySelector('.home-btn');
const searchForm = document.querySelector('.search-form');
const rightBtns = document.querySelector('.buttons-right');

libraryBtn.addEventListener('click', onLibraryTab);

function onLibraryTab() {
  searchForm.classList.add('isHidden');
  rightBtns.classList.remove('isHidden');

  homeBtn.disabled = false;
  libraryBtn.disabled = true;

  fillWatchedMoviesList();
}
