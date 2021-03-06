let accountId = window.localStorage.getItem("account") || null

export const getAccount = () => accountId

export const setAccountStore = (clientID) => {
  window.localStorage.setItem("account", clientID)
  accountId = clientID
}

export const deleteAccountStore = () => {
  window.localStorage.removeItem("account")
}