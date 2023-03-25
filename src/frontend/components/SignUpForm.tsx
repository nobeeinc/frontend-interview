import React from 'react';
import axios from 'axios';
import {useFormik} from 'formik'; 
import * as yup from 'yup';
import { Button, FormControl, FormHelperText, FormLabel, IconButton, Input, InputAdornment, Link, OutlinedInput, TextField } from '@mui/material';
import { CloseIcon } from './icons/CloseIcon';
import { BackIcon } from './icons/BackIcon';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/dist/client/router';
import Router from 'next/router';

export const SignUpForm = () => { 
  const passwordRules = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email address!").required("Email is required!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Password must be at least 8 characters long!")
      .max(255, "Password must be less than 255 characters long!")
      .matches(passwordRules, "Password must contain at least one uppercase letter, one number, and one symbol!"),
    confirmPassword: yup
      .string()
      .required("Passwords must match!")
      .oneOf([yup.ref("password"), null], "Passwords must match!"),
  });

  const router = useRouter();
  const queryEmail = router.query.email;
  const URL = "http://localhost:3000/login/" + queryEmail;

  const formik = useFormik({
    initialValues: {
      visibility: false,
      email: queryEmail,
      password: "",
      confirmPassword: "",
    },
    onSubmit: () => {
      axios.post("http://localhost:3000/api/auth/register", formik.values)
      .then((response) => {
        if (response.status === 200) {
          Router.push({pathname: '/login', query: {email: formik.values.email}});
        }
      })
      .catch((error: any) => { formik.setFieldError("email", error.response.data.message) });
    },
    validationSchema: validationSchema,
  });

  const toggleVisibility = (e: any) => {
    formik.setFieldValue("visibility", !formik.values.visibility);
  };

  return (
    <div className="form">
      <div className="form-header">
        <IconButton href="http://localhost:3000/">
          <BackIcon className="h-6 w-6 fill-current text-black"/>
        </IconButton>
        Sign Up
        <IconButton href="http://localhost:3000/"> 
          <CloseIcon className="h-6 w-6 fill-current text-black"/> 
        </IconButton>
      </div>
      {(formik.touched.email && Boolean(formik.errors.email))
        || (formik.touched.password && Boolean(formik.errors.password))
        || (formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword))?
        <div className="error-message">
          {(formik.touched.email? <div>{formik.errors.email}</div>: null)}
          {(formik.touched.password? <div>{formik.errors.password}</div>: null)}
          {(formik.touched.confirmPassword? <div>{formik.errors.confirmPassword}</div>: null)}
        </div>
      : null}
      <form className="form-body" onSubmit={formik.handleSubmit}>
        <FormLabel className="form-label"> Your email </FormLabel>
        <TextField
          className="form-input" 
          id="email"
          name="email"
          size="small"
          value={formik.values.email} 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} 
          error={formik.touched.email && Boolean(formik.errors.email)}
        />
        <FormLabel className="form-label"> Password </FormLabel>
        <TextField 
          className="form-input" 
          id="password"
          name="password"
          size="small"
          type= {formik.values.visibility? "text": "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          InputProps={{endAdornment: <InputAdornment position="end">
            <IconButton onClick={toggleVisibility}>
              {formik.values.visibility?<VisibilityOff/>:<Visibility/>}
            </IconButton>
          </InputAdornment>}}  
        />
        <FormLabel className="form-label"> Confirm password </FormLabel>
        <TextField 
          className="form-input" 
          id="confirmPassword"
          name="confirmPassword"
          size="small"
          type= {formik.values.visibility? "text": "password"}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          InputProps={{endAdornment: <InputAdornment position="end">
            <IconButton onClick={toggleVisibility}>
              {formik.values.visibility?<VisibilityOff/>:<Visibility/>}
            </IconButton>
          </InputAdornment>}}  
        />
        <Button type='submit' variant="contained" className="button" disableElevation>Continue</Button>
        <div className='flex flex-row items-center text-base font-normal'>
          Already have an account? 
          <Link href={URL} className='font-bold text-black px-1 py-3'>Login</Link>
        </div>
      </form>
    </div>
  )
}
