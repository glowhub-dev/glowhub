import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {

  return (
    <>
      <Link to="/dashboard" className="navLink">Dashboard</Link>
      <Link to="/manage-accounts" className="navLink">Accounts</Link>
      <Link to="/analytics" className="navLink">Analytics</Link>
      <Link to="/cookies" className="navLink">Cookies</Link>
      <Link to="/feedback" className="navLink">Feedback</Link>
    </>
  )
}

export default Nav
