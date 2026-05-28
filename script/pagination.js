import { renderApp } from "./render.js";
import { getState, updateState } from "./state.js";

export const paginateHeroes = (heroes, currentPage, pageSize) => {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  return heroes.slice(start, end);
};
export const initPagination = () => {
  const pageSize = document.getElementById("page-size");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  const updateButtons = () => {
    const { currentPage, heroes, pageSize } = getState();
    const totalPages = Math.ceil(heroes.length / pageSize);
    prev.disabled = currentPage <= 1;
    next.disabled = currentPage >= totalPages;
  };

  pageSize.addEventListener("change", (event) => {
    const value = event.target.value;
    updateState({ pageSize: value, currentPage: 1 });
    renderApp();
    updateButtons();
  });
  prev.addEventListener("click", (event) => {
    const currentPage = getState().currentPage;
    if (currentPage > 1) {
      updateState({ currentPage: currentPage - 1 });
      renderApp();
      updateButtons();
    }
  });
  next.addEventListener("click", (event) => {
    const totalPages = Math.ceil(
      getState().heroes.length / getState().pageSize,
    );
    const currentPage = getState().currentPage;
    if (currentPage < totalPages) {
      updateState({ currentPage: currentPage + 1 });
      renderApp();
      updateButtons();
    }
  });
  updateButtons();
};
