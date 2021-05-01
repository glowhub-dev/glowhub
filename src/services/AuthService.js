import { create } from "./BaseService";

const http = create({
  useAccessToken: false,
  logoutOnUnauthorized: false,
})

export const login = (body) => {
  return http.post('/authenticate', body)
}

export const githubLogin = (code) => {
  return http.get(`/github-cb/?code=${code}`)
}

export const register = (body) => {
  return http.post('/register', body)
}

export const resetLink = (body) => {
  return http.post('/user/reset-link', body)
}

export const resetPassword = (body) => {
  return http.post(`/user/reset-password`, body)
}