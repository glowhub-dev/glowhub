import { create } from "./BaseService";

const http = create()

export const getCookiesWidget = (account) => {
  return http.get(`/cookies/getdata/${account}`)
}