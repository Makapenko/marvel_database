import React from 'react'

const Checkbox = ({ id, checked, onChange, label }) => (
  <div>
    <input type="checkbox" id={id} checked={checked} onChange={onChange} />
    <label htmlFor={id}>{label}</label>
  </div>
)

export default Checkbox
