import React from 'react'
import { Input } from 'antd'

const Input_cp = (props) => {

    const handleChange = (value) => {
        props.inputValue(value.target.value)
    }

  return (
    <Input placeholder={props.placeholder} className='rounded-lg' onChange={handleChange} allowClear value={props.value} disabled={props.disabled} />
  )
}

export default Input_cp