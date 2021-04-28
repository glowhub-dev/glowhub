import React from 'react'
import { logout } from '../../../store/AccessTokenStore'
import './DashboardTopNav.scss'
import { FiRepeat } from "react-icons/fi";

const DashboardTopNav = ({ changeAccount }) => {
  return (
    <div className="DashboardTopNav">
      <div onClick={changeAccount} className="w-100 acc__search">
        <FiRepeat className="me-1" /> Change account
      </div>
      <div className="nav">
        <a href="/">Feedback</a>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default DashboardTopNav
