import type { AuthFormValues } from './AuthFormikProvider'

import { Fragment } from 'react'
import { useAuthFormErrors, AuthFormErrors } from './AuthFormErrors'
import { CircularProgress, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { useFormikContext } from 'formik'
import { FormikTextInput } from '../../core/FormikTextInput'
import { Button } from '../../core/Button'

export const VerifyEmailForm = ({ closeModal }: VerifyEmailFormProps) => {
  const { isSubmitting, handleSubmit, submitForm } =
    useFormikContext<AuthFormValues>()

  const { authFormErrors } = useAuthFormErrors()
  const hasError = authFormErrors.length > 0

  return (
    <Fragment>
      {hasError && <AuthFormErrors />}

      <header className="flex items-center justify-between text-2xl font-proxima font-semibold">
        Sign up or Login
        <IconButton onClick={closeModal} classes={{ root: 'fill-current p-1' }}>
          <CloseIcon />
        </IconButton>
      </header>

      <form className="pt-5" onSubmit={handleSubmit}>
        <FormikTextInput fullWidth id="email" name="email" label="Your email" />

        <div className="pt-6">
          <Button
            fullWidth
            type="submit"
            disabled={hasError || isSubmitting}
            onClick={submitForm}
          >
            {isSubmitting && (
              <CircularProgress size={16} thickness={6} color="inherit" />
            )}
            <span className="pl-2">Continue</span>
          </Button>
        </div>
      </form>
    </Fragment>
  )
}

// eslint-disable-next-line import/no-default-export
export default VerifyEmailForm

type VerifyEmailFormProps = {
  closeModal: () => void
}
