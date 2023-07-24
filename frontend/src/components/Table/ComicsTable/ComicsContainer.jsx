import React from 'react'
import OneComic from './OneComic'
import styles from './ComicsContainer.module.scss'

function ComicsContainer({ comics, nameIndex, uniqueComicsNames }) {
  const maxComicsPerMonth = uniqueComicsNames[nameIndex].maxComicsPerMonth
  const containerHeight = maxComicsPerMonth > 0 ? 166 * maxComicsPerMonth : 166

  const colors = {
    isReprint: '#2ecc71',
    notMarvel: '#e74c3c',
    default: '#3498db',
  };

  return (
    <div
      className={styles.comics}
      style={{
        height: containerHeight,
      }}
    >
      {comics.map(comic => (
        <div key={comic._id}>
          <div className={styles.comicsContainerImg}>
            <OneComic comic={comic} />
          </div>
          <div
            className={styles.comicsTitle}
            style={{
              backgroundColor:
                (comic.reprints && colors.isReprint) ||
                (comic.notMarvel && colors.notMarvel) ||
                colors.default,
            }}
          >
            {comic.title.slice(comic.title.search(/ Vol /))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ComicsContainer
