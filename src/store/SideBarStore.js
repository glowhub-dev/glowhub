let sideBarStatus = window.localStorage.getItem("sidebar") || false

export const getSideBarStatus = () => {
  return sideBarStatus === 'true'
}

export const setSidebarStore = (status) => {
  window.localStorage.setItem("sidebar", status)
  sideBarStatus = status
}