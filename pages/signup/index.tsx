import React from 'react'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import { CloseIcon } from '@frontend/components/icons/CloseIcon'
import axios from 'axios'
import { useState } from 'react'
import ErrorMessage from '@frontend/components/ErrorMessage'
import FormField from '@frontend/components/FormField'
import { GoBackIcon } from '@frontend/components/icons/GoBackIcon'
import { EyeInvisibleIcon } from '@frontend/components/icons/EyeInvisibleIcon'
import { EyeIcon } from '@frontend/components/icons/EyeIcon'

interface Values {
  email: string
  password: string
  passwordConfirm: string
}

const SignUp = () => {
  const [errMessage, setErrMessage] = useState('')
  const [passwordType, setPasswordType] = useState('password')
  const [confirmPasswordType, setConfirmPasswordType] = useState('password')

  const router = useRouter()

  const passwordHandler = () => {
    if (passwordType === 'text') {
      setPasswordType('password')
      return
    }
    setPasswordType('text')
  }
  const confirmPasswordHandler = () => {
    if (confirmPasswordType === 'text') {
      setConfirmPasswordType('password')
      return
    }
    setConfirmPasswordType('text')
  }

  return (
    <div className="">
      <div className="mx-5 mt-6">
        <div className="flex justify-between">
          <div onClick={() => router.back()}>
            <GoBackIcon className="w-6 mb-4 font-thin" />
          </div>
          <h5 className="font-proxima font-semibold text-2xl mb-4">Register</h5>
          <div
            onClick={() => {
              router.push('/')
            }}
          >
            <CloseIcon className="w-6 mb-4 font-thin" />
          </div>
        </div>
        {errMessage && <ErrorMessage errMessage={errMessage} />}
        <Formik
          initialValues={{
            email: (router.query.email as string) || '',
            password: '',
            passwordConfirm: '',
          }}
          onSubmit={(values: Values) => {
            if (values.password === values.passwordConfirm) {
              axios
                .post(`http://localhost:3000/api/auth/register`, {
                  email: values.email,
                  password: values.password,
                })
                .then((res) => {
                  localStorage.setItem(
                    'access-token',
                    JSON.stringify(res.data.accessToken)
                  )
                  router.push('/')
                })
                .catch((error) => {
                  if (error.response.status === 422)
                    setErrMessage(error.response.data.message)
                  else if (error.response.status === 401)
                    setErrMessage('invalid credentials')
                  else if (error.response.status === 500)
                    setErrMessage('internal server error')
                })
              return
            }
            setErrMessage('Invalid confirm password')
          }}
        >
          <Form>
            <FormField
              id="email"
              label="Your email"
              name="email"
              additionalClass={
                errMessage ? 'border-danger' : 'border-primary-200'
              }
              onShow="text"
            ></FormField>
            <FormField
              id="password"
              label="Password"
              name="password"
              additionalClass={
                errMessage ? 'border-danger' : 'border-primary-200'
              }
              onShow={passwordType}
            ></FormField>
            <FormField
              id="passwordConfirm"
              label="Confirm password"
              name="passwordConfirm"
              additionalClass={
                errMessage ? 'border-danger' : 'border-primary-200'
              }
              onShow={confirmPasswordType}
            ></FormField>
            <button
              className="flex items-center text-white justify-center rounded-lg bg-primary mt-2 w-full h-12 border"
              type="submit"
            >
              Continue
            </button>
          </Form>
        </Formik>
        <button className="absolute right-6 top-48" onClick={passwordHandler}>
          {passwordType === 'password' ? (
            <EyeIcon className="w-6 mb-4 font-thin"></EyeIcon>
          ) : (
            <EyeInvisibleIcon className="w-6 mb-4 font-thin" />
          )}
        </button>
        <button
          className="absolute right-6 top-72"
          onClick={confirmPasswordHandler}
        >
          {confirmPasswordType === 'password' ? (
            <EyeIcon className="w-6 mb-4 font-thin"></EyeIcon>
          ) : (
            <EyeInvisibleIcon className="w-6 mb-4 font-thin" />
          )}
        </button>
        <div className="font-sans text-sm mt-2">
          Already have an account?{' '}
          <span
            className="font-sans font-semibold text-sm underline "
            onClick={() => {
              router.push('/login')
            }}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  )
}

export default SignUp
