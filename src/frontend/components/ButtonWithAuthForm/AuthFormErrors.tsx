import type { AuthFormValues } from './AuthFormikProvider'

import { useFormikContext } from 'formik'
import { useAuthStep } from '../../store/common/auth-form-step'

export const AuthFormErrors = () => {
  const { authFormErrors } = useAuthFormErrors()

  if (authFormErrors.length <= 0) {
    return null
  }

  return (
    <ul className="border border-danger md:py-4 md:rounded-t-xl -mx-5 -mt-5 mb-6 px-5 py-3 bg-red-50 text-sm">
      {authFormErrors.map((error) => {
        if (error === 'Invalid credentials') {
          return (
            <li key={error}>
              {`The password you entered is incorrect, please try again! `}
            </li>
          )
        }
        return <li key={error}>{error}</li>
      })}
    </ul>
  )
}

export const useAuthFormErrors = () => {
  const { touched, errors } = useFormikContext<AuthFormValues>()
  const { authStep } = useAuthStep()

  const getErrorMessages = () => {
    if (authStep === 'verify-email') {
      return Object.entries(errors).reduce((acc, [field, error]) => {
        if (field === 'email' && touched[field]) {
          return [...acc, error]
        }
        return acc
      }, [] as string[])
    }

    if (authStep === 'login') {
      return Object.entries(errors).reduce((acc, [field, error]) => {
        if ((field === 'email' || field === 'password') && touched[field]) {
          return [...acc, error]
        }
        return acc
      }, [] as string[])
    }

    if (authStep === 'register') {
      return Object.entries(errors).reduce((acc, [field, error]) => {
        if (
          (field === 'email' ||
            field === 'password' ||
            field === 'confirmPassword') &&
          touched[field]
        ) {
          return [...acc, error]
        }
        return acc
      }, [] as string[])
    }
    return []
  }

  return {
    authFormErrors: getErrorMessages(),
  }
}
