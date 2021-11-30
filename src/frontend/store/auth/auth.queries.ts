import type { Auth } from './auth.api'

import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import { getUserInfo, keepLogin } from './auth.api'
import { AUTH, CURRENT_USER } from '../../constant'
import { useEffect } from 'react'
import { setCookie } from 'nookies'

export const useCurrentUser = () => {
  const { auth, isFetched: isAuthFetched } = useAuth()

  const {
    data: currentUser,
    isLoading: isLoadingUser,
    ...rest
  } = useQuery(CURRENT_USER, getUserInfo(auth?.accessToken), {
    enabled: Boolean(auth?.accessToken),
  })

  return {
    currentUser,
    isLoading: !isAuthFetched || isLoadingUser,
    ...rest,
  }
}

export const useAuth = () => {
  const queryClient = useQueryClient()
  const auth = queryClient.getQueryData<Auth>(AUTH)

  const queryFn =
    auth?.hasTriedKeepLogin === 'true'
      ? () => {
          throw new Error('Keep Login fail')
        }
      : keepLogin

  const { data, ...rest } = useQuery<Auth>({
    queryKey: AUTH,
    queryFn,
    retry: false,
    refetchInterval: 10 * 60 * 1000,
    refetchIntervalInBackground: true,
    onError: () => {
      if (auth?.accessToken) {
        location.href = '/'
      } else {
        queryClient.setQueryData<Auth>(AUTH, { hasTriedKeepLogin: 'true' })
      }
    },
  })

  const accessToken = auth?.accessToken

  if (accessToken) setCookie(null, 'accessToken', accessToken)

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.Authorization = `Bearer ${accessToken}`
    }
  }, [accessToken])

  return { auth: data, ...rest }
}
