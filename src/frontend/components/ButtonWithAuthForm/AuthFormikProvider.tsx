import type { FormikHelpers } from 'formik'
import type { ReactNode } from 'react'
import { object, string, ref } from 'yup'
import { useAuthStep } from '../../store/common/auth-form-step'
import { ErrorHandler } from '../../core/utils/errors'
import { Formik } from 'formik'
import {
  useVerifyEmail,
  useRegister,
  useLogin,
} from '../../store/auth/auth.mutations'

export const AuthFormikProvider = ({
  children,
  closeModal,
}: AuthFormProviderProps) => {
  const { authStep, setAuthStep } = useAuthStep()
  const { checkEmail } = useVerifyEmail()
  const { register } = useRegister()
  const { login } = useLogin()

  const getValidationSchema = () => {
    if (authStep === 'verify-email') {
      return verifyEmailFormValidationSchema
    }
    if (authStep === 'login') {
      return loginFormValidationSchema
    }
    if (authStep === 'register') {
      return registerFormValidationSchema
    }
    throw new ErrorHandler("Invalid 'authStep'")
  }

  const handleSubmit = (
    values: AuthFormValues,
    { setSubmitting, setTouched, setFieldError }: FormikHelpers<AuthFormValues>
  ) => {
    if (authStep === 'verify-email') {
      checkEmail(values.email)
        .then(() => {
          setAuthStep('login')
        })
        .catch(() => {
          setAuthStep('register')
        })
        .finally(() => {
          setTouched({})
          setSubmitting(false)
        })
    }
    if (authStep === 'login') {
      login({ email: values.email, password: values.password })
        .then(() => {
          closeModal()
        })
        .catch((e) => {
          if (e.response.status === 401) {
            setFieldError('password', 'Invalid credentials')
          }
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
    if (authStep === 'register') {
      register(values)
        .then(() => {
          closeModal()
        })
        .catch((e) => {
          if (e?.response?.status === 422) {
            setFieldError('email', e?.response?.data.message)
          }
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  }

  return (
    <Formik<AuthFormValues>
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={getValidationSchema()}
      onSubmit={handleSubmit}
    >
      {children}
    </Formik>
  )
}

const emailSchema = string()
  .email('Invalid email')
  .max(255, 'Email is too long')
  .required('Email is required')

const passwordSchema = string()
  .min(8, 'Password must include more than 8 characters')
  .max(255, 'Password must include less than 255 characters')
  .test({
    name: 'atLeastOneUppercase',
    message: 'Password must include at least 1 uppercase letter',
    exclusive: true,
    test: (value) => value === undefined || matchRegex(value, /[A-Z]/g) >= 1,
  })
  .test({
    name: 'atLeastOneNumber',
    message: 'Password must include at least 1 number',
    exclusive: true,
    test: (value) => value === undefined || matchRegex(value, /[0-9]/g) >= 1,
  })
  .test({
    name: 'atLeastOneSymbol',
    message: 'Password must include at least 1 symbol',
    exclusive: true,
    test: (value) =>
      value === undefined || matchRegex(value, /[^a-zA-Z0-9\s]/g) >= 1,
  })
  .required('Password is required')

const confirmPasswordSchema = string().oneOf(
  [ref('password')],
  'Passwords must match'
)

const verifyEmailFormValidationSchema = object().shape({
  email: emailSchema,
})

const loginFormValidationSchema = object().shape({
  email: emailSchema,
  password: string().required('Password is required'),
})

const registerFormValidationSchema = object().shape({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
})

const matchRegex = (string: string, regex: RegExp) => {
  const matches = regex.exec(string) ?? []
  return matches.length
}

type AuthFormProviderProps = {
  children: ReactNode
  closeModal: () => void
}

export type AuthFormValues = {
  email: string
  password: string
  confirmPassword: string
}
