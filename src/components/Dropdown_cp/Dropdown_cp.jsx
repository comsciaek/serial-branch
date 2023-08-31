import React from 'react'

const Dropdown_cp = (props) => {
  return (
    <select name="branch" id="branch" className={`w-full h-7 rounded-md ${props.borderColor} ${props.borderSize}`}>
        <option value=""> 1 </option>
    </select>
  )
}

export default Dropdown_cp