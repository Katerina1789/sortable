// import state and selectors
import { getState, updateState, subscribeState } from './state.js';
import { getVisibleHeroes } from './selectors.js';

// TABLE_COLUMNS defines all table columns
const TABLE_COLUMNS = [
  { key: 'icon', label: 'Icon' },
  { key: 'name', label: 'Name' },
  { key: 'fullName', label: 'Full Name' },
  { key: 'intelligence', label: 'Intelligence' },
  { key: 'strength', label: 'Strength' },
  { key: 'speed', label: 'Speed' },
  { key: 'durability', label: 'Durability' },
  { key: 'power', label: 'Power' },
  { key: 'combat', label: 'Combat' },
  { key: 'race', label: 'Race' },
  { key: 'gender', label: 'Gender' },
  { key: 'height', label: 'Height' },
  { key: 'weight', label: 'Weight' },
  { key: 'placeOfBirth', label: 'Place Of Birth' },
  { key: 'alignment', label: 'Alignment' },
];

// createTable builds the table structure
export const createTable = (container) => {
  // creates the table element
  const table = document.createElement('table');

  // builds the header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  // loops through columns and creates header cells
  TABLE_COLUMNS.forEach((column) => {
    const th = document.createElement('th');
    th.textContent = column.label;
    th.dataset.column = column.key;

    // clicking a header sorts the table
    th.addEventListener('click', () => {
      const { sortColumn, sortDirection } = getState();
      const nextDirection =
        sortColumn === column.key && sortDirection === 'asc'
          ? 'desc'
          : 'asc';

      updateState({ sortColumn: column.key, sortDirection: nextDirection });
    });

    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // adds empty tbody
  table.appendChild(document.createElement('tbody'));

  // inserts table into container
  container.innerHTML = '';
  container.appendChild(table);

  return table;
};

// renderTableBody fills the table with hero rows
export const renderTableBody = (table) => {
  // gets visible heroes (filtered + sorted + paginated)
  const heroes = getVisibleHeroes();

  // finds tbody
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  // loops through heroes and builds rows
  heroes.forEach((hero) => {
    const row = document.createElement('tr');

    // clicking a row selects the hero
    row.addEventListener('click', () => {
      updateState({ selectedHeroId: hero.id });
    });

    // icon cell
    const iconCell = document.createElement('td');
    const img = document.createElement('img');
    img.src = hero.display.icon || '';
    img.alt = hero.display.name;
    img.width = 40;
    img.height = 40;
    iconCell.appendChild(img);
    row.appendChild(iconCell);

    // helper to add a cell
    const addCell = (value) => {
      const td = document.createElement('td');
      td.textContent = value ?? '';
      row.appendChild(td);
    };

    // display fields
    addCell(hero.display.name);
    addCell(hero.display.fullName);

    // stats fields
    addCell(hero.stats.intelligence);
    addCell(hero.stats.strength);
    addCell(hero.stats.speed);
    addCell(hero.stats.durability);
    addCell(hero.stats.power);
    addCell(hero.stats.combat);

    // appearance fields
    addCell(hero.display.race);
    addCell(hero.display.gender);
    addCell(hero.display.height);
    addCell(hero.display.weight);

    // biography fields
    addCell(hero.display.placeOfBirth);
    addCell(hero.display.alignment);

    tbody.appendChild(row);
  });
};

// subscribe to state changes and re-render table
export const initTable = () => {
  const container = document.getElementById('table-container');
  const table = createTable(container);

  // re-render body whenever state changes
  subscribeState(() => renderTableBody(table));

  // initial render
  renderTableBody(table);
};
