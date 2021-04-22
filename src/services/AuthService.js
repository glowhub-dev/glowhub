import { create } from "./BaseService";

const http = create({
  useAccessToken: false,
  logoutOnUnauthorized: false,
})

export const login = (body) => {
  return http.post('/authenticate', body)
}

export const register = (body) => {
  return http.post('/register', body)
}