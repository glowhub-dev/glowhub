import { create } from "./BaseService";

const http = create()

export const getViewsOnline = (account) => {
  return http.get(`/analytics/getViewsOnline/${account}`)
}

export const getViewsOnlineHomeWidget = (account) => {
  return http.get(`/analytics/getViewsOnlineHomeWidget/${account}`)
}

export const getAnalyticsHomeWidget = (account) => {
  return http.get(`/analytics/getAnalyticsHomeWidget/${account}`)
}

export const getViews = ({ account, params }) => {
  return http.get(`/analytics/getFullViews/${account}`, { params })
}

export const getTotalAudicence = ({ account, params }) => {
  return http.get(`/analytics/getTotalAudicence/${account}`, { params })
}