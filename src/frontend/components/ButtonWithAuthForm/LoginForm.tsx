import type { AuthFormValues } from './AuthFormikProvider'

import { Fragment } from 'react'
import { useAuthFormErrors, AuthFormErrors } from './AuthFormErrors'
import { CircularProgress, IconButton } from '@mui/material'
import { FormikPasswordInput } from '../../core/FormikPasswordInput'
import { useFormikContext } from 'formik'
import { ArrowBack, Close } from '@mui/icons-material'
import { FormikTextInput } from '../../core/FormikTextInput'
import { Button } from '../../core/Button'
import { useAuthStep } from '../../store/common/auth-form-step'

export const LoginForm = ({ closeModal }: LoginFormProps) => {
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
        Login
        <IconButton onClick={closeModal} classes={{ root: 'p-1' }}>
          <Close classes={{ root: 'fill-current' }} />
        </IconButton>
      </header>

      {hasError && <AuthFormErrors />}

      <form className="pt-5" onSubmit={handleSubmit}>
        <FormikTextInput fullWidth id="email" name="email" label="Your email" />

        <div className="pt-3">
          <FormikPasswordInput
            fullWidth
            id="password"
            name="password"
            label={
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-grayscale-500">
                  Password
                </span>
              </div>
            }
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
        <a
          href="#"
          className="font-semibold text-base underline hover:text-grayscale-500"
          onClick={(e) => {
            e.preventDefault()
            resetForm()
            setAuthStep('register')
          }}
        >
          Sign up
        </a>
      </div>
    </Fragment>
  )
}

// eslint-disable-next-line import/no-default-export
export default LoginForm

type LoginFormProps = {
  closeModal: () => void
}
