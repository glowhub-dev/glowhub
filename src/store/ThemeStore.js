let themeSelected = window.localStorage.getItem("theme") || 'dark'

export const getThemeSelected = () => themeSelected

export const setThemeSelected = (theme) => {
  window.localStorage.setItem("theme", theme)
  themeSelected = theme
}