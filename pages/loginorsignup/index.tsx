import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { CloseIcon } from '@frontend/components/icons/CloseIcon';
import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';
const signUpOrLogin = () => {
  interface Values {
    email: string;
  }
  const schema = Yup.object().shape({
    email: Yup.string().required().email(),
  });
  const router = useRouter()
  return (
    <div className=''>
      <div className='mx-5 mt-6'>
        <div className='flex justify-between'>
          <h5 className='font-proxima font-semibold text-2xl mb-4'>Sign up or Login</h5>
          <div onClick={() => { router.push('/') }}><CloseIcon className='w-6 mb-4 font-thin' /></div>
        </div>
        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            axios.head(`http://localhost:3000/api/auth/emails/${values.email}`
            )
              .then((res) => {
                if (res.status === 204 || res.status === 200) {
                  router.push(`/login?email=${values.email}`)
                }
              })
              .catch((res) => {
                router.push('/signup')
              })
          }}
          validationSchema={schema}
        >
          <Form >
            <label className='font-sans text-gray-700 font-semibold text-sm leading-3' htmlFor="email">Your email</label>
            <br></br>
            <Field
              className="border focus:outline-none rounded-lg bg-primary-100 focus:bg-white border-primary-200 hover:border-primary py-2 px-2 mb-4 w-full appearance-none"
              id="email"
              name="email"
            />
            <br />
            <button className='flex items-center text-white justify-center rounded-lg bg-primary mt-2 w-full h-12' type="submit">Continue</button>
          </Form>
        </Formik>
      </div>
    </div >
  )
}

export default signUpOrLogin