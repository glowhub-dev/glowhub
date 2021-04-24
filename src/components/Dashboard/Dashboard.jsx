import React from 'react'
import SideBar from './SideBar/SideBar'
import './Dashboard.scss'
import DashboardTopNav from './TopBar/DashboardTopNav'

const Dashboard = ({ children }) => {
  return (
    <div className="Dashboard">
      <SideBar />
      <div className="content">
        <DashboardTopNav />
        <div className="children">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
