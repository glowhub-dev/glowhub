import { create } from "./BaseService";

const http = create()

export const getFeedbackWidget = (account) => {
  return http.get(`/feedback/getdata/${account}`)
}

export const getTotalFeedbackWidget = (account) => {
  return http.get(`/feedback/gettotaldata/${account}`)
}

export const getBanner = (account) => {
  return http.get(`/feedback/banner/${account}`)
}

export const updateBanner = (account, body) => {
  return http.put(`/feedback/config/${account}`, body)
}