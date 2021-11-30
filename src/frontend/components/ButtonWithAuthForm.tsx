import type { RenderButtonFn, RenderModalFn } from '../core/ButtonWithModal'

import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { AuthFormikProvider } from './ButtonWithAuthForm/AuthFormikProvider'
import { ButtonWithModal } from '../core/ButtonWithModal'
import { useAuthStep } from '../store/common/auth-form-step'
import { Slide } from '@mui/material'

const VerifyEmailForm = dynamic(
  () => import('./ButtonWithAuthForm/VerifyEmailForm')
)
const RegisterForm = dynamic(() => import('./ButtonWithAuthForm/RegisterForm'))
const LoginForm = dynamic(() => import('./ButtonWithAuthForm/LoginForm'))

export const ButtonWithAuthForm = ({
  renderButton,
}: ButtonWithAuthFormProps) => {
  return <ButtonWithModal renderButton={renderButton} renderModal={AuthForm} />
}

const AuthForm: RenderModalFn = ({ Modal, isModalOpen, closeModal }) => {
  const { authStep, setAuthStep } = useAuthStep()

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      closeAfterTransition
      disableScrollLock
      onBackdropClick={(e) => {
        e.stopPropagation()
      }}
    >
      <Slide
        in={isModalOpen}
        direction="right"
        onExited={() => {
          setAuthStep('verify-email')
        }}
      >
        <div
          className="bg-white p-5 modal"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <AuthFormikProvider closeModal={closeModal}>
            <Fragment>
              {authStep === 'verify-email' && (
                <VerifyEmailForm closeModal={closeModal} />
              )}
              {authStep === 'register' && (
                <RegisterForm closeModal={closeModal} />
              )}
              {authStep === 'login' && <LoginForm closeModal={closeModal} />}
            </Fragment>
          </AuthFormikProvider>
        </div>
      </Slide>
    </Modal>
  )
}

type ButtonWithAuthFormProps = {
  renderButton: RenderButtonFn
}
