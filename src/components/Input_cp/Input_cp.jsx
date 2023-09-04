import React from 'react'
import { Input } from 'antd'

const Input_cp = (props) => {
    // const { Search } = Input;
    
    // const onSearch = (e) => {
    //   console.log(e.target.value)
    // }

    const handleChange = (e) => {
        props.inputValue(e.target.value)
    }

  return (
    <>
      {/* { props.type == "Search" && <Search placeholder={props.placeholder} className='rounded-lg font-semibold p-1' onChange={onSearch} allowClear value={props.value} /> } */}
      <Input placeholder={props.placeholder} className='rounded-lg font-semibold py-1' onChange={handleChange} allowClear value={props.value} disabled={props.disabled} onKeyDown={props.KeyDown} autoFocus />
      {/* { props.type == "Input" && <Input placeholder={props.placeholder} className='rounded-lg font-semibold p-1' onChange={handleChange} allowClear value={props.value} disabled={props.disabled} onKeyDown={props.KeyDown} /> } */}
    </>

  )
}

export default Input_cp