import React from 'react'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import { CloseIcon } from '@frontend/components/icons/CloseIcon';
import axios from 'axios';
import { useState } from 'react';
import ErrorMessage from '@frontend/components/ErrorMessage';
import FormField from '@frontend/components/FormField';
import { GoBackIcon } from '@frontend/components/icons/GoBackIcon';
import { EyeInvisibleIcon } from '@frontend/components/icons/EyeInvisibleIcon';
import { EyeIcon } from '@frontend/components/icons/EyeIcon';

interface Values {
  email: string;
  password: string
}

const Login = () => {
  const [errMessage, setErrMessage] = useState("")
  const [passwordType, setPasswordType] = useState("password")
  const router = useRouter()
  const passwordHandler = () => {
    if (passwordType === "text") {
      setPasswordType("password")
      return
    } setPasswordType("text")
  }

  return (
    <div>
      <div className='mx-5 mt-6'>
        <div className='flex justify-between'>
          <div onClick={() => router.back()}><GoBackIcon className='w-6 mb-4 font-thin' /></div>
          <h5 className='font-proxima font-semibold text-2xl mb-4'>Login</h5>
          <div onClick={() => { router.push('/') }}><CloseIcon className='w-6 mb-4 font-thin' /></div>
        </div>
        {errMessage && <ErrorMessage errMessage={errMessage} />}
        <Formik
          initialValues={{
            email: router.query.email as string || '',
            password: ''
          }}
          onSubmit={(
            values: Values,
          ) => {
            axios.post(`http://localhost:3000/api/auth/login`, values, { withCredentials: true }
            )
              .then((res) => {
                // axios.defaults.headers.common['Authorization'] = `Bearer ${response['token']}`
                console.log('res', res.data);

              })
              .catch((error) => {
                if (error.response.status === 422)
                  setErrMessage("failed email or password validation")
                else if (error.response.status === 401)
                  setErrMessage("invalid credentials")
                else if (error.response.status === 500)
                  setErrMessage("internal server error")
              })
          }}
        >
          <Form >
            <FormField id="email" label="Your email" name="email" additionalClass={errMessage ? 'border-danger' : 'border-primary-200'} onShow='text'></FormField>
            <FormField id="password" label="Password" name="password" additionalClass={errMessage ? 'border-danger' : 'border-primary-200'} onShow={passwordType}></FormField>
            <button className='flex items-center text-white justify-center rounded-lg bg-primary mt-2 w-full h-12 border' type="submit">Continue</button>
          </Form>
        </Formik>
        <button className='absolute right-6 top-48' onClick={passwordHandler}>
          {passwordType === 'password' ? <EyeIcon className='w-6 mb-4 font-thin'></EyeIcon> : <EyeInvisibleIcon className='w-6 mb-4 font-thin' />}
        </button>
        <div className='font-sans font-semibold text-sm underline mt-1' onClick={() => { router.push('/signup') }}>Sign up</div>
      </div>
    </div >
  )
}

export default Login