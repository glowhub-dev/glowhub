import React from 'react'
import PropTypes from 'prop-types';
import { logout } from '../../../store/AccessTokenStore'
import './DashboardTopNav.scss'
import { FiLogOut, FiRepeat, FiUser } from "react-icons/fi";

const DashboardTopNav = ({ changeAccount }) => {
  return (
    <div className="DashboardTopNav">
      <div onClick={changeAccount} className="w-100 acc__search">
        <FiRepeat className="me-1" /> Change account
        <small className="ms-2 keyCmd">Ctrl + /</small>
      </div>
      <div className="nav">
        <a href="/profile" className="d-flex align-items-center"><FiUser className="me-2" /> Profile</a>
        <button onClick={logout} className="d-flex align-items-center"><FiLogOut className="me-2" />Logout</button>
      </div>
    </div>
  )
}

DashboardTopNav.propTypes = {
  changeAccount: PropTypes.func.isRequired
}

export default DashboardTopNav
