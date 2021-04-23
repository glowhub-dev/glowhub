import { createContext, useState, useEffect } from "react"
import { getAccount, setAccountStore } from "../store/AccountStore"

export const AccountContext = createContext()

export default function AccountContextProvider({ children }) {
  const [account, setAccount] = useState()

  useEffect(() => {
    getAccount() && setAccount(getAccount())
  }, [])

  const setAccountID = (accID) => {
    setAccountStore(accID)
    setAccount(accID)
  }

  const value = { account, setAccountID }
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}