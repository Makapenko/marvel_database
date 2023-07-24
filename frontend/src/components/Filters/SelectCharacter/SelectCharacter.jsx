import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterComics } from '../../../redux/reducers/comicsReducer'
import styles from './SelectCharacter.module.scss'

const SelectCharacter = () => {
  const dispatch = useDispatch()
  // Получение отфильтрованного списка комиксов из состояния
  const comicsListFiltered = useSelector(state => state.comicsReducer.comicsListFiltered)
  const selectedFilters = useSelector(state => state.comicsReducer.selectedFilters)
 
  // Обработчик изменения выбора персонажа
  const handleSelect = e => {
    const value = e.target.value
    if (!selectedFilters.includes(value)) {
      dispatch(filterComics([...selectedFilters, value]))
    }
  }

  // Функция, получающая список персонажей, отсортированный по количеству появлений
  const getSortedAppearances = comicsListFiltered => {
    const appearances = comicsListFiltered.reduce((acc, comic) => {
      const allAppearances = [...comic.appearances, ...comic.minorAppearances]
      allAppearances.forEach(appear => {
        if (acc[appear]) {
          acc[appear]++
        } else {
          acc[appear] = 1
        }
      })
      return acc
    }, {})

    return Object.entries(appearances)
  }

  // Отсортированный список персонажей с использованием useMemo для оптимизации
  const sortedAppearances = useMemo(
    () => getSortedAppearances(comicsListFiltered),
    [comicsListFiltered]
  ).sort(([_, countA], [__, countB]) => countB - countA)

  // Функция для форматирования текста опций выбора персонажа
  const selectOptionText = (character, count) => {
    return `${character}, ${count}`
  }

  return (
    <select className={styles.FilterAppear} onChange={handleSelect} value="">
      <option value="" disabled>
        Choise Character
      </option>
      {sortedAppearances.map(arr => (
        <option key={arr[0]} value={arr[0]}>
          {selectOptionText(arr[0], arr[1])}
        </option>
      ))}
    </select>
  )
}

export default SelectCharacter
