import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { CloseIcon } from '@frontend/components/icons/CloseIcon';
import axios from 'axios';
import { useState } from 'react';
import ErrorMessage from '@frontend/components/ErrorMessage';
import FormField from '@frontend/components/FormField';
import { GoBackIcon } from '@frontend/components/icons/GoBackIcon';
import { EyeInvisibleIcon } from '@frontend/components/icons/EyeInvisibleIcon';

interface Values {
  email: string;
  password: string
}

const login = () => {
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
    <div className=''>
      <div className='mx-5 mt-6'>
        <div className='flex justify-between'>
          <div onClick={() => router.back()}><GoBackIcon className='w-6 mb-4 font-thin' /></div>
          <h5 className='font-proxima font-semibold text-2xl mb-4'>Login</h5>
          <div onClick={() => { router.push('/') }}><CloseIcon className='w-6 mb-4 font-thin' /></div>
        </div>
        <Formik
          initialValues={{
            email: router.query.email as string || '',
            password: ''
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            console.log(values.email);

            axios.post(`http://localhost:3000/api/auth/login`, values
            )
              .then((res) => {

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
            {errMessage && <ErrorMessage errMessage={errMessage} />}
            <FormField label="Your email" type="email" additionalClass={errMessage ? 'border-danger' : 'border-primary-200'} onShow='text'></FormField>
            <FormField label="Password" type="password" additionalClass={errMessage ? 'border-danger' : 'border-primary-200'} onShow={passwordType}></FormField>
            <button className='flex items-center text-white justify-center rounded-lg bg-primary mt-2 w-full h-12 border' type="submit">Continue</button>
          </Form>
        </Formik>
      </div>
      <button onClick={passwordHandler}>
        <EyeInvisibleIcon className='w-6 mb-4 font-thin' /></button>
    </div >
  )
}

export default login