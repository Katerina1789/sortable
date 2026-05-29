// render.js — main app renderer (table + detail panel)

import { getState, subscribeState } from "./state.js";
import { createTable, renderTableBody } from "./table.js";
import { renderHeroDetail } from "./detailView.js";
import { getVisibleHeroes } from "./selectors.js";
import { initSortControls, updateSortIndicators } from "./sortControls.js";

// mount UI + subscribe to state changes
export const renderApp = () => {
  const tableContainer = document.getElementById("table-container");
  const detailContainer = document.getElementById("detail-view");

  // create table once (header + status row)
  const { table, status } = createTable(tableContainer);

  // initialize sort controls on header cells
  const headers = table.querySelectorAll("th");
  initSortControls(headers, getState().sortColumn, getState().sortDirection);

  // render on every state update
  const render = (state) => {
    // loading / error message
    status.textContent = state.loading
      ? "Loading heroes…"
      : state.error
        ? `Error: ${state.error.message || "Unable to load heroes."}`
        : "";

    // compute filtered + sorted + paginated heroes
    const visibleHeroes = getVisibleHeroes(state);

    // update table body
    renderTableBody(table, visibleHeroes, state.selectedHeroId);

    // update sort arrows
    updateSortIndicators(headers, state.sortColumn, state.sortDirection);

    // find selected hero for detail panel
    const hero = state.heroes.find(
      (h) => h.id === Number(state.selectedHeroId),
    );

    // render detail panel
    renderHeroDetail(detailContainer, hero);
  };

  // subscribe + initial render
  subscribeState(render);
  render(getState());
};
