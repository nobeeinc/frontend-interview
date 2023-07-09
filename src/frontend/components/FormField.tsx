import React from 'react'
import { Field } from 'formik'
import { CloseIcon } from './icons/CloseIcon'
type FormFieldProps = {
  label: string,
  additionalClass: string,
  name: string,
  onShow: string,
  id: string
}
const FormField = ({ label, additionalClass, name, onShow, id }: FormFieldProps) => {
  return (
    <>
      <label className='font-sans text-gray-700 font-semibold text-sm leading-3' htmlFor="email">{label}</label>
      <Field
        className={"border focus:outline-none rounded-lg bg-primary-100 focus:bg-white hover:border-primary py-2 px-2 mb-4 w-full appearance-none " + additionalClass}
        id={id}
        name={name}
        type={onShow}
      />

    </>
  )
}

export default FormField