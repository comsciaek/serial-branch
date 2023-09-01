import React from 'react'
import { Select } from 'antd'

const Dropdown_cp = (props) => {

  const handleChange = (value) => {
    console.log("ข้อมูลที่เลือก", value)
  }


  return (
    <Select  className={`w-full rounded-md`} mode={props.mode} allowClear options={props.data.map(item => ({ value: item.title, label: item.title }))} onChange={handleChange} placeholder={props.placeholder} />
  )
}

export default Dropdown_cp