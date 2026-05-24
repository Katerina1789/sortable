import { subscribeState } from './state.js';
import { createTable, renderTableBody } from './table.js';
import { renderHeroDetail } from './detail.js';
// import { initSearchControls } from './search.js';
// import { initPaginationControls } from './pagination.js';
// import { initSortControls } from './sortControls.js';

// renderApp builds the static UI structure once
export const renderApp = () => {
  // table container
  const tableContainer = document.getElementById('table-container');

  // detail container
  const detailContainer = document.getElementById('detail-view');

  // create the table structure once
  const table = createTable(tableContainer);

  // initialize UI controls (search, pagination, sorting)
//   initSearchControls();
//   initPaginationControls();
//   initSortControls();

  // subscribe to state changes and re-render dynamic parts
  subscribeState((state) => {
    // re-render table rows
    renderTableBody(table);

    // re-render detail panel
    const hero = state.heroes.find((h) => h.id === Number(state.selectedHeroId));
    renderHeroDetail(detailContainer, hero);
  });

  // initial render
  renderTableBody(table);
};
