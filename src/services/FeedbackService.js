import { create } from "./BaseService";

const http = create()

export const getFeedbackWidget = (account) => {
  return http.get(`/feedback/getdata/${account}`)
}
