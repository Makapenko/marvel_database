import React from 'react'

function ArrowIcon({ isUp }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      transform={isUp ? 'rotate(180)' : ''}
    >
      <path d="M12 16l4-4h-8z"></path>
    </svg>
  )
}

export default ArrowIcon
