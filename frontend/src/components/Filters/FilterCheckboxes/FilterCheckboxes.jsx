import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggleReprintsFilter,
  toggleNotMarvelFilter,
} from '../../../redux/reducers/comicsReducer'
import Checkbox from './Checkbox.jsx'

const checkboxActions = {
  showReprints: toggleReprintsFilter,
  showNotMarvel: toggleNotMarvelFilter,
}

const FilterCheckboxes = () => {
  const dispatch = useDispatch()
  const showReprints = useSelector(state => state.comicsReducer.showReprints)
  const showNotMarvel = useSelector(state => state.comicsReducer.showNotMarvel)

  const handleCheckboxChange = useCallback(
    e => {
      const { id, checked } = e.target

      if (checkboxActions[id]) {
        dispatch(checkboxActions[id](checked))
      }
    },
    [dispatch]
  )

  return (
    <>
      <Checkbox
        id="showReprints"
        checked={showReprints}
        onChange={handleCheckboxChange}
        label="Show Reprints"
      />
      <Checkbox
        id="showNotMarvel"
        checked={showNotMarvel}
        onChange={handleCheckboxChange}
        label="Show Not Marvel"
      />
    </>
  )
}

export default FilterCheckboxes
