import React, { useState, useCallback } from 'react'
import styles from './ComicPopup.module.scss'
import AppearancesList from './lists/AppearancesList'
import PropertiesList from './lists/PropertiesList'
import SectionsList from './lists/SectionsList'
import CloseIcon from './icons/CloseIcon'
import ArrowIcon from './icons/ArrowIcon'
import { comicProperties } from './comicProperties'

function ComicPopup({ comic, isOpen, handleClick }) {
  const hasProperties = () =>
    comicProperties.some(([_, prop]) => comic[prop] && comic[prop].length > 0)

  const [imgSrc, setImgSrc] = useState(
    comic.coverUrl && !!comic.coverUrl ? comic.coverUrl : './A.jpg'
  )

  const onError = useCallback(() => {
    setImgSrc('./A.jpg')
  }, [])

  const [showProperties, setShowProperties] = useState(false)

  const toggleProperties = () => {
    setShowProperties(!showProperties)
  }

  if (!isOpen) return null

  return (
    <div className={styles.popup}>
      <div className={styles.popupContentWrapper}>
        <div className={styles.popupContent}>
          <img
            className={styles.popupCover}
            src={imgSrc}
            alt={comic.title}
            onError={onError}
          />

          <div className={styles.popupInfo}>
            <h2>{comic.title}</h2>
            <a
              href={`https://marvel.fandom.com/wiki/${comic.title}`}
              target="_blank"
              rel="noreferrer"
            >
              Wiki
            </a>

            <SectionsList sections={comic.sections} />

            {hasProperties() && (
              <>
                <button
                  onClick={toggleProperties}
                  className={styles.togglePropertiesButton}
                >
                  <ArrowIcon isUp={showProperties} />
                  {showProperties ? 'Hide Properties' : 'Show Properties'}
                </button>

                {showProperties && (
                  <PropertiesList
                    comicProperties={comicProperties}
                    comic={comic}
                  />
                )}
              </>
            )}

            {comic.appearances?.length ? (
              <div>
                <b>Appearances:</b>
                <AppearancesList
                  appearances={comic.appearances}
                  handleClick={handleClick}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <button className={styles.popupClose} onClick={handleClick}>
        <CloseIcon />
      </button>
    </div>
  )
}

export default ComicPopup
