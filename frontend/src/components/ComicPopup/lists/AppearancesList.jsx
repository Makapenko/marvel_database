import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterComics } from '../../../redux/reducers/comicsReducer'
import styles from '../ComicPopup.module.scss'

function AppearancesList({ appearances, handleClick }) {
  const dispatch = useDispatch()
  const selectedFilters = useSelector(state => state.comicsReducer.selectedFilters)
  const appearancesHandler = useCallback(
    appearance => {
      dispatch(filterComics([...selectedFilters, appearance]))
      handleClick()
    },
    [dispatch, handleClick, selectedFilters]
  )

  return (
    <div className={styles.appearancesBlock}>
      {appearances.map(el => (
        <button
          key={el}
          className={styles.appearances}
          onClick={() => appearancesHandler(el)}
        >
          {el}
        </button>
      ))}
    </div>
  )
}

export default AppearancesList
