import { create } from "./BaseService";

const http = create({
  useAccessToken: false,
  logoutOnUnauthorized: false,
})

export const login = (body) => {
  return http.post('/authorization', body)
}