import TuiPagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import handleSyncPagination from './syncPaginationAndData.js';

const paginationEL = document.getElementById('tui-pagination-container');

function setTuiPagination(totalItems) {
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

export default setTuiPagination;
