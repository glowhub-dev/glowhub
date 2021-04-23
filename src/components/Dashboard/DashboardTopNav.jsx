import React from 'react'
import './DashboardTopNav.scss'

const DashboardTopNav = () => {
  return (
    <div className="DashboardTopNav">
      <div>
        <input type="text" className="searchBar" placeholder="Search accounts" />
      </div>
      <div className="nav">
        <a href="/">Feedback</a>
        <a href="/">Logout</a>
      </div>
    </div>
  )
}

export default DashboardTopNav
