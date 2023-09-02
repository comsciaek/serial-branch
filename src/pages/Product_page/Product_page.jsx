import React, { useEffect, useState } from 'react'
import { Image, message, Steps, Radio  } from 'antd';
import { InputUpload_cp, Input_cp, Dropdown_cp, TextArea_cp } from '../../components/Components'

import { getProduct, getListProblem, UpdateSerialPost } from '../../services/apiServices';

const Product_page = () => {
    const [itemProduct, setItemProduct] = useState([]);
    const [problemList, setProblemList] = useState([]);
    // Value Step
    const [current, setCurrent] = useState(0);
    // Value SerialCode
    const [serial, setSerial] = useState("");
    const [checkSerial, setCheckSerial] = useState(false);
    // Value Radio Check
    const [checkpro, setCheckpro] = useState(0);
    const [disableCp, setDisableCp] = useState(false);
    // Value DropDown
    const [valDrop, setValDrop] = useState([]);
    // Value_TextArea
    const [valArea0, setValArea0] = useState("");
    const [valArea1, setValArea1] = useState("");
    const [valArea2, setValArea2] = useState("");
    // Value UploadImage
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const dataSerial = JSON.parse(localStorage.getItem("dataSerial"))

    const UploadSuccess = () => {
        messageApi.open({
            type: 'success',
            content: 'อัพโหลดสำเร็จ'
        })    
    }

    const UpdateSerial = () => {
        messageApi.open({
            type: 'success',
            content: 'อัพเดตข้อมูลสำเร็จ'
        })    
    }

    const SerialSuccess = () => {
        messageApi.open({
            type: 'success',
            content: 'Serial Number ถูกต้อง'
        })    
    }

    const Error = () => {
        messageApi.open({
            type: 'error',
            content: 'เกิดข้อผิดพลาด / Serial Number ผิด'
        })    
    }

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        { title: 'Please specify the serial'},
        { title: 'Please specify the problem'},
        { title: 'Please upload pictures'},
    ];
    const items = steps.map((item) => ({ key: item.title, title: item.title}));

    const handleChangCheck = (e) => {
        setCheckpro(e.target.value);
 
        if (e.target.value === 0) {
            setDisableCp(false)
        } else {
            setDisableCp(true)
        }
    }

    const getProductBySerial = async () => {
        try {
            let ValSerial = { serialno: serial }
            const result = await getProduct( ValSerial )
            if ( result.data.data != 0 ){
                setItemProduct(result.data.data[0])
                setCheckSerial(true)
                localStorage.setItem("dataSerial", JSON.stringify(result.data.data[0]))
                SerialSuccess()
            } else {
                Error()
            }
        } catch (error) {
            throw error
        }
    }

    const getList_Problem = async () => {
        try {
            const result = await getListProblem()
            if (result.status === 200){
                setProblemList(result.data.data)
            } 
        } catch (error) {
            Error()
        }
    }

    const handleUpdate = async () => {
        try {
            let Jsondata = { serialno: serial, branch: dataSerial.branch, user_update: "ผู้อัพเดท" , problem: checkpro, problem_details: valDrop, product_condition: valArea0, important_info: valArea1, other: valArea2 }
            const result = await UpdateSerialPost( Jsondata )
            if (result.status === 200){
                UpdateSerial()
                next()
            }
        } catch (error) {
            throw error
        }
    }

    const handlClickOnIssue = () => {
        handleUpdate()
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            getProductBySerial()
          }
    }

    useEffect(() => {
        getList_Problem()
    }, [])

    const CheckOnIssue = checkpro && valDrop 
    const CheckNotIssue = checkpro
    const CheckUploadImg = selectedFiles.length > 0 


  return (
    <div className={`w-full min-h-screen place-items-center xs:py-7 lg:py-12`}>
        {contextHolder}
        <Steps current={current} items={items} className='xs:pl-5 lg:pl-36 lg:px-36 animation a0' />

        {/* 1 */}
        {current ==  0 && (
            <div className='row mx-0 my-5 lg:px-60 animation a0'>
                <div className='px-0 row mb-2'>
                    <p className='col-lg-6 px-4 text-xl font-semibold text-amber-500'> Enter Serial No. </p>
                    {/* <div className='col-lg-6 lg:px-3 text-xl font-semibold text-amber-500'>
                        <div className='row items-center'>
                            <p className='col-lg-4 text-xl font-semibold text-amber-500'> Select Branch </p>
                            <Dropdown_cp mode={""} data={problemList} placeholder={"กรุณาเลือกปัญหาที่พบ ( เลือกได้มากกว่า 1 )"} VulueDrop={(e) => setValDrop(e)} value={valDrop} style={"col-lg-8 p-0"} />
                        </div>
                    </div> */}
                </div>
                <div className='mx-0 justify-between items-center'>
                    <div className=''>
                        <Input_cp placeholder={"Enter Serial number"} inputValue={(e) => setSerial(e)} value={serial} KeyDown={handleEnter} />
                    </div>
                    {/* <div className='col-lg-2 px-0 xs:my-1 lg:my-0'>
                        <button className='w-full xs:p-3 lg:p-1 rounded-xl border-2 text-white bg-amber-400 border-amber-400 hover:bg-amber-300' onClick={getProductBySerial}> ค้นหา </button>
                    </div> */}
                </div>
                { checkSerial && (
                    <div>
                        <div className='row mx-0 mt-3 my-1 p-1 border-2 border-blue-400 bg-blue-200 items-center rounded-xl font-semibold text-blue-700'>
                            <p className='col-lg-4'> Serial No : <span className='text-gray-600'> {itemProduct.serial} </span></p>
                            <p className='col-lg-4'> สาขา : <span className='text-gray-600'> {itemProduct.branch} </span></p>
                            <p className='col-lg-4'> ชื่อสาขา : <span className='text-gray-600'> {itemProduct.branch_name} </span></p>
                        </div>
                        <div className='row mx-0 p-1 my-1 border-2 border-blue-400 bg-blue-200 items-center rounded-xl font-semibold text-blue-700'>
                            <p className='col-lg-4'> รหัสสินค้า : <span className='text-gray-600'> {itemProduct.productid} </span></p>
                            <p className='col-lg-8'> ชื่อสินค้า : <span className='text-gray-600'> {itemProduct.productname} </span></p>
                        </div>
                    </div>
                )}

                <div className='row my-3 xs:text-center lg:justify-end mx-0'>
                    <button onClick={() => next()} className={`col-lg-2 xs:p-3 lg:p-1 rounded-xl border-2 text-white ${ checkSerial == false ? "bg-gray-100 border-gray-300" : "bg-amber-400 border-amber-400 hover:bg-amber-300"}`} disabled={!checkSerial} > Next </button>
                </div>
            </div>
        )}

        {/* 2 */}
        {current == 1 && (
            <div className='row mx-0 my-5 lg:px-60 animation a01'>
                <p className='px-3 mb-3 text-xl font-semibold text-amber-500'> โปรดระบุปัญหาที่พบ </p>
                <div className='w-full px-3 my-2'>
                    <Radio.Group onChange={handleChangCheck} defaultValue={checkpro}>
                        <Radio value={1} className='font-root text-lg'> มีปัญหา </Radio>
                        <Radio value={0} className='font-root text-lg'> ไม่มีปัญหา </Radio>
                    </Radio.Group>
                </div>

                { disableCp ? (
                    <>
                        <div className='w-full px-3'>
                            <Dropdown_cp mode={"multiple"} data={problemList} placeholder={"กรุณาเลือกปัญหาที่พบ ( เลือกได้มากกว่า 1 )"} VulueDrop={(e) => setValDrop(e)} value={valDrop} style={"w-full"} />
                        </div>
                        <div className='row mx-0 mt-3'>
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
                    <button onClick={() => prev()} className={`col-lg-2 xs:p-3 lg:p-1 my-1 rounded-xl border-2 border-red-500 bg-red-500 hover:bg-red-400 text-white`}> Back </button>
                    { checkpro == 1 ? (
                        <button onClick={handlClickOnIssue} className={`col-lg-2 xs:p-3 lg:p-1 my-1 rounded-xl border-2 text-white ${ CheckOnIssue ? "bg-amber-400 border-amber-400 hover:bg-amber-300" : "bg-gray-100 border-gray-300"}`} disabled={!CheckOnIssue} > Next </button>
                    ) : (
                        <button onClick={() => next()} className={`col-lg-2 xs:p-3 lg:p-1 my-1 rounded-xl border-2 text-white ${ CheckNotIssue ? "bg-amber-400 border-amber-400 hover:bg-amber-300" : "bg-gray-100 border-gray-300"}`} disabled={!CheckNotIssue} > Next </button>
                    )}
                </div>
            </div>
        )}

        {/* 3 */}
        {current === 2 && (
            <div className='row mx-0 my-5 lg:px-60 animation a01'>
                { checkpro == 0 ? [] : (
                    <>
                        <p className='px-3 mb-3 text-xl font-semibold text-amber-500'> อัพโหลดรูปภาพ </p>
                        <div className='px-0 animation a01 bg-blue-200 hover:bg-blue-300 border-2 border-dotted border-blue-400'>
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
                    <button onClick={() => prev()} className={`col-lg-2 xs:p-3 lg:p-1 my-1 rounded-xl border-2 border-red-500 bg-red-500 hover:bg-red-400 text-white`}> Back </button>
                    { checkpro == 1 ? (
                        <button onClick={() => next()} className={`col-lg-2 xs:p-3 lg:p-1 my-1 rounded-xl border-2 text-white ${ selectedFiles.length > 0 ? "bg-amber-400 border-amber-400 hover:bg-amber-300" : "bg-gray-100 border-gray-300"}`} disabled={!CheckUploadImg} > Finish </button>
                    ) : (
                        <button onClick={() => next()} className={`col-lg-2 xs:p-3 lg:p-1 my-1 rounded-xl border-2 bg-amber-400 border-amber-400 hover:bg-amber-300 text-white`}  > Finish </button>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default Product_page