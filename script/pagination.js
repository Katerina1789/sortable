// pagination.js — page size + prev/next controls (UI → state)

import { getState, subscribeState, updateState } from "./state.js";
import { getTotalPages } from "./selectors.js";

// initialize pagination controls
export const initPagination = () => {
  const pageSize = document.getElementById("page-size");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  // load initial value from state (URL sync)
  const state = getState();
  pageSize.value = state.pageSize;

  // enable/disable prev/next based on current page
  const updateButtons = () => {
    const state = getState();
    const totalPages = getTotalPages(state);

    prev.disabled = state.currentPage <= 1;
    next.disabled = state.currentPage >= totalPages;
  };

  // page size change → reset to page 1
  pageSize.addEventListener("change", (event) => {
    updateState({
      pageSize: event.target.value,
      currentPage: 1,
    });

    updateButtons();
  });

  // previous page
  prev.addEventListener("click", () => {
    const state = getState();
    if (state.currentPage > 1) {
      updateState({ currentPage: state.currentPage - 1 });
      updateButtons();
    }
  });

  // next page
  next.addEventListener("click", () => {
    const state = getState();
    const totalPages = getTotalPages(state);

    if (state.currentPage < totalPages) {
      updateState({ currentPage: state.currentPage + 1 });
      updateButtons();
    }
  });

  // re-run button state on every state change
  subscribeState(updateButtons);

  // initial button state
  updateButtons();
};
