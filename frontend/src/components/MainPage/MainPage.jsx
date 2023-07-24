import React from 'react'
import styles from './MainPage.module.scss'

import AuthComponent from '../AuthComponent/AuthComponent'
import Year from '../Year/Year'
import Filters from '../Filters/Filters'
import Table from '../Table/Table'

function MainPage(props) {
  return (
    <div className={styles.mainPageContainer}>
      <AuthComponent />
      <Year />
      <Filters />
      <Table />
    </div>
  )
}

export default MainPage
