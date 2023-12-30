import TuiPagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import handleSyncPaginationOnSearch from './syncPaginationAndDataOnSearch';

const paginationEL = document.getElementById('tui-pagination-container');

function setTuiPaginationForSearch(totalItems) {
  const paginationOptions = {
    totalItems,
    itemsPerPage: 12,
    visiblePages: 7,
    page: 1,
    centerAlign: true,
  };

  const myPagination = new TuiPagination(paginationEL, paginationOptions);

  myPagination.on('afterMove', eventData => {
    handleSyncPaginationOnSearch(eventData.page);
  });
}

export default setTuiPaginationForSearch;
