import React from 'react'
import { Input } from 'antd'

const Input_cp = (props) => {

    const handleChange = (value) => {
        props.inputValue(value.target.value)
    }

  return (
    <Input placeholder={props.placeholder} className='shadow-lg rounded-lg border-2 border-blue-400' onChange={handleChange} allowClear />
  )
}

export default Input_cp