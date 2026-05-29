import { updateState } from "./state.js";
import { renderApp } from "./render.js";

export const filterHeroes = (heroes, query, field, operator) => {
  return heroes.filter((hero) => {
    let value = "";
    if (field === "name") value = hero.name || "";
    if (field === "race") value = hero.appearance.race || "";
    if (field === "gender") value = hero.appearance.gender || "";
    if (field === "alignment") value = hero.biography.alignment || "";

    value = value.toLowerCase();
    query = query.toLowerCase();

    if (operator === "include") return value.includes(query);
    if (operator === "exclude") return !value.includes(query);
    if (operator === "equal") return value === query;
    if (operator === "fuzzy")
      return query.split("").every((char) => value.includes(char));
    return value.includes(query); // default
  });
};

export const initSearch = () => {
  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", (event) => {
    const query = event.target.value;

    updateState({
      query,
      currentPage: 1, 
    });
  });
};
