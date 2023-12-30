import stackedData from '../modal.js';
import { localStorage } from '../modalMarkup.js';
import Notiflix from 'notiflix';

const addWatchedBtn = document.querySelector('.add-to-watched');
const myModal = document.querySelector('.modal-window');

addWatchedBtn.addEventListener('click', addToWatchedListLocal);

function addToWatchedListLocal() {
  localStorage.saveToWatched('watched-list', stackedData.dataStacked);
  Notiflix.Notify.success(
    `Movie "${stackedData.dataStacked.title}" added to your "watched-list"`
  );
  addWatchedBtn.disabled = true;
  myModal.classList.add('isHidden');
}
