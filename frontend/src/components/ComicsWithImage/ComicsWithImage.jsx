import React, { useState, useEffect } from 'react';
import './style.css';
function ComicsWithImage() {
  const [comics, setComics] = useState([]);
  const [showComics, setShowComics] = useState(false);

  useEffect(() => {
    if (showComics) {
      fetchComics();
    }
  }, [showComics]);

  const fetchComics = async () => {
    const response = await fetch('http://localhost:3001/showComicsWitchImage');
    const data = await response.json();
    setComics(data);
  };

  const handleDelete = async (comicId) => {
    await fetch(`http://localhost:3001/deleteCoverUrl/${comicId}`, {
      method: 'DELETE',
    });
    setComics(comics.filter((comic) => comic._id !== comicId));
  };

  const handleClick = () => {
    setShowComics(!showComics);
  };

  return (
    <div>
      <button onClick={handleClick}>
        {showComics ? 'Hide Comics' : 'Show Comics'}
      </button>
      {showComics && (
        <div className='comicsList'>
          {comics.map((comic, index) => (
            <div className='comic' key={comic._id}>
              <img className='comic' src={comic.coverUrl} alt={comic.title} />
              <p>{comic.title}</p>
              <button onClick={() => handleDelete(comic._id)}>
                Delete Cover Url
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComicsWithImage;
