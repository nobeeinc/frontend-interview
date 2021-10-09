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
const LoginComponent = () => {
  const [show, setShow] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const handleInput = (error: string | undefined, touch: boolean | undefined) => {
    if (error && touch) return "input-error";
    else return "input-right"
  }
  const handleInputPassword = (error: string | undefined, touch: boolean | undefined) => {
    if ((error && touch) || passwordError) return "input-error";
    else return "input-right"
  }
  const getEmailPre = () => {
    if (typeof window === 'undefined') return '';
    else if (typeof router.query.data === 'string') return router.query.data;
    else return '';
  }
  const handleLogin = async (email: string, password: string) => {
    try {
      interface PostData {
        email: string
        password: string
      }
      const dataPost: PostData = {
        email: email,
        password: password
      }
      const res = await axios.post('http://localhost:3000/api/auth/login', dataPost);
      setCookie(null, 'accessToken', res.data.accessToken);
      router.push("/");
    }
    catch (error) {
      setPasswordError(true);
    }
  }
  const EmailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: getEmailPre(),
      password: '',
    },
    onSubmit: values => {
      handleLogin(values.email, values.password);
    },
    validationSchema: EmailSchema
  });
  const isError = (Object.keys(formik.errors).length !== 0 && Object.keys(formik.touched).length !== 0) || passwordError;
  return (
    <>
      <div className="h-14 fixed z-20 w-full bg-white py-4 px-4 flex items-center justify-between">
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon className="h-6 w-6 fill-current" />
        </IconButton>
        <h1 className="font-proxima text-2xl">Login</h1>
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
          {passwordError && (
            <p>The password you entered incorrect, please try again!</p>
          )}
        </div>}
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
                className={handleInputPassword(formik.errors.password, formik.touched.password)}
              />
              <span className="absolute right-6 mt-6">
                <IconButton onClick={() => setShow(!show)}>
                  {show ? <EyeIcon className="h-4 w-4" /> : <EyeSlashIcon className="h-4 w-4" />}
                </IconButton>
              </span>
            </div>
            <div className="mt-6">
              <button type="submit" className="btn-green">Continue</button>
            </div>
            <p className="mt-2 text-sm"><Link href="/register"><a className="font-bold underline">Sign up</a></Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginComponent
