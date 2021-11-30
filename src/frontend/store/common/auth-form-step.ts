import { useQueryClient, useQuery } from 'react-query'
import { AUTH_FORM_STEP } from '../../constant'

const DEFAULT_AUTH_STEP = 'verify-email'

export const useAuthStep = () => {
  const queryClient = useQueryClient()

  const { data: authStep = DEFAULT_AUTH_STEP } = useQuery(
    AUTH_FORM_STEP,
    (): AuthStep => DEFAULT_AUTH_STEP
  )

  const setAuthStep = (step: AuthStep) => {
    queryClient.setQueryData<AuthStep>(AUTH_FORM_STEP, step)
  }

  return { authStep, setAuthStep }
}

type AuthStep = 'verify-email' | 'login' | 'register'
