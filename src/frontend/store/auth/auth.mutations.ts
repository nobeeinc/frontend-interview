import type { Auth } from './auth.api'

import { useMutation, useQueryClient } from 'react-query'
import { AUTH, CURRENT_USER } from '../../constant'
import { useAuth } from './auth.queries'
import { checkEmail, register, logout, login } from './auth.api'
import { destroyCookie, setCookie } from 'nookies'

export const useLogin = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: login,
    onSuccess: (auth) => {
      if (auth?.accessToken) setCookie(null, 'accessToken', auth.accessToken)
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
      if (auth?.accessToken) setCookie(null, 'accessToken', auth.accessToken)
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
      destroyCookie(null, 'accessToken')
      queryClient.setQueryData(AUTH, undefined)
      queryClient.setQueryData(CURRENT_USER, undefined)
    },
    onError: () => {
      destroyCookie(null, 'accessToken')
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
