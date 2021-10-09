import { CloseIcon } from "./icons/CloseIcon";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import router from "next/router";
import { IconButton } from "@mui/material";
import { SubmitButton } from "./SubmitButton";
const EmailComponent = () => {
  const handleInput = (error: string | undefined, touch: boolean | undefined) => {
    if (error && touch) return "input-error";
    else return "input-right"
  }
  const validateEmail = async (email: string) => {
    try {
      const res = await axios.head(`http://localhost:3000/api/auth/emails/${email}`);
      router.push({
        pathname: '/login',
        query: { data: email }
      });
    }
    catch (error) {
      router.push({
        pathname: '/register',
        query: { data: email }
      })
    }
  }
  const EmailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address!').required('Email is required!'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      validateEmail(values.email);
    },
    validationSchema: EmailSchema
  });
  return (
    <>
      <div className="h-14 fixed z-20 w-full bg-white py-4 px-4 flex items-center justify-between">
        <h1 className="font-proxima text-2xl">Sign up or Login</h1>
        <IconButton onClick={() => router.push("/")}>
          <CloseIcon className="h-6 w-6 fill-current" />
        </IconButton>
      </div>

      <div className="pt-14">
        {formik.errors.email && formik.touched.email && (
          <p className="bg-error text-xs text-danger px-5 py-3">{formik.errors.email}</p>
        )}
        <div className="px-5">
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4 flex flex-col">
              <label htmlFor="email" className="font-sans text-xs text-gray-700 font-bold mb-1">Your email</label>
              <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
                className={handleInput(formik.errors.email, formik.touched.email)}
                spellCheck={false}
              />
            </div>
            <div className="mt-6">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EmailComponent
