import { CloseIcon } from "./icons/CloseIcon";
import { ArrowBackIcon } from "./icons/ArrowBackIcon";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import router from "next/router";
import { IconButton } from "@mui/material";
import { EyeIcon } from "./icons/EyeIcon";
import { EyeSlashIcon } from "./icons/EyeSlashIcon";
import { useState } from "react";
import Link from 'next/link';
import { setCookie } from "nookies";
const RegisterComponent = () => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleInput = (error: string | undefined, touch: boolean | undefined) => {
    if (error && touch) return "input-error";
    else return "input-right"
  }
  const getEmailPre = () => {
    if (typeof window === 'undefined') return '';
    else if (typeof router.query.data === 'string') return router.query.data;
    else return '';
  }
  const handleRegister = async (email: string, password: string) => {
    try {
      interface PostData {
        email: string
        password: string
      }
      const dataPost: PostData = {
        email: email,
        password: password
      }
      const res = await axios.post('http://localhost:3000/api/auth/register', dataPost);
      setCookie(null, 'accessToken', res.data.accessToken);
      router.push("/");
    }
    catch (error) {
    }
  }
  const EmailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address!').required('Email is required!'),
    password: Yup.string().required('Password is required!').matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/, "Invalid Password!"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Confirm password does not match with your password!').required('Confirm password is required!')
  });
  const formik = useFormik({
    initialValues: {
      email: getEmailPre(),
      password: '',
      confirmPassword: '',
    },
    onSubmit: values => {
      handleRegister(values.email, values.password);
    },
    validationSchema: EmailSchema
  });
  const isError = Object.keys(formik.errors).length !== 0 && Object.keys(formik.touched).length !== 0;
  return (
    <>
      <div className="h-14 fixed z-20 w-full bg-white py-4 px-4 flex items-center justify-between">
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon className="h-6 w-6 fill-current" />
        </IconButton>
        <h1 className="font-proxima text-2xl">Sign up</h1>
        <IconButton onClick={() => router.push("/")}>
          <CloseIcon className="h-6 w-6 fill-current" />
        </IconButton>
      </div>

      <div className="pt-14">
        {isError && <div className="px-5 py-3 bg-error text-xs text-danger space-y-1">
          {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
          {formik.errors.password && formik.touched.password && (
            <p>{formik.errors.password}</p>
          )}
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p>{formik.errors.confirmPassword}</p>
          )}</div>}
        <div className="px-5">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mt-4">
              <label htmlFor="email" className="font-sans text-xs text-gray-700 font-bold mb-1">Your email</label>
              <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
                className={handleInput(formik.errors.email, formik.touched.email)}
              />
            </div>
            <div className="mt-4 flex flex-col">
              <label htmlFor="password" className="font-sans text-xs text-gray-700 font-bold mb-1">Password</label>
              <input
                id="password"
                name="password"
                type={!show ? "password" : "text"}
                onChange={formik.handleChange}
                value={formik.values.password}
                className={handleInput(formik.errors.password, formik.touched.password)}
              />
              <span className="absolute right-6 mt-6">
                <IconButton onClick={() => setShow(!show)}>
                  {show ? <EyeIcon className="h-4 w-4" /> : <EyeSlashIcon className="h-4 w-4" />}
                </IconButton>
              </span>
            </div>
            <div className="mt-4 flex flex-col">
              <label htmlFor="confirmPassword" className="font-sans text-xs text-gray-700 font-bold mb-1">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={!showConfirm ? "password" : "text"}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                className={handleInput(formik.errors.confirmPassword, formik.touched.confirmPassword)}
              />
              <span className="absolute right-6 mt-6">
                <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <EyeIcon className="h-4 w-4" /> : <EyeSlashIcon className="h-4 w-4" />}
                </IconButton>
              </span>
            </div>
            <div className="mt-6">
              <button type="submit" className="btn-green">Continue</button>
            </div>
            <p className="text-sm mt-2">Already have an account? <Link href="/login"><a className="font-bold underline">Login</a></Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterComponent
