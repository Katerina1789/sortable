// render.js - main app renderer (table + detail)

import { getState, subscribeState } from "./state.js";
import { createTable, renderTableBody } from "./table.js";
import { renderHeroDetail } from "./detailView.js";

// mount app UI
export const renderApp = () => {
  const tableContainer = document.getElementById("table-container");
  const detailContainer = document.getElementById("detail-view");

  // create table once
  const { table, status } = createTable(tableContainer);

  // render on state change
  const render = (state) => {
    status.textContent = state.loading
      ? "Loading heroes…"
      : state.error
        ? `Error: ${state.error.message || "Unable to load heroes."}`
        : "";

    renderTableBody(table, state.heroes, state.selectedHeroId);

    const hero = state.heroes.find(
      (h) => h.id === Number(state.selectedHeroId),
    );

    renderHeroDetail(detailContainer, hero);
  };

  // subscribe + initial render
  subscribeState(render);
  render(getState());
};
