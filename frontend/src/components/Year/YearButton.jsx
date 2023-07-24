import React from 'react'
import styles from './Year.module.scss'

const YearButton = ({ onClick, disabled, children }) => (
  <button onClick={onClick} className={disabled ? styles.disabledButton : ''}>
    {children}
  </button>
)


export default YearButton
