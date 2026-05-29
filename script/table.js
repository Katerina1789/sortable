// table.js - build table structure and render hero rows

import { updateState } from "./state.js";

// column definitions for table header
export const TABLE_COLUMNS = [
  { key: "icon", label: "Icon" },
  { key: "name", label: "Name" },
  { key: "fullName", label: "Full Name" },
  { key: "intelligence", label: "Intelligence" },
  { key: "strength", label: "Strength" },
  { key: "speed", label: "Speed" },
  { key: "durability", label: "Durability" },
  { key: "power", label: "Power" },
  { key: "combat", label: "Combat" },
  { key: "race", label: "Race" },
  { key: "gender", label: "Gender" },
  { key: "height", label: "Height" },
  { key: "weight", label: "Weight" },
  { key: "placeOfBirth", label: "Place Of Birth" },
  { key: "alignment", label: "Alignment" },
];

// fallback display helper
const displayValue = (value) => value ?? "Unknown";

// create table skeleton (header + empty body)
export const createTable = (container) => {
  const status = document.createElement("div");
  status.className = "table-status";

  const table = document.createElement("table");

  // header row
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  TABLE_COLUMNS.forEach((column) => {
    const th = document.createElement("th");
    th.textContent = column.label;
    th.scope = "col";
    th.dataset.column = column.key;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  table.appendChild(document.createElement("tbody"));

  container.innerHTML = "";
  container.append(status, table);

  return { table, status };
};

export const renderTableBody = (table, heroes, selectedHeroId) => {
  const tbody = table.querySelector("tbody");
  tbody.replaceChildren();

  // empty state
  if (!heroes.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = TABLE_COLUMNS.length;
    cell.textContent = "No heroes to display.";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  const rows = document.createDocumentFragment();

  heroes.forEach((hero) => {
    const row = document.createElement("tr");
    row.dataset.heroId = hero.id;
    row.tabIndex = 0;

    // highlight selected row
    row.classList.toggle("selected", hero.id === selectedHeroId);
    row.setAttribute("aria-selected", hero.id === selectedHeroId ? "true" : "false");

    // row selection handler
    const selectHero = () => updateState({ selectedHeroId: hero.id });
    row.addEventListener("click", selectHero);
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectHero();
      }
    });

    // icon cell
    const iconCell = document.createElement("td");
    if (hero.display.icon) {
      const img = document.createElement("img");
      img.src = hero.display.icon;
      img.alt = hero.display.name;
      img.width = 40;
      img.height = 40;
      img.loading = "lazy";
      iconCell.appendChild(img);
    } else {
      iconCell.textContent = "Unknown";
    }
    row.appendChild(iconCell);

    // helper to add a text cell
    const addCell = (value) => {
      const td = document.createElement("td");
      td.textContent = displayValue(value);
      row.appendChild(td);
    };

    // text cells
    addCell(hero.display.name);
    addCell(hero.display.fullName);
    addCell(hero.stats.intelligence);
    addCell(hero.stats.strength);
    addCell(hero.stats.speed);
    addCell(hero.stats.durability);
    addCell(hero.stats.power);
    addCell(hero.stats.combat);
    addCell(hero.display.race);
    addCell(hero.display.gender);
    addCell(hero.display.height);
    addCell(hero.display.weight);
    addCell(hero.display.placeOfBirth);
    addCell(hero.display.alignment);

    rows.appendChild(row);
  });

  tbody.appendChild(rows);
};
