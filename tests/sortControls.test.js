import { getNextDirection } from '../script/sortControls.js'

describe('getNextDirection', () => {
  test('clicking a new column always returns asc', () => {
    expect(getNextDirection('weight', 'name', 'asc')).toBe('asc')
    expect(getNextDirection('weight', 'name', 'desc')).toBe('asc')
  })

  test('clicking the same column toggles from asc to desc', () => {
    expect(getNextDirection('name', 'name', 'asc')).toBe('desc')
  })

  test('clicking the same column toggles from desc to asc', () => {
    expect(getNextDirection('name', 'name', 'desc')).toBe('asc')
  })
})
