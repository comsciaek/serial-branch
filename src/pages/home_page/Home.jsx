import React, { useState } from 'react'
import { Dropdown_cp, Table_cp, Input_cp, TextArea_cp } from '../../components/Components'

import MockDataDropdown from '../../components/Dropdown_cp/Mock.json'
import MockDataTable from '../../components/Table_cp/MockTable.json'

const Home = () => {
    const [filteredData, setFilteredData] = useState(MockDataTable);

    const handleInput = (inputValue) => {
        const filtered = MockDataTable.filter(item =>
            Object.values(item).some(value =>
                value && value.toString().toLowerCase().includes(inputValue.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

  return (
    <div className='place-items-center text-center h-full bg-blue-100 xs:py-7 lg:py-12'>
        <div className='row xs:mx-5 lg:mx-44 xs:my-6 lg:my-11 lg:mt-6 animation a0 bg-blue-200 border-2 border-blue-400 rounded-xl shadow-xl'>
            <div className='col-12 col-lg-6 xs:border-0 lg:border-r-2 border-blue-400 py-2'>
                <p className=''> 1. เลือก Serial </p>
                <div className='w-full px-3'>
                    <Input_cp placeholder={"กรุณาระบุ Serial"} />
                </div>
            </div>
            <div className='col-12 col-lg-6 py-2'>
                <p className=''> 2. ปัญหาที่พบ </p>
                <div className='w-full px-3'>
                    <Dropdown_cp mode={"multiple"} data={MockDataDropdown} placeholder={"กรุณาเลือกปัญหาที่พบ"} />
                </div>
                <div className='w-full px-3 my-3'>
                    <TextArea_cp placeholder={"หมายเหตุ"} resize={"none"} />
                </div>
            </div>
        </div>
        <div className='row xs:mx-5 lg:mx-44 my-2 bg-blue-200 border-2 border-blue-400 rounded-xl shadow-xl animation a1'>
            <div>
                Detail
            </div>
        </div>



        {/* <Input_cp placeholder={"รหัส / รหัสสินค้า / ชื่อสินค้า / อื่นๆ"} inputValue={handleInput} /> */}
        {/* <div className='row xs:mx-5 lg:mx-44 animation a4'>
            <Table_cp data={filteredData.map(item => ({ ...item, key: item.id }))} />
        </div> */}

    </div>
  )
}

export default Home