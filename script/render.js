import { getState, subscribeState } from './state.js';
import { createTable, renderTableBody } from './table.js';
import { renderHeroDetail } from './detailView.js';
import { getVisibleHeroes } from './utils.js';

export const renderApp = () => {
  const tableContainer = document.getElementById('table-container');
  const detailContainer = document.getElementById('detail-view');

  // Create table ONCE
  const table = createTable(tableContainer);

  const render = (state) => {
    const visibleHeroes = getVisibleHeroes(state.heroes, state);
    renderTableBody(table, visibleHeroes);

    const hero = state.heroes.find((h) => h.id === Number(state.selectedHeroId));
    renderHeroDetail(detailContainer, hero);
  };

  subscribeState(render);
  render(getState());
};
