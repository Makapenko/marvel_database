import React from 'react'
import UpdateNotMarvelButton from './UpdateNotMarvelButton.jsx'
import styles from './ComicsNames.module.scss'

function ComicsNames({ uniqueComicsNames }) {
  return (
    <div className={styles.comicsNames}>
      {uniqueComicsNames.length ? (
        uniqueComicsNames.map((name, i) => (
          <div
            key={i}
            className={styles.comicName}
            style={{ height: name.maxComicsPerMonth * 166 }}
          >
            {name.name}
            <UpdateNotMarvelButton comicName={name.name} />
          </div>
        ))
      ) : (
        <p>Список названий комиксов пуст</p>
      )}
    </div>
  )
}

export default ComicsNames
