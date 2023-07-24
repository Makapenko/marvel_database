import React from 'react'

function UpdateNotMarvelButton({ comicName }) {
  const updateNotMarvel = async () => {
    try {
      const response = await fetch('http://localhost:3001/updateNotMarvel', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titleStart: comicName }),
      })

      if (response.ok) {
        console.log('NotMarvel updated successfully')
      } else {
        console.error('Error updating NotMarvel')
      }
    } catch (error) {
      console.error('Error updating NotMarvel:', error)
    }
  }

  return <button onClick={updateNotMarvel}>Update NotMarvel</button>
}

export default UpdateNotMarvelButton
