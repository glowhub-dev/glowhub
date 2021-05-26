import { createContext, useState, useEffect } from "react"
import { getSideBarStatus, setSidebarStore } from "../store/SideBarStore"

export const SideBarContext = createContext()

export default function AccountContextProvider({ children }) {
  const [sidebar, setSidebar] = useState(false)

  useEffect(() => {
    getSideBarStatus() && setSidebar(getSideBarStatus())
  }, [])

  const setSidebarStatus = (status) => {
    setSidebarStore(status)
    setSidebar(status)
  }

  const value = { sidebar, setSidebarStatus }
  return <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
}