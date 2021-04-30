import { create } from "./BaseService";

const http = create()

export const getCookiesWidget = (account) => {
  return http.get(`/cookies/getdata/${account}`)
}

export const getTotalCookiesWidget = (account) => {
  return http.get(`/cookies/gettotaldata/${account}`)
}