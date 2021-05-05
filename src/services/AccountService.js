import { create } from "./BaseService";

const http = create()

export const createWebAccount = (body) => {
  return http.post('/accounts/create', body)
}

export const editWebAccount = (id, body) => {
  return http.post(`/accounts/update/${id}`, body)
}

export const getAccount = (id) => {
  return http.get(`/accounts/get/${id}`)
}

export const deleteAccount = (id) => {
  return http.delete(`/accounts/delete/${id}`)
}

export const createCheckout = (body) => {
  return http.post(`/create-checkout-session`, body)
}

export const cancelSubscription = (body) => {
  return http.post(`/cancel-subs`, body)
}