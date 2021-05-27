import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { logout } from '../../../store/AccessTokenStore'
import './DashboardTopNav.scss'
import { FiLogOut, FiRepeat, FiUser, FiMoon, FiSun } from "react-icons/fi";
import { ThemeContext } from '../../../contexts/ThemeContext';

const DashboardTopNav = ({ changeAccount }) => {
  const { theme, setThemeContext } = useContext(ThemeContext)

  const toggleTheme = () => {
    if (theme === 'light') {
      setThemeContext('dark')
    } else {
      setThemeContext('light')
    }
  }

  return (
    <div className="DashboardTopNav">
      <div onClick={changeAccount} className="w-100 acc__search">
        <FiRepeat className="me-1" /> Change account
        <small className="ms-2 keyCmd">Ctrl + /</small>
      </div>
      <div className="nav">
        <a href="/profile" className="d-flex align-items-center"><FiUser className="me-2" /> Profile</a>
        <button onClick={toggleTheme} className="d-flex align-items-center">
          {
            theme === 'light'
              ? <><FiMoon className="me-2" /> Dark</>
              : <><FiSun className="me-2" /> Light</>
          }
        </button>
        <button onClick={logout} className="d-flex align-items-center"><FiLogOut className="me-2" />Logout</button>
      </div>
    </div>
  )
}

DashboardTopNav.propTypes = {
  changeAccount: PropTypes.func.isRequired
}

export default DashboardTopNav
