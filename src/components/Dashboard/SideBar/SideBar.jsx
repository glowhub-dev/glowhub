import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './SideBar.scss'
import { FiHome, FiGrid, FiMessageSquare, FiShield, FiUser, FiCreditCard, FiPieChart } from "react-icons/fi";

const SideBar = () => {
  return (
    <div className="SideBar">
      <div className="logoSection">
        <Link to="/dashboard" className="logo">
          <img src="/glowhub.svg" alt="glowhub logo" />
        </Link>
      </div>
      <div className="nav">

        <div className="secction">
          <NavLink to="/dashboard" activeClassName="active"><FiHome style={{ marginTop: '-2px' }} className="me-1" /> Dashboard</NavLink>
        </div>

        <div className="secction">
          <div className="heading">PRODUCTS</div>
          <NavLink to="/analytics"><FiPieChart className="me-1" style={{ marginTop: '-2px' }} /> Analytics</NavLink>
          <NavLink to="/cookies"><FiShield className="me-1" style={{ marginTop: '-2px' }} /> Cookies</NavLink>
          <NavLink to="/feedback"><FiMessageSquare className="me-1" style={{ marginTop: '-2px' }} /> Feedback</NavLink>
        </div>

        <div className="secction">
          <div className="heading">ACCOUNT</div>
          <NavLink to="/manage-accounts" activeClassName="active"><FiGrid className="me-1" style={{ marginTop: '-2px' }} /> Manage accounts</NavLink>
          {/* <NavLink to="/settings"><FiSettings className="me-1" style={{ marginTop: '-2px' }} /> Settings</NavLink> */}
          <NavLink to="/profile"><FiUser className="me-1" style={{ marginTop: '-2px' }} /> Profile</NavLink>
          <NavLink to="/plan"><FiCreditCard className="me-1" style={{ marginTop: '-2px' }} /> Plan & billing</NavLink>
        </div>

      </div>
    </div>
  )
}

export default SideBar
