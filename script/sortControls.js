const getNextDirection = (clickedColumn, currentColumn, currentDirection) => {
  if (clickedColumn !== currentColumn) return 'asc'
  return currentDirection === 'asc' ? 'desc' : 'asc'
}

const updateSortIndicators = (headers, activeColumn, direction) => {
  headers.forEach((th) => {
    const column = th.dataset.column
    th.classList.remove('sort-asc', 'sort-desc')
    if (column === activeColumn) {
      th.classList.add(direction === 'asc' ? 'sort-asc' : 'sort-desc')
    }
  })
}

const initSortControls = (headers, onSortChange, initialColumn = 'name', initialDirection = 'asc') => {
  let currentColumn = initialColumn
  let currentDirection = initialDirection

  headers.forEach((th) => {
    th.style.cursor = 'pointer'
    th.addEventListener('click', () => {
      const clicked = th.dataset.column
      currentDirection = getNextDirection(clicked, currentColumn, currentDirection)
      currentColumn = clicked
      updateSortIndicators(headers, currentColumn, currentDirection)
      onSortChange(currentColumn, currentDirection)
    })
  })
}

export { getNextDirection, updateSortIndicators, initSortControls }
