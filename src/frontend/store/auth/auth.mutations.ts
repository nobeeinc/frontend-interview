import type { Auth } from './auth.api'

import { useMutation, useQueryClient } from 'react-query'
import { AUTH, CURRENT_USER } from '../../constant'
import { useAuth } from './auth.queries'
import { checkEmail, register, logout, login } from './auth.api'

export const useLogin = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: login,
    onSuccess: (auth) => {
      queryClient.setQueryData<Auth>(AUTH, auth)
    },
  })

  return {
    login: mutateAsync,
    ...rest,
  }
}

export const useRegister = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: register,
    onSuccess: (auth) => {
      queryClient.setQueryData(AUTH, auth)
    },
  })

  return {
    register: mutateAsync,
    ...rest,
  }
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const { auth } = useAuth()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: logout(auth?.accessToken),
    onSuccess: () => {
      queryClient.setQueryData(AUTH, undefined)
      queryClient.setQueryData(CURRENT_USER, undefined)
    },
    onError: () => {
      queryClient.setQueryData(AUTH, undefined)
      queryClient.setQueryData(CURRENT_USER, undefined)
    },
  })

  return {
    logout: mutateAsync,
    ...rest,
  }
}

export const useVerifyEmail = () => {
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: checkEmail,
  })

  return {
    checkEmail: mutateAsync,
    ...rest,
  }
}
