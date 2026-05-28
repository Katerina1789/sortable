const parseWeight = (weightArr) => {
  if (!weightArr) return null

  const metric = weightArr[1]
  if (!metric) return null

  const value = parseFloat(metric.replace(/,/g, ''))
  if (isNaN(value) || value === 0) return null

  if (metric.includes('tons')) return value * 1000
  if (metric.includes('kg')) return value

  return null
}

const parseHeight = (heightArr) => {
  if (!heightArr) return null

  const metric = heightArr[1]
  if (!metric) return null

  const value = parseFloat(metric.replace(/,/g, ''))
  if (isNaN(value) || value === 0) return null

  if (metric.includes('meters')) return Math.round(value * 100)
  if (metric.includes('cm')) return value

  return null
}

export { parseWeight, parseHeight }
