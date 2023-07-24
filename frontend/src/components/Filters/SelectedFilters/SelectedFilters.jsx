import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterComics } from '../../../redux/reducers/comicsReducer'
import CloseIcon from './CloseIcon'
import styles from './SelectedFilters.module.scss'

function SelectedFilters(props) {
  const dispatch = useDispatch()
  const  selectedFilters  = useSelector(state => state.comicsReducer.selectedFilters)

  const removeFilter = useCallback(
    filterToRemove => {
      const newFilters = selectedFilters.filter(
        filter => filter !== filterToRemove
      )
      dispatch(filterComics(newFilters))
    },
    [dispatch, selectedFilters]
  )

  return (
    <div className={styles.SelectedFilters}>
      {selectedFilters.map(filter => (
        <div key={filter} className={styles.FilterItem}>
          {filter}
          <CloseIcon
            aria-label="Remove filter"
            className={styles.closeIcon}
            onClick={() => removeFilter(filter)}
          />
        </div>
      ))}
    </div>
  )
}

export default SelectedFilters
