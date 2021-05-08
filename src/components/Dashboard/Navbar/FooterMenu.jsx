import React from 'react'
import { FiGrid, FiMessageSquare, FiPieChart, FiShield } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import './FooterMenu.scss'

const FooterMenu = () => {
  return (
    <div className="FooterMenu d-block d-md-none">
      <div className="nav">
        <NavLink to='/analytics' className="link" activeClassName="active">
          <span className="icon"><FiPieChart /></span>
          <div>Analytics</div>
        </NavLink>
        <NavLink to='/cookies' className="link" activeClassName="active">
          <span className="icon"><FiShield /></span>
          <div>Cookies</div>
        </NavLink>
        <NavLink to='/feedback' className="link" activeClassName="active">
          <span className="icon"><FiMessageSquare /></span>
          <div>Feedback</div>
        </NavLink>
        <NavLink to='/manage-accounts' className="link" activeClassName="active">
          <span className="icon"><FiGrid /></span>
          <div>Accounts</div>
        </NavLink>
      </div>
    </div>
  )
}

export default FooterMenu
