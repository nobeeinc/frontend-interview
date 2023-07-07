import React from 'react'
type ErrorMessageProps = {
  errMessage: string
}
const ErrorMessage = ({ errMessage }: ErrorMessageProps) => {
  return (
    <div>{errMessage}</div>
  )
}

export default ErrorMessage