import React from 'react'
import styles from './Months.module.scss'

function Months({ uniqueMonths }) {
  return (
    <div className={styles.months}>
      {uniqueMonths.length
        ? uniqueMonths.map(month => {
            let newMonth = String(month).split('')
            newMonth.splice(4, 0, '.').join('')

            return <div className={styles.month}>{newMonth}</div>
          })
        : null}
    </div>
  )
}

export default Months
