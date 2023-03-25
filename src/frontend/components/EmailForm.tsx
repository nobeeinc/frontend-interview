import React from 'react';
import axios from 'axios';
import {useFormik} from 'formik'; 
import * as yup from 'yup';
import { Button, FormControl, FormLabel, IconButton, Input, TextField } from '@mui/material';
import { CloseIcon } from './icons/CloseIcon';
import { formData } from '@frontend/types/formData';
import { authEmailsHandler } from '@backend/auth/authEmailsHandler';
import { useRouter } from 'next/dist/client/router';

export const EmailForm = () => {
  const router = useRouter();

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required")
  })

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    onSubmit: () => {
      axios.head("http://localhost:3000/api/auth/emails/" + formik.values.email)
      .then(response => { 
        console.log(response.status);
        if (response.status == 204) {
          router.push('/login/'+ formik.values.email);
        }
       })
       .catch(() => { router.push('/signup/' + formik.values.email); });
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="form">
      <div className="form-header">
        Sign up or Login
        <IconButton> 
          <CloseIcon className="h-6 w-6 fill-current text-black"/> 
        </IconButton>
      </div>
      {formik.touched.email && Boolean(formik.errors.email)?
        <div className="error-message">
          {formik.errors.email}
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
        <Button type="submit" variant="contained" className="button">Continue</Button>
      </form>
    </div>
  )
}
