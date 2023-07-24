import React from 'react'
import SelectCharacter from './SelectCharacter/SelectCharacter.jsx'
import SelectedFilters from './SelectedFilters/SelectedFilters.jsx'
import FilterCheckboxes from './FilterCheckboxes/FilterCheckboxes.jsx'

import styles from './Filters.module.scss'

function Filters(props) {
  return (
    <div className={styles.filtersContainer}>
      <SelectCharacter />
      <SelectedFilters />
      <FilterCheckboxes />
    </div>
  )
}

export default React.memo(Filters)
