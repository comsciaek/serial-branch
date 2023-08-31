import React from 'react'
import { Dropdown_cp } from '../../components/Components'

const Home = () => {
  return (
    <div className='place-items-center text-center h-screen bg-blue-100 xs:py-7 lg:py-12'>
        <div className='xs:my-6 lg:my-11 animation a0 bg-blue-300'>
            <img src="/src/assets/images/logo-w.webp" alt="" className='h-48 mx-auto' />
        </div>
        <div className='row xs:mx-5 lg:mx-44 bg-blue-200 border-2 border-blue-400 rounded-xl shadow-xl animation a1'>
            <div className='col-12 col-lg-6 xs:border-0 lg:border-r-2 border-blue-400 py-2'>
                <p className='animation a2'> เลือก Branch </p>
                <div className='w-full px-3 animation a2'>
                    <Dropdown_cp borderColor={"border-blue-400"} borderSize={"border-2"} />
                </div>
            </div>
            <div className='col-12 col-lg-6 py-2'>
                <p className='animation a2'> ปัญหาเพิ่มเติม </p>
                <div className='w-full px-3 animation a2'>
                    <Dropdown_cp borderColor={"border-blue-400"} borderSize={"border-2"} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home