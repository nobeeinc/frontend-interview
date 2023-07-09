import React from 'react'
type ErrorMessageProps = {
  errMessage: string
}
const ErrorMessage = ({ errMessage }: ErrorMessageProps) => {
  return (
    <div className='font-sans text-sm font-normal border-secondary-300'>{errMessage}</div>
  )
}

export default ErrorMessage