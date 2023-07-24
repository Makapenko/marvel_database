import React from 'react'
import styles from '../ComicPopup.module.scss'

function PropertiesList({ comicProperties, comic }) {
  return (
    <div className={styles.propertiesList}>
      {comicProperties.map(([label, prop]) =>
        comic[prop].length ? (
          <div key={`${label}-${prop}`}>
            <b>{label}:</b> {comic[prop].join(', ')}
          </div>
        ) : null
      )}
    </div>
  )
}

export default PropertiesList
