import React, { useState, useCallback, memo } from 'react'
import { useDispatch } from 'react-redux'
import { fetchYear, clearYears } from '../../redux/reducers/comicsReducer'
import styles from './Year.module.scss'
import YearSelector from './YearSelector.jsx'
import YearButton from './YearButton.jsx'
import ClearButton from './ClearButton.jsx'
import { MIN_YEAR, MAX_YEAR } from './constants'

// Функция форматирования диапазона годов
const formatYearRange = yearRange =>
  yearRange.length > 1
    ? `${yearRange[0]} - ${yearRange[yearRange.length - 1]}`
    : yearRange[0]

function Year() {
  const dispatch = useDispatch()
  const [yearRange, setYearRange] = useState([])

  // Обработчик выбора года
  const handleSelect = useCallback(
    year => {
      setYearRange([year])
      dispatch(fetchYear(year))
    },
    [dispatch]
  )

  // Изменение выбранного года
  const changeYear = useCallback(
    offset => {
      const newYear =
        offset > 0
          ? parseInt(yearRange[yearRange.length - 1]) + offset
          : parseInt(yearRange[0]) + offset

      if (newYear >= MIN_YEAR && newYear <= MAX_YEAR) {
        setYearRange([...yearRange, newYear].sort((a, b) => a - b))
        dispatch(fetchYear(newYear))
      }
    },
    [dispatch, yearRange]
  )

  // Очистка выбранных годов
  const clearYearsHandlers = useCallback(() => {
    setYearRange([])
    dispatch(clearYears())
  }, [dispatch])

  return (
    <div className={styles.yearContainer}>
      {yearRange.length > 0 ? (
        <>
          <YearButton
            onClick={() => changeYear(-1)}
            disabled={parseInt(yearRange[0]) <= MIN_YEAR}
          >
            &lt;
          </YearButton>
          <span>{formatYearRange(yearRange)}</span>
          <YearButton
            onClick={() => changeYear(1)}
            disabled={parseInt(yearRange[yearRange.length - 1]) >= MAX_YEAR}
          >
            &gt;
          </YearButton>
          <ClearButton onClick={clearYearsHandlers} />
        </>
      ) : (
        <YearSelector onSelect={handleSelect} />
      )}
    </div>
  )
}

export default memo(Year)
