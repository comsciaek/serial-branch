import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import { message } from 'antd';
import { loginApi } from '../../services/apiServices';
// import { Dropdown_cp } from '../../components/Components';

// import Mock from '../../json/Mock_More.json'

const Login = () => {
  const userRef = useRef();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [programid, setProgramid] = useState(150)
  // const [valDrop, setValDrop] = useState([])
  const [messageApi, contextHolder] = message.useMessage();

  const error = () => {
    messageApi.open({
        type: 'error',
        content: 'ชื่อผู้ใช้หรือรหัสผ่านผิดพลาด'
    })    
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      postLogin();
    }
  };

  const postLogin = async () => {
    try {
      let JsonData = { username: username, password: password, programid: programid }
      const result = await loginApi ( JsonData )
      if ( result.status === 200 ){
        location.href = "/product_page"
      }
    } catch (error) {
      error()
    }
  }


  return (
    <div className='place-items-center h-screen xs:py-7 lg:py-12 bg-gradient-to-t from-blue-200 to-blue-500'>
      {contextHolder}
      <div className='xs:my-6 lg:my-11 animation a0'>
          <img src="/src/assets/images/logo-w.webp" alt="" className='xs:h-28 lg:h-48 mx-auto' />
      </div>
      <div className='row xs:mx-5 lg:mx-96 bg-blue-200 border-2 border-blue-600 rounded-xl shadow-xl animation a1 py-3'>
          <div className='col-12 border-blue-400'>
            <p className='text-xl text-white animation a1 text-center'> ยินดีต้อนรับสู่ Branch Image </p>
            <div>
              <Form className='space-y-3 lg:px-24'>
                <Form.Group controlId='formBasicUsername'>
                  <Form.Label className='animation a2'> Username :  </Form.Label>
                  <Form.Control type='text' placeholder='Enter Username' ref={userRef} onChange={(e) => setUsername(e.target.value)} required autoComplete="off" className="transition-all duration-300 ease-in-out focus:ring focus:ring-blue-400 animation a3" />
                </Form.Group>
                <Form.Group>
                  <Form.Label className='animation a4'> Password : </Form.Label>
                  <Form.Control type='password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required autoComplete='off' onKeyDown={handleEnterPress} className="transition-all duration-300 ease-in-out focus:ring focus:ring-blue-400 animation a5" />
                </Form.Group>
              </Form>
            </div>

            {/* <div className='mt-3 w-full text-center animation a6 lg:px-24'>
              <p className='text-start'> สาขา : </p>
              <Dropdown_cp mode={""} data={Mock} placeholder={"กรุณาเลือกปัญหาที่พบ ( เลือกได้มากกว่า 1 )"} VulueDrop={(e) => setValDrop(e)} value={valDrop} style={"w-full"} />
            </div> */}

            <div className='mt-4 w-full text-center animation a6'>
              <button className='col-12 col-lg-6 p-2 rounded-lg text-white bg-blue-400 hover:bg-blue-500' onClick={postLogin}> เข้าสู่ระบบ / Login </button>
            </div> 
          </div>
      </div>
    </div>
  )
}

export default Login