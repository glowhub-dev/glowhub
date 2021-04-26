import { create } from "./BaseService";

const http = create()

export const getViewsOnline = (account) => {
  return http.get(`/analytics/getViewsOnline/${account}`)
}

export const getViewsOnlineHomeWidget = (account) => {
  return http.get(`/analytics/getViewsOnlineHomeWidget/${account}`)
}

export const getViews = (account) => {
  return http.get(`/analytics/getFullViews/${account}`)
}