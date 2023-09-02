import React from 'react'
import { Input } from 'antd'

const TextArea_cp = (props) => {
    const { TextArea } = Input;

    const handleChang = (e) => {
      props.ValueArea(e.target.value)
    }

  return (
    <TextArea showCount maxLength={200} placeholder={props.placeholder} style={{ height: 60, resize: props.resize }} disabled={props.disabled} onChange={handleChang} value={props.value} />
  )
}

export default TextArea_cp