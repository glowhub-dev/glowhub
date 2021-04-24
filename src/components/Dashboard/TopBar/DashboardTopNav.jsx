import React from 'react'
import { logout } from '../../../store/AccessTokenStore'
import './DashboardTopNav.scss'
import { FiSearch } from "react-icons/fi";

const DashboardTopNav = () => {
  return (
    <div className="DashboardTopNav">
      <div>
        <FiSearch className="me-1" /> Seach account
      </div>
      <div className="nav">
        <a href="/">Feedback</a>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default DashboardTopNav
