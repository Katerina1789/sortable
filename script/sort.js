import { parseWeight, parseHeight } from './utils.js'

const getValue = (hero, column) => {
  switch (column) {
    case 'name':      return hero.name
    case 'fullName':  return hero.biography.fullName
    case 'race':      return hero.appearance.race
    case 'gender':    return hero.appearance.gender
    case 'placeOfBirth': return hero.biography.placeOfBirth
    case 'alignment': return hero.biography.alignment
    case 'height':    return parseHeight(hero.appearance.height)
    case 'weight':    return parseWeight(hero.appearance.weight)
    case 'intelligence':
    case 'strength':
    case 'speed':
    case 'durability':
    case 'power':
    case 'combat':    return hero.powerstats[column]
    default:          return null
  }
}

const isMissing = (value) => value === null || value === undefined || value === '-' || value === ''

const sortHeroes = (heroes, column, direction) => {
  const dir = direction === 'desc' ? -1 : 1

  return [...heroes].sort((a, b) => {
    const aVal = getValue(a, column)
    const bVal = getValue(b, column)

    const aMissing = isMissing(aVal)
    const bMissing = isMissing(bVal)

    if (aMissing && bMissing) return 0
    if (aMissing) return 1
    if (bMissing) return -1

    if (typeof aVal === 'string') return dir * aVal.localeCompare(bVal)
    return dir * (aVal - bVal)
  })
}

export { sortHeroes, getValue, isMissing }
