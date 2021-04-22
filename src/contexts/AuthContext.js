import { createContext, useEffect, useState } from "react"
import { getUserInfo } from "../services/UserService"
import { getAccessToken } from "../store/AccessTokenStore"

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState()

  const getUser = () => {
    return getUserInfo().then(res => setUser(res))
  }

  const isLogged = () => {
    return getUserInfo().then(u => u ? true : false).catch(() => false)
  }

  useEffect(() => {
    getAccessToken() && getUser().catch((e) => { console.log(e) })
  }, [])

  const value = { user, getUser, isLogged }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}