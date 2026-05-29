// sort.js — apply sorting (UI → state)

import { updateState } from "./state.js";

// update sort column + direction, reset to page 1
export const applySort = (column, direction) => {
  updateState({
    sortColumn: column,
    sortDirection: direction,
    currentPage: 1,
  });
};
