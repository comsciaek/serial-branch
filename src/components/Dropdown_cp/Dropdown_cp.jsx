import React from 'react'
import { Select } from 'antd'

const Dropdown_cp = (props) => {

  const handleChange = (value) => {
    props.VulueDrop(value)
  }


  return (
    <Select  className={`w-full rounded-md`} mode={props.mode} allowClear options={props.data.map(item => ({ value: item.title, label: item.title }))} onChange={handleChange} placeholder={props.placeholder} value={props.value} />
  )
}

export default Dropdown_cp