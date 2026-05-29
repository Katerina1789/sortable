// search.js — search input + field/operator controls (UI → state)

import { getState, updateState } from "./state.js";

export const initSearch = () => {
  const searchInput = document.getElementById("search");
  const fieldSelect = document.getElementById("field");
  const operatorSelect = document.getElementById("operator");

  // load initial values from state (URL sync)
  const state = getState();
  searchInput.value = state.query;
  fieldSelect.value = state.field;
  operatorSelect.value = state.operator;

  // apply search → update state + reset to page 1
  const applySearch = () => {
    updateState({
      query: searchInput.value,
      field: fieldSelect.value,
      operator: operatorSelect.value,
      currentPage: 1,
    });
  };

  // input/select events → state updates
  searchInput.addEventListener("input", applySearch);
  fieldSelect.addEventListener("change", applySearch);
  operatorSelect.addEventListener("change", applySearch);
};
