# Sortable

[![JavaScript](https://img.shields.io/badge/JavaScript-Code-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-Testing-F28C28?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-FF0000?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![Zone01](https://img.shields.io/badge/Zone01-Athens-1E00FF?style=for-the-badge&logo=codeforces&logoColor=white)](https://zone01.gr)

A small JavaScript single-page app that fetches and displays a heroes dataset with search, sort, pagination, detail view and URL sync as part of the Zone 01 Athens' curriculum.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Repository Structure](#repository-structure)
- [Requirements](#requirements)
- [How to Run](#how-to-run)
- [Testing](#testing)
- [Documentation](#documentation)
- [License](#license)

## Description

`Sortable` loads a public heroes JSON, normalizes records for consistent searching and sorting and provides an accessible table with a details panel.

## Features

- Fetch and normalize remote heroes JSON
- Fielded search with operators and fuzzy matching
- Sort by any column (strings or numbers) with missing values last
- Pagination with selectable page size (including `all`)
- Detail panel with full JSON dump
- URL sync for shareable views and navigation

## Repository Structure

```text
sortable/
├── audit/
├── docs/
├── script/
├── tests/
├── .gitignore
├── CONTRIBUTING.md
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── styles.css
```

## Requirements

- Modern browser for the UI
- Node.js (for running tests)

## How to Run

Open `index.html` in a browser or serve the project with a static server.

Example using `npx`:

```bash
npx http-server . -c-1
# then open http://localhost:8080
```

## Testing

Run unit tests with Node's built-in test runner:

```bash
node --test
```

Tests are located in the `tests/` directory.

## Documentation

- [`PRD`](docs/PRD.md) explains the project requirements.
- [`Architecture`](docs/architecture.md) explains the code flow.
- [`Audit Guide`](audit/audit_guide.md) contains the manual audit cases.

## Team

- Katerina Kasdanastasi
- Vasiliki Xanthioti
- Dimitra Krystallenia Kolovou

## License

[MIT License](./LICENSE)
