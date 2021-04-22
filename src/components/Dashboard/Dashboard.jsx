import React from 'react'
import SideBar from './SideBar'
import './Dashboard.scss'
import DashboardTopNav from './DashboardTopNav'

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
