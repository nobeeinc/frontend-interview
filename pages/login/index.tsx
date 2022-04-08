import React from 'react'
import clsx from 'clsx'
import * as Yup from 'yup'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import logInCSS from './login.module.css'
import { FormikFormValue } from '../../interface/FormikFormValue'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import jwt_decode from 'jwt-decode'
import { JWTtokenParseInfo } from '../../interface/JWTtokenParseInfo'

const LogInGate = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isTouchPassword, setIsTouchPassword] = useState(false)
  const [isTouchEmail, setIsTouchEmail] = useState(false)
  const [showInputPassword, setShowInputPassword] = useState(false)
  const [messageError, setMessageError] = useState<string | undefined>()
  const router = useRouter()
  const [isLogIn, setIsLogIn] = useState<JWTtokenParseInfo>()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getAccessToken = localStorage.getItem('accessToken: ')
      const token = getAccessToken
      const decoded: JWTtokenParseInfo = token ? jwt_decode(token) : {}
      if (decoded.exp && decoded.exp - Math.floor(Date.now() / 1000) > 0) {
        setIsLogIn(decoded)
      }
    }
  }, [])

  useEffect(() => {
    if (isLogIn) {
      router.push('/')
    }
  }, [isLogIn, router])

  const logIn = (email: string, password: string) => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode) {
          setMessageError(result.message)
        } else {
          localStorage.setItem('accessToken: ', result.accessToken)
          router.push('/')
        }
      })
      .catch((error) => alert(error))
  }

  return (
    <section>
      <div className="flex flex-row items-center h-7 mt-6 ml-5 mr-5">
        <h5 className={clsx(logInCSS.heading) + ' font-proxima flex-1'}>
          Sign up or Login
        </h5>
        <IconButton style={{ color: '#161616' }} className="p-0">
          <Link href="/" passHref>
            <CloseOutlinedIcon className="w-6 h-6" />
          </Link>
        </IconButton>
      </div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values: FormikFormValue) => {
          const { email, password } = values
          logIn(email as string, password as string)
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required('Email is required!')
            .matches(
              /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              'Please enter a valid email address'
            ),
          password: Yup.string().required('Password is required!'),
          // .matches(
          //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          //   'Password must have eight characters, at least one letter and one number'
          // ),
        })}
      >
        {(formik) => (
          <Form
            className="flex flex-col ml-5 mr-5 mt-7"
            onSubmit={formik.handleSubmit}
          >
            <div
              className={
                messageError ||
                formik.errors.email ||
                (showInputPassword && isTouchPassword)
                  ? clsx(logInCSS.formWrap)
                  : undefined
              }
            >
              {messageError ? (
                <p
                  className={
                    clsx(logInCSS.errorMessage) + ' text-sm font-normal'
                  }
                >
                  {messageError}
                </p>
              ) : undefined}
              {formik.errors.email && (
                <p
                  className={
                    clsx(logInCSS.errorMessage) + ' text-sm font-normal'
                  }
                >
                  {formik.errors.email}
                </p>
              )}
              {showInputPassword && isTouchPassword && (
                <p
                  className={
                    clsx(logInCSS.errorMessage) + ' text-sm font-normal'
                  }
                >
                  {formik.errors.password}
                </p>
              )}
            </div>
            <label
              htmlFor="email"
              className={
                clsx(logInCSS.labelSignUp) + ' text-sm font-sans font-semibold'
              }
            >
              Your email
            </label>
            <OutlinedInput
              id="email"
              name="email"
              color={formik.errors.email ? 'error' : 'primary'}
              className="mt-1 mb-6 rounded-lg"
              onChange={(e) => {
                formik.handleChange(e)
                setIsTouchEmail(true)
              }}
              value={formik.values.email}
              autoComplete="off"
            ></OutlinedInput>
            {showInputPassword && (
              <OutlinedInput
                id="password"
                name="password"
                value={formik.values.password}
                color={formik.errors.password ? 'error' : 'primary'}
                className="mt-1 mb-6 rounded-lg"
                onChange={formik.handleChange}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              ></OutlinedInput>
            )}
            <Button
              variant="contained"
              className="text-white rounded-lg h-12 mb-6"
              fullWidth
              type="submit"
              onClick={() => {
                if (!formik.errors.email && isTouchEmail) {
                  setShowInputPassword(true)
                }
                if (showInputPassword) {
                  setIsTouchPassword(true)
                }
              }}
            >
              <span className="text-base leading-4 font-semibold capitalize">
                Continue
              </span>
            </Button>
          </Form>
        )}
      </Formik>
      {messageError && (
        <Link href="./signup">
          <a className="text-base leading-4 font-semibold underline ml-5">
            Sign up
          </a>
        </Link>
      )}
    </section>
  )
}
export default LogInGate
