import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import clsx from 'clsx'
import signUpCSS from './signUp.module.css'
import { Formik, Form } from 'formik'
import { FormikFormValue } from '../../interface/FormikFormValue'
import * as Yup from 'yup'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import Link from 'next/link'

const SignUpGate = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isTouchPassword, setIsTouchPassword] = useState(false)
  const [isTouchEmail, setIsTouchEmail] = useState(false)
  const [showInputPassword, setShowInputPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [infoSignUp, setInfoSignUp] = useState<FormikFormValue>({
    email: '',
    password: '',
    confirmPassword: '',
  })

  return (
    <section>
      <div className="flex flex-row items-center h-7 mt-6 ml-5 mr-5">
        <h5 className={clsx(signUpCSS.heading) + ' font-proxima flex-1'}>
          Sign up or Login
        </h5>
        <IconButton style={{ color: '#161616' }} className="p-0">
          <CloseOutlinedIcon className="w-6 h-6" />
        </IconButton>
      </div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values: FormikFormValue) => setInfoSignUp(values)}
        validationSchema={Yup.object({
          email: Yup.string()
            .required('Email is required!')
            .matches(
              /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              'This is an error message!'
            ),
          password: Yup.string().required('Password is required!'),
          // .matches(
          //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          //   'Password must have eight characters, at least one letter and one number'
          // ),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'This is a second line!'
          ),
        })}
      >
        {(formik) => (
          <Form
            className="flex flex-col ml-5 mr-5 mt-7"
            onSubmit={formik.handleSubmit}
          >
            {formik.errors.email && <p>{formik.errors.email}</p>}
            {showInputPassword && isTouchPassword && (
              <p>{formik.errors.password}</p>
            )}
            {formik.errors.confirmPassword && (
              <p>{formik.errors.confirmPassword}</p>
            )}
            <label
              htmlFor="email"
              className={
                clsx(signUpCSS.labelSignUp) + ' text-sm font-sans font-semibold'
              }
            >
              Your email
            </label>
            <OutlinedInput
              id="email"
              name="email"
              color="primary"
              className="mt-1 mb-6 rounded-lg"
              onChange={(e) => {
                formik.handleChange(e)
                setIsTouchEmail(true)
              }}
              value={formik.values.email}
              autoComplete="off"
            ></OutlinedInput>
            {showInputPassword && (
              <>
                <label
                  htmlFor="password"
                  className={
                    clsx(signUpCSS.labelSignUp) +
                    ' text-sm font-sans font-semibold'
                  }
                >
                  Password
                </label>
                <OutlinedInput
                  id="password"
                  name="password"
                  value={formik.values.password}
                  color="primary"
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
                <label
                  htmlFor="confirmPassword"
                  className={
                    clsx(signUpCSS.labelSignUp) +
                    ' text-sm font-sans font-semibold'
                  }
                >
                  Confirm password
                </label>
                <OutlinedInput
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  color="primary"
                  className="mt-1 mb-6 rounded-lg"
                  onChange={formik.handleChange}
                  type={showConfirmPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                ></OutlinedInput>
              </>
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
      {showInputPassword && (
        <>
          <p className="ml-5 mr-2 font-normal inline text-sm">
            Already have an account?
          </p>
          <Link href="">
            <a className="text-base leading-4 font-semibold underline">Login</a>
          </Link>
        </>
      )}
    </section>
  )
}
export default SignUpGate
