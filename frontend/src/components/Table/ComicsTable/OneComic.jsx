import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LazyLoad from 'react-lazyload'
import ComicPopup from '../../ComicPopup/ComicPopup.jsx'

function OneComic({ comic }) {
  const dispatch = useDispatch()
  const comicId = comic.id
  const comicReadArray = useSelector(state => state.userReducer.readComics)
  const [imgSrc, setImgSrc] = useState(
    comic.previewUrl && comic.previewUrl !== ''
      ? comic.previewUrl
      : comic.coverUrl && comic.coverUrl !== ''
      ? comic.coverUrl
      : './A.jpg'
  )
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }



  return (
    <>
      <LazyLoad height={150} offset={100} once>
        <img
          className="comicsImg"
          src={imgSrc}
          alt={comic.title}
          onError={() => setImgSrc('./A.jpg')}
          onClick={handleClick}
        />
        <div>{comicId}</div>
      </LazyLoad>
      <ComicPopup comic={comic} isOpen={isOpen} handleClick={handleClick} />
    </>
  )
}

export default OneComic
