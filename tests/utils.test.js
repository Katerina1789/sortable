import { parseWeight, parseHeight } from '../script/utils.js'

describe('parseWeight', () => {
  test('returns kg value from standard format', () => {
    expect(parseWeight(['980 lb', '441 kg'])).toBe(441)
  })

  test('converts tons to kg', () => {
    expect(parseWeight(['40000 lb', '18 tons'])).toBe(18000)
  })

  test('handles tons with comma separator', () => {
    expect(parseWeight(['200000000 lb', '90,000 tons'])).toBe(90000000)
  })

  test('returns null for zero weight (unknown)', () => {
    expect(parseWeight(['0 lb', '0 kg'])).toBeNull()
  })

  test('returns null for null input', () => {
    expect(parseWeight(null)).toBeNull()
  })
})

describe('parseHeight', () => {
  test('returns cm value from standard format', () => {
    expect(parseHeight(["6'8", '203 cm'])).toBe(203)
  })

  test('converts meters to cm', () => {
    expect(parseHeight(['200', '61.0 meters'])).toBe(6100)
  })

  test('returns null for invalid data', () => {
    expect(parseHeight(['Shaker Heights, Ohio'])).toBeNull()
  })

  test('returns null for zero height (unknown)', () => {
    expect(parseHeight(["0'0", '0 cm'])).toBeNull()
  })

  test('returns null for null input', () => {
    expect(parseHeight(null)).toBeNull()
  })
})
