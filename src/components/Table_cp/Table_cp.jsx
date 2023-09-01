import React from 'react'
import { Table } from 'antd'

const Table_cp = (props) => {
    const { data } = props;
    const columns = [
        { title: 'ID', dataIndex: 'id' }, 
        { title: 'Title', dataIndex: 'title' }, 
        { title: 'Age', dataIndex: 'age' }
    ]


  return (
    <Table columns={columns} dataSource={data} pagination={10} className='px-0 shadow-lg bg-gray-100 rounded-lg my-2 border-2 border-blue-400' />
  )
}

export default Table_cp