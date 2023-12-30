import stackedData from '../modal.js';
import { localStorage } from '../modalMarkup.js';
import Notiflix from 'notiflix';

const addQueueBtn = document.querySelector('.add-to-queue');
const myModal = document.querySelector('.modal-window');

addQueueBtn.addEventListener('click', addToQueueListLocal);

function addToQueueListLocal() {
  localStorage.saveToQueue('queue-list', stackedData.dataStacked);
  Notiflix.Notify.success(
    `Movie "${stackedData.dataStacked.title}" added to your "queue-list"`
  );
  addQueueBtn.disabled = true;
  myModal.classList.add('isHidden');
}
