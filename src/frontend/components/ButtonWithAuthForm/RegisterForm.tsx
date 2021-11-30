import type { AuthFormValues } from './AuthFormikProvider'

import { Fragment } from 'react'
import { useAuthFormErrors, AuthFormErrors } from './AuthFormErrors'
import { CircularProgress, IconButton } from '@mui/material'
import { FormikPasswordInput } from '../../core/FormikPasswordInput'
import { ArrowBack, Close } from '@mui/icons-material'
import { useFormikContext } from 'formik'
import { FormikTextInput } from '../../core/FormikTextInput'
import { Button } from '../../core/Button'
import { useAuthStep } from '../../store/common/auth-form-step'

export const RegisterForm = ({ closeModal }: RegisterFormProps) => {
  const { setAuthStep } = useAuthStep()
  const {
    initialValues,
    values,
    isSubmitting,
    handleSubmit,
    submitForm,
    resetForm,
  } = useFormikContext<AuthFormValues>()

  const { authFormErrors } = useAuthFormErrors()
  const hasError = authFormErrors.length > 0

  return (
    <Fragment>
      <header className="-ml-1 -mr-1 flex items-center justify-between text-2xl font-proxima font-semibold">
        <IconButton
          classes={{ root: 'p-1' }}
          onClick={() => {
            resetForm({
              values: {
                ...initialValues,
                email: values.email,
              },
            })
            setAuthStep('verify-email')
          }}
        >
          <ArrowBack classes={{ root: 'fill-current' }} />
        </IconButton>
        Sign up
        <IconButton onClick={closeModal} classes={{ root: 'p-1' }}>
          <Close classes={{ root: 'fill-current' }} />
        </IconButton>
      </header>

      {hasError && <AuthFormErrors />}

      <form className="pt-5" onSubmit={handleSubmit}>
        <div className="pt-3">
          <FormikTextInput
            fullWidth
            id="email"
            name="email"
            label="Your email"
          />
        </div>

        <div className="pt-3">
          <FormikPasswordInput
            fullWidth
            id="password"
            name="password"
            label="Password"
          />
        </div>

        <div className="pt-3">
          <FormikPasswordInput
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
          />
        </div>

        <div className="pt-6">
          <Button fullWidth type="submit" onClick={submitForm}>
            {isSubmitting && (
              <CircularProgress size={16} thickness={6} color="inherit" />
            )}
            <span className="pl-2">Continue</span>
          </Button>
        </div>
      </form>

      <div className="pt-6">
        <p>
          {`Already have an account? `}
          <a
            href="#"
            className="font-semibold underline hover:text-grayscale-500"
            onClick={(e) => {
              e.preventDefault()
              resetForm()
              setAuthStep('verify-email')
            }}
          >
            Login
          </a>
        </p>
      </div>
    </Fragment>
  )
}

// eslint-disable-next-line import/no-default-export
export default RegisterForm

type RegisterFormProps = {
  closeModal: () => void
}
