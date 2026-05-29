import { getState, updateState } from "./state.js";

export const initSearch = () => {
  const searchInput = document.getElementById("search");
  const fieldSelect = document.getElementById("field");
  const operatorSelect = document.getElementById("operator");
  const state = getState();

  searchInput.value = state.query;
  fieldSelect.value = state.field;
  operatorSelect.value = state.operator;

  const applySearch = () => {
    updateState({
      query: searchInput.value,
      field: fieldSelect.value,
      operator: operatorSelect.value,
      currentPage: 1,
    });
  };

  searchInput.addEventListener("input", applySearch);
  fieldSelect.addEventListener("change", applySearch);
  operatorSelect.addEventListener("change", applySearch);
};
