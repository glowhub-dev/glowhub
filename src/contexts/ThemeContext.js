import { createContext, useState, useEffect } from "react"
import { getThemeSelected, setThemeSelected } from "../store/ThemeStore"

export const ThemeContext = createContext()

export default function AccountContextProvider({ children }) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    theme === 'light'
      ? document.body.classList.add('light-mode')
      : document.body.classList.remove('light-mode')
  }, [theme])

  useEffect(() => {
    getThemeSelected() && setTheme(getThemeSelected())
  }, [])

  const setThemeContext = (theme) => {
    setThemeSelected(theme)
    setTheme(theme)
  }

  const value = { theme, setThemeContext }
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}