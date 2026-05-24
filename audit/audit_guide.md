# Audit Guide - Sortable

Manual testing checklist for the Sortable project.

## Functional Tests

### Display & Data
- [ ] Does the data appear in a `<table>` element?
- [ ] Does the table present only the required data (icon, name, full name, powerstats, race, gender, height, weight, place of birth, alignment)?
- [ ] Does the project use fetch()?
- [ ] Is the project free of any frameworks or libraries (React, Vue, Svelte, etc.)?

### Pagination
- [ ] Has client-side pagination been implemented with different pages showing different information?
- [ ] Does the table initially display 20 results?
- [ ] Can you change the page size to one of 10, 20, 50, 100, or all?

### Sorting
- [ ] Are all columns of the table clickable in order to sort the results?
- [ ] Are results initially sorted by the name column in ascending order?
- [ ] Click once to sort by weight: is the table sorted numerically in ascending order? (check that 75 kg appears before 100 kg)
- [ ] Click twice to sort by place of birth: are results sorted alphabetically in descending order?
- [ ] Click several times on a column: does the sort order toggle between ascending and descending?
- [ ] Are missing values always shown last (regardless of sort direction)?

### Search
- [ ] Write "Cat" in the search field: do results change on every keystroke (interactive)?
- [ ] Does "Catwoman" appear in the filtered results?
- [ ] Is search case-insensitive?

## Bonus Features

- [ ] Can you search fields apart from name (e.g., race, alignment)?
- [ ] Do search operators work?
  - include / exclude (for strings)
  - equal / not equal / greater than / less than (for numbers)
  - fuzzy (for strings)
- [ ] If you click on a hero, does the site display the details and a large image?
- [ ] Does the URL change when you make a search?
- [ ] After making a search and the URL changes, if you copy and paste it to a different tab, are the same results displayed?
- [ ] Does the project run quickly and effectively?
- [ ] Does the code obey good practices (clean, readable, minimal comments, small focused functions)?
