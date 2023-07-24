import React from 'react'
import { MIN_YEAR, MAX_YEAR } from './constants'

// Генерация списка годов
const generateYearsList = (minYear, maxYear) =>
  Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i)

const yearsList = generateYearsList(MIN_YEAR, MAX_YEAR)

const YearSelector = ({ onSelect }) => {
  const handleChange = e => {
    const year = e.target.value
    onSelect(year)
  }
  return (
    <select onChange={handleChange}>
      <option value="">Choise Year</option>
      {yearsList.map(year => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  )
}

export default YearSelector
