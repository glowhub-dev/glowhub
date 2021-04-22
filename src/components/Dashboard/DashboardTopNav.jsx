import React from 'react'
import './DashboardTopNav.scss'

const DashboardTopNav = () => {
  return (
    <div className="DashboardTopNav">
      <div>
        <input type="text" className="searchBar" placeholder="Search accounts" />
      </div>
      <div>
        Feedback
      </div>
    </div>
  )
}

export default DashboardTopNav
