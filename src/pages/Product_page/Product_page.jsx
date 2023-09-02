import React, { useState } from 'react'
import { Image, message, Steps, Radio  } from 'antd';
import { InputUpload_cp, Input_cp, Dropdown_cp, TextArea_cp } from '../../components/Components'

import MockDataDropdown from '../../json/Mock.json'
import MockDataMore from '../../json/Mock_More.json'

const Product_page = () => {
    const [current, setCurrent] = useState(0);

    const [serial, setSerial] = useState("");

    const [checkpro, setCheckpro] = useState(2);
    const [disableCp, setDisableCp] = useState(false)
    const [valDrop, setValDrop] = useState([])
    // const [valDropMore1, setValDropMore0] = useState("")
    // const [valDropMore2, setValDropMore1] = useState("")
    // const [valDropMore3, setValDropMore2] = useState("")
    const [valArea0, setValArea0] = useState("")
    const [valArea1, setValArea1] = useState("")
    const [valArea2, setValArea2] = useState("")

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const Success = () => {
        messageApi.open({
            type: 'success',
            content: 'อัพโหลดสำเร็จ'
        })    
    }

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        { title: 'Enter Serial', content: 'First-content'},
        { title: 'Check Product', content: 'Second-content'},
        { title: 'Upload Image', content: 'Last-content'},
    ];
    const items = steps.map((item) => ({ key: item.title, title: item.title}));

    const handleChangCheck = (e) => {
        setCheckpro(e.target.value);
 
        if (e.target.value === 2) {
            setDisableCp(false)
        } else {
            setDisableCp(true)
        }
    }

    const handleTextAreaChange = (e, index) => {
        const newValue = e.target.value;
        // สร้างสำเนาของอาร์เรย์ valAreas และอัพเดทค่าที่ต้องการ
        const updatedValAreas = [...valAreas];
        updatedValAreas[index] = newValue;
        setValAreas(updatedValAreas);
    };

    const CheckOnIssue = checkpro && valDrop.length > 0 
    const CheckNotIssue = checkpro
    const CheckUploadImg = selectedFiles.length > 0 

  return (
    <div className={`w-full min-h-screen place-items-center xs:py-7 lg:py-12`}>
        {contextHolder}
        <Steps current={current} items={items} className='xs:pl-5 lg:pl-36 lg:px-36 animation a0' />

        {/* 1 */}
        {current ==  0 && (
            <div className='row mx-0 my-5 lg:px-60 animation a1'>
                <p className='px-3 mb-3 text-xl font-semibold text-amber-500'> Enter Serial number </p>
                <div className=''>
                    <Input_cp placeholder={"Enter Serial number"} inputValue={(e) => setSerial(e)} value={serial} />
                </div>
                <div className='row my-3 xs:text-center lg:justify-end mx-0'>
                    <button onClick={() => next()} className={`col-lg-2 xs:p-5 lg:p-1 rounded-xl border-2 ${ serial == "" ? "bg-gray-100 border-gray-300" : "bg-amber-300 border-amber-500 hover:bg-amber-400"}`} disabled={!serial} > Next </button>
                </div>
            </div>
        )}

        {/* 2 */}
        {current == 1 && (
            <div className='row mx-0 my-5 lg:px-60 animation a0'>
                <p className='px-3 mb-3 text-xl font-semibold text-amber-500'> โปรดระบุปัญหาที่พบ </p>
                <div className='w-full px-3 my-2'>
                    <Radio.Group onChange={handleChangCheck} defaultValue={checkpro}>
                        <Radio value={1} className='font-root text-lg'> มีปัญหา </Radio>
                        <Radio value={2} className='font-root text-lg'> ไม่มีปัญหา </Radio>
                    </Radio.Group>
                </div>

                { disableCp ? (
                    <>
                        <div className='w-full px-3'>
                            <Dropdown_cp mode={"multiple"} data={MockDataDropdown} placeholder={"กรุณาเลือกปัญหาที่พบ ( เลือกได้มากกว่า 1 )"} VulueDrop={(e) => setValDrop(e)} value={valDrop} />
                        </div>
                        <div className='row mx-0'>
                            {/* 1 */}
                            <div className='col-lg-4 px-0'>
                                <div className='my-1 px-1'>
                                    <p className='px-1'> สภาพสินค้า </p>
                                    {/* <Input_cp value={items.title} disabled={false} /> */}
                                    {/* <Dropdown_cp data={MockDataMore} placeholder={"เลือกอื่นๆ"} VulueDrop={(e) => setValDropMore1(e)} value={valDropMore1} /> */}
                                </div>
                                <div className='w-full my-1 mb-3 px-1'>
                                    <TextArea_cp placeholder={"หมายเหตุ"} resize={"none"} ValueArea={(e) => setValArea0(e)} value={valArea0} />
                                </div>
                            </div>

                            {/* 2 */}
                            <div className='col-lg-4 px-0'>
                                <div className='my-1 px-1'>
                                    <p className='px-1'> ข้อมูลสำคัญ </p>
                                </div>
                                <div className='w-full my-1 mb-3 px-1'>
                                    <TextArea_cp placeholder={"หมายเหตุ"} resize={"none"} ValueArea={(e) => setValArea1(e)} value={valArea1} />
                                </div>
                            </div>
                            
                            {/* 3 */}
                            <div className='col-lg-4 px-0'>
                                <div className='my-1 px-1'>
                                    <p className='px-1'> อื่นๆ โปรดระบุละเอียด </p>
                                </div>
                                <div className='w-full my-1 mb-3 px-1'>
                                    <TextArea_cp placeholder={"หมายเหตุ"} resize={"none"} ValueArea={(e) => setValArea2(e)} value={valArea2} />
                                </div>
                            </div>
                        </div>
                    </>
                ) : []}

                <div className='row lg:my-3 xs:text-center lg:justify-between mx-0'>
                    <button onClick={() => prev()} className={`col-lg-2 xs:p-5 lg:p-1 my-1 rounded-xl border-2 border-red-500 bg-red-300 hover:bg-red-400 `}> Back </button>
                    { checkpro == 1 ? (
                        <button onClick={() => next()} className={`col-lg-2 xs:p-5 lg:p-1 my-1 rounded-xl border-2 ${ CheckOnIssue ? "bg-amber-300 border-amber-500 hover:bg-amber-400" : "bg-gray-100 border-gray-300"}`} disabled={!CheckOnIssue} > Next </button>
                    ) : (
                        <button onClick={() => next()} className={`col-lg-2 xs:p-5 lg:p-1 rounded-xl border-2 ${ CheckNotIssue ? "bg-amber-300 border-amber-500 hover:bg-amber-400" : "bg-gray-100 border-gray-300"}`} disabled={!CheckNotIssue} > Next </button>
                    )}
                </div>
            </div>
        )}

        {/* 3 */}
        {current === 2 && (
            <div className='row mx-0 my-5 lg:px-60 animation a0'>
                { checkpro == 2 ? [] : (
                    <>
                        <p className='px-3 mb-3 text-xl font-semibold text-amber-500'> อัพโหลดรูปภาพ </p>
                        <div className='px-0 animation a0 bg-blue-200 hover:bg-blue-300 border-2 border-dotted border-blue-400'>
                            <InputUpload_cp onFileUpload={(e) => setSelectedFiles(e)} />
                        </div>
                    </>
                )}

                <div className={`row xs:mt-6 lg:mt-5 mx-0 justify-around p-2 items-center ${ selectedFiles.length > 0 ? "border-2 border-dotted border-blue-400 bg-blue-200 animation a01" : ""}`}>
                    { selectedFiles.map((fileImg, index) => (
                        <div key={index} className='col-12 col-lg-3 my-2 border-2 border-red-700 pt-2 bg-gray-100 text-center'>
                            <Image src={URL.createObjectURL(fileImg)} alt={`Uploaded ${index + 1}`} className='mx-auto object-contain h-48' height={192} />
                            <p className='text-blue-700'>{fileImg.name}</p>
                            <p className='text-green-700'> ขนาดไฟล์ : {fileImg.size} Byte </p>
                        </div>
                    ))}
                </div>

                <div className='row my-3 xs:text-center lg:justify-between mx-0'>
                    <button onClick={() => prev()} className={`col-lg-2 xs:p-5 lg:p-1 my-1 rounded-xl border-2 border-red-500 bg-red-300 hover:bg-red-400 `}> Back </button>
                    { checkpro == 1 ? (
                        <button onClick={() => next()} className={`col-lg-2 xs:p-5 lg:p-1 my-1 rounded-xl border-2 ${ selectedFiles.length > 0 ? "bg-amber-300 border-amber-500 hover:bg-amber-400" : "bg-gray-100 border-gray-300"}`} disabled={!CheckUploadImg} > Finish </button>
                    ) : (
                        <button onClick={() => next()} className={`col-lg-2 xs:p-5 lg:p-1 my-1 rounded-xl border-2 bg-amber-300 border-amber-500 hover:bg-amber-400`}  > Finish </button>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default Product_page