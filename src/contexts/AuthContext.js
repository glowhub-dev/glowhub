import { createContext, useEffect, useState } from "react"
import { getUserInfo } from "../services/UserService"
import { getAccessToken } from "../store/AccessTokenStore"

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState()

  const getUser = () => {
    return getUserInfo().then(res => setUser(res))
  }

  useEffect(() => {
    getAccessToken() && getUser().catch((e) => { console.log(e) })
  }, [])

  const value = { user, getUser }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}