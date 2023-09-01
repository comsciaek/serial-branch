import React from 'react'
import { message } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";

const InputUpload_cp = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const error = () => {
      messageApi.open({
          type: 'error',
          content: 'กรุณาเลือกไฟล์รูปไม่เกิน 3 รูป'
      })    
    }

    const handleFileChange = (event) => {
        const files = event.target.files;
        const validFiles = [];
        
        if (files.length > 3) {
            error();
            return;
        }

        for (let i = 0; i < files.length && validFiles.length < 3; i++) {
            const file = files[i];

            if (file.type.startsWith('image/')) {
                validFiles.push(file);
            }
        }
        props.onFileUpload(validFiles);
    }

  return (
    <>
        {contextHolder}
        <input type="file" id="file" className='hidden' accept="image/*" multiple onChange={handleFileChange} />
        <label htmlFor="file" className='w-full'>
            <div className='flex space-x-2 cursor-pointer items-center p-5 justify-center border-2 border-dotted border-blue-600'>
                <FontAwesomeIcon icon={faPhotoFilm} className='h-6 w-6 text-amber-500' />
                <span className='text-base font-medium'> เพิ่มรูปภาพ </span>  
            </div>
        </label>
    </>
  )
}

export default InputUpload_cp