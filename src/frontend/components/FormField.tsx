import React from 'react'
import { Field } from 'formik'
import { CloseIcon } from './icons/CloseIcon'
type FormFieldProps = {
  label: string,
  additionalClass: string,
  type: string,
  onShow: string
}
const FormField = ({ label, additionalClass, type, onShow }: FormFieldProps) => {
  return (
    <>
      <label className='font-sans text-gray-700 font-semibold text-sm leading-3' htmlFor="email">{label}</label>
      <Field
        className={"border focus:outline-none rounded-lg bg-primary-100 focus:bg-white hover:border-primary py-2 px-2 mb-4 w-full appearance-none " + additionalClass}
        id={type}
        name={type}
        type={onShow}
        components={<CloseIcon className='w-6 mb-4 font-thin' />}
      />

    </>
  )
}

export default FormField