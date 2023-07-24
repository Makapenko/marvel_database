import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styles from './Table.module.scss'

import {
  collectUniqueNamesAndMonths,
  calculateMaxComicsPerMonth,
  createComicsMatrixByMonthAndName,
} from './dataProcessing'

import Months from './Months/Months.jsx'
import ComicsTable from './ComicsTable/ComicsTable.jsx'
import ComicsNames from './ComicsNames/ComicsNames.jsx'

function Table(props) {
  const comList = useSelector(state => state.comicsReducer.comicsListFiltered)

  const { nonUniqueComicsNames, uniqueMonths } = useMemo(
    () => collectUniqueNamesAndMonths(comList),
    [comList]
  )

  const uniqueComicsNames = useMemo(() => {
    return calculateMaxComicsPerMonth(
      nonUniqueComicsNames,
      comList,
      uniqueMonths
    )
  }, [nonUniqueComicsNames, comList, uniqueMonths])

  const arrComicsPerMonth = useMemo(() => {
    return createComicsMatrixByMonthAndName(
      uniqueMonths,
      uniqueComicsNames,
      comList
    )
  }, [uniqueMonths, uniqueComicsNames, comList])

  return (
    <>
      <Months uniqueMonths={uniqueMonths} />
      <div className={styles.namesAndComics}>
        <ComicsNames uniqueComicsNames={uniqueComicsNames} />
        <ComicsTable
          arrComicsPerMonth={arrComicsPerMonth}
          uniqueComicsNames={uniqueComicsNames}
        />
      </div>
    </>
  )
}

export default Table
