import React from 'react'
import styles from './ComicsTable.module.scss'
import ComicsContainer from './ComicsContainer'

function ComicsTable({ arrComicsPerMonth, uniqueComicsNames }) {
  return (
    <div className={styles.allComics}>
      {arrComicsPerMonth.length ? (
        arrComicsPerMonth.map((arr, monthIndex) => (
          <div className={styles.comicsPerMonth} key={monthIndex}>
            {arr.map((comics, nameIndex) => {
              return comics && comics.length > 0 ? (
                <ComicsContainer
                  comics={comics}
                  nameIndex={nameIndex}
                  uniqueComicsNames={uniqueComicsNames}
                />
              ) : (
                <div
                  className={styles.comics}
                  style={{
                    height:
                      uniqueComicsNames[nameIndex].maxComicsPerMonth > 0
                        ? 166 * uniqueComicsNames[nameIndex].maxComicsPerMonth
                        : 166,
                  }}
                ></div>
              )
            })}
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  )
}

export default ComicsTable
