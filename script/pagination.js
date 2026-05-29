import { getState, subscribeState, updateState } from "./state.js";
import { getTotalPages } from "./selectors.js";

export const paginateHeroes = (heroes, currentPage, pageSize) => {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  return heroes.slice(start, end);
};

export const initPagination = () => {
  const pageSize = document.getElementById("page-size");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const state = getState();

  pageSize.value = state.pageSize;

  const updateButtons = () => {
    const state = getState();
    const totalPages = getTotalPages(state);

    prev.disabled = state.currentPage <= 1;
    next.disabled = state.currentPage >= totalPages;
  };

  pageSize.addEventListener("change", (event) => {
    const value = event.target.value;

    updateState({
      pageSize: value,
      currentPage: 1, 
    });

    updateButtons();
  });

  prev.addEventListener("click", () => {
    const state = getState();
    if (state.currentPage > 1) {
      updateState({ currentPage: state.currentPage - 1 });
      updateButtons();
    }
  });

  next.addEventListener("click", () => {
    const state = getState();
    const totalPages = getTotalPages(state);

    if (state.currentPage < totalPages) {
      updateState({ currentPage: state.currentPage + 1 });
      updateButtons();
    }
  });

  subscribeState(updateButtons);
  updateButtons();
};
