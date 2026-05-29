// render.js - main app renderer (table + detail)

import { getState, subscribeState } from "./state.js";
import { createTable, renderTableBody } from "./table.js";
import { renderHeroDetail } from "./detailView.js";
import { getVisibleHeroes } from "./selectors.js";
import { initSortControls } from "./sortControls.js"; // ⭐ make sure this import exists

// mount app UI
export const renderApp = () => {
  const tableContainer = document.getElementById("table-container");
  const detailContainer = document.getElementById("detail-view");

  // create table once
  const { table, status } = createTable(tableContainer);

  const headers = table.querySelectorAll("th");
  initSortControls(headers, getState().sortColumn, getState().sortDirection);

  // render on state change
  const render = (state) => {
    status.textContent = state.loading
      ? "Loading heroes…"
      : state.error
        ? `Error: ${state.error.message || "Unable to load heroes."}`
        : "";

    const visibleHeroes = getVisibleHeroes(state);
    renderTableBody(table, visibleHeroes, state.selectedHeroId);

    const hero = state.heroes.find(
      (h) => h.id === Number(state.selectedHeroId),
    );

    renderHeroDetail(detailContainer, hero);
  };

  // subscribe + initial render
  subscribeState(render);
  render(getState());
};
