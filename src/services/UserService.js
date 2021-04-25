import { create } from "./BaseService";

const http = create()

export const getUserInfo = () => {
  return http.get('/user/me')
}

export const isUserLoggedIn = () => {
  http.get('/user/me')
    .then(() => true)
    .catch(() => false)
}