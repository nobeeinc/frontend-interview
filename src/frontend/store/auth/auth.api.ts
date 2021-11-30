import type { AxiosResponse } from 'axios'

import axios from 'axios'

export const checkEmail = (email: string) => {
  return axios.request({
    method: 'HEAD',
    url: `/api/auth/emails/${email}`,
  })
}

export const login = ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  return axios
    .request<Auth>({
      method: 'POST',
      url: '/api/auth/login',
      data: {
        email,
        password,
      },
    })
    .then(convertAuthResponse)
}

export const register = ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  return axios
    .request<Auth>({
      method: 'POST',
      url: '/api/auth/register',
      data: {
        email,
        password,
      },
    })
    .then(convertAuthResponse)
}

export const getUserInfo = (accessToken?: string) => () => {
  return axios
    .request({
      method: 'GET',
      url: '/api/auth/user',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(convertUserResponse)
}

export const logout = (accessToken?: string) => () => {
  return axios.request({
    method: 'POST',
    url: '/api/auth/logout',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const keepLogin = () => {
  return axios
    .request<Auth>({
      method: 'POST',
      url: '/api/auth/keep-login',
    })
    .then(convertAuthResponse)
}

const convertAuthResponse = (res: AxiosResponse<Auth>) => ({
  accessToken: res.data.accessToken,
  tokenExpiresAt: res.data.tokenExpiresAt,
})

const convertUserResponse = (
  res: AxiosResponse<FetchUserResponse>
): CurrentUser => {
  return {
    id: res.data.userId,
    email: res.data.email,
  }
}

export type Auth = {
  accessToken?: string
  tokenExpiresAt?: string
  createdByAdmin?: boolean
  hasTriedKeepLogin?: 'true'
}

export type CurrentUser = {
  id: number
  email: string
}

type FetchUserResponse = {
  userId: number
  email: string
}
