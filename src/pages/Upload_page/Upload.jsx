import React, { useState } from 'react'
import { Image, message } from 'antd';
import { InputUpload_cp } from '../../components/Components'

const Upload = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const Success = () => {
      messageApi.open({
          type: 'success',
          content: 'อัพโหลดสำเร็จ'
      })    
    }

    const handleUploadImg = (e) => {
        setSelectedFiles(e)
        Success()
        console.log("Page_Upload", e)
    }

    const handleClick = () => {
        console.log("Click")
    }

  return (
    <div className='w-full h-screen place-items-center text-center bg-blue-100 xs:py-7 lg:py-12'>
        {contextHolder}
        <div className='xs:my-6 lg:my-11 animation a0 bg-blue-300 hover:bg-blue-400'>
            <InputUpload_cp onFileUpload={handleUploadImg} />
        </div>

        <div className={`row xs:mt-6 lg:mt-5 mx-0 justify-around p-2 items-center ${ selectedFiles.length > 0 ? "border-2 border-dotted border-blue-600 bg-blue-200 animation a1" : ""}`}>
            { selectedFiles.map((fileImg, index) => (
                <div key={index} className='col-12 col-lg-3 animation a0 my-2 border-2 border-red-700 pt-2 bg-gray-100'>
                    <Image src={URL.createObjectURL(fileImg)} alt={`Uploaded ${index + 1}`} className='mx-auto object-contain h-48' height={192} />
                    <p className='text-blue-700'>{fileImg.name}</p>
                    <p className='text-green-700'> ขนาดไฟล์ : {fileImg.size} Byte </p>
                </div>
            ))}
        </div>

        <div className='row mx-0 justify-center text-white lg:mt-5 animation a2'>
            <button className={`col-12 col-lg-7 xs:p-5 lg:p-2 lg:rounded-lg ${ selectedFiles.length > 0 ? "bg-amber-300 hover:bg-amber-400" : "bg-gray-100 border-2 border-gray-300" }`} disabled={selectedFiles.length === 0} onClick={handleClick}> บันทึกข้อมูล </button>
        </div>
    </div>
  )
}

export default Upload