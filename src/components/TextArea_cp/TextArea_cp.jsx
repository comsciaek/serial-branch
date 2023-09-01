import React from 'react'
import { Input } from 'antd'

const TextArea_cp = (props) => {
    const { TextArea } = Input;

  return (
    <TextArea showCount maxLength={200} placeholder={props.placeholder} style={{ height: 120, resize: props.resize }} />
  )
}

export default TextArea_cp