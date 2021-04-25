import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './SideBar.scss'
import { FiHome, FiGrid, FiBarChart, FiMessageSquare, FiShield, FiUser, FiSettings, FiCreditCard } from "react-icons/fi";

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
          <NavLink to="/dashboard" activeClassName="active"><FiHome className="me-1" /> Dashboard</NavLink>
          <NavLink to="/manage-accounts" activeClassName="active"><FiGrid className="me-1" /> Manage accounts</NavLink>
        </div>

        <div className="secction">
          <div className="heading">PRODUCTS</div>
          <NavLink to="/analytics"><FiBarChart className="me-1" /> Analytics</NavLink>
          <NavLink to="/cookies"><FiShield className="me-1" /> Cookies</NavLink>
          <NavLink to="/feedback"><FiMessageSquare className="me-1" /> Feedback</NavLink>
        </div>

        <div className="secction">
          <div className="heading">ACCOUNT</div>
          <NavLink to="/settings"><FiSettings className="me-1" /> Settings</NavLink>
          <NavLink to="/profile"><FiUser className="me-1" /> Profile</NavLink>
          <NavLink to="/plans"><FiCreditCard className="me-1" /> Plan & billing</NavLink>
        </div>

      </div>
    </div>
  )
}

export default SideBar
