import React, { useState } from 'react';
import axios from 'axios';
import {useFormik} from 'formik'; 
import * as yup from 'yup';
import { Button, FormLabel, IconButton, Input, InputAdornment, Link, TextField } from '@mui/material';
import { CloseIcon } from './icons/CloseIcon';
import { BackIcon } from './icons/BackIcon';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/dist/client/router';


export const LoginForm = () => {
  const [visibility, setVisibility] = useState(true);

  const toggleVisibility = (e: any) => {
    setVisibility(!visibility);
  };

  const router = useRouter();
  const queryEmail = router.query.email;
  const URL = "http://localhost:3000/signup/" + queryEmail;

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email address!").required("Email is required!"),
    password: yup.string().required("Password is required!")
  })

  const formik = useFormik({
    initialValues: {
      email: queryEmail,
      password: "",
    },
    onSubmit: ()  => {
      axios.post("http://localhost:3000/api/auth/login", formik.values)
      .then((response) => {
        if (response.status === 200) {
          console.log("Login successful!");
        }
      })
      .catch((error: any) => { formik.setFieldError("email", error.response.data.message) });
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="form">
      <div className="form-header">
        <IconButton href="http://localhost:3000/">
          <BackIcon className="h-6 w-6 fill-current text-black"/>
        </IconButton>
        Login
        <IconButton href="http://localhost:3000/"> 
          <CloseIcon className="h-6 w-6 fill-current text-black"/> 
        </IconButton>
      </div>
      {(formik.touched.email && Boolean(formik.errors.email))
        || (formik.touched.password && Boolean(formik.errors.password))?
        <div className="error-message">
          <div>{formik.errors.email}</div>
          <div>{formik.errors.password}</div>
        </div>
      : null}
      <form className="form-body" onSubmit={formik.handleSubmit}>
        <FormLabel className="form-label"> Your email </FormLabel>
        <TextField 
          className="form-input" 
          id="email"
          name="email"
          size='small'
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
          type= {visibility? "text": "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          InputProps={{endAdornment: <InputAdornment position="end">
            <IconButton onClick={toggleVisibility}>
              {visibility?<VisibilityOff/>:<Visibility/>}
            </IconButton>
          </InputAdornment>}}  
        />
        <Button type="submit" variant="contained" className="button" disableElevation>Continue</Button>
        <Link href={URL} className='font-bold text-black px-1 py-3'>Sign up</Link>
      </form>
    </div>
  )
}
