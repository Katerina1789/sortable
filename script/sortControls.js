// sortControls.js — table header click → sort state updates

import { applySort } from "./sort.js";

// compute next direction when clicking a column
const getNextDirection = (clickedColumn, currentColumn, currentDirection) => {
  if (clickedColumn !== currentColumn) return "asc";
  return currentDirection === "asc" ? "desc" : "asc";
};

// update sort arrow classes on all headers
const updateSortIndicators = (headers, activeColumn, direction) => {
  headers.forEach((th) => {
    const column = th.dataset.column;

    th.classList.remove("sort-asc", "sort-desc");
    if (column === activeColumn) {
      th.classList.add(direction === "asc" ? "sort-asc" : "sort-desc");
    }
  });
};

// initialize click handlers on table headers
const initSortControls = (
  headers,
  initialColumn = "name",
  initialDirection = "asc",
) => {
  let currentColumn = initialColumn;
  let currentDirection = initialDirection;

  headers.forEach((th) => {
    const column = th.dataset.column;

    th.style.cursor = "pointer";

    th.addEventListener("click", () => {
      // compute new direction
      currentDirection = getNextDirection(
        column,
        currentColumn,
        currentDirection,
      );
      currentColumn = column;

      // update UI + state
      updateSortIndicators(headers, currentColumn, currentDirection);
      applySort(currentColumn, currentDirection);
    });
  });

  // initial arrow state
  updateSortIndicators(headers, currentColumn, currentDirection);
};

export { getNextDirection, updateSortIndicators, initSortControls };
