import React from "react";
import { Select } from "antd";

const Dropdown_cp = (props) => {
  const handleChange = (value) => {
    // const jsonValue = JSON.stringify(value);
    props.VulueDrop(value);
    console.log(value)
  };

  return (
    <Select
      className={`rounded-md ${props.style}`}
      mode={props.mode}
      allowClear
      status={`${ props.value == "" ? "error" : ""}`}
      onChange={handleChange}
      placeholder={props.placeholder}
      value={props.value}
      options={props.data.map((item) => ({ value: item.value, label: item.value }))}
    />
  );
};

export default Dropdown_cp;
