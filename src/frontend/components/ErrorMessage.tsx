import React from 'react'
type ErrorMessageProps = {
  errMessage: string
}
const ErrorMessage = ({ errMessage }: ErrorMessageProps) => {
  return (
    <div className="font-sans text-sm font-normal bg-danger-custom-1 text-danger">
      {errMessage}
    </div>
  )
}

export default ErrorMessage
