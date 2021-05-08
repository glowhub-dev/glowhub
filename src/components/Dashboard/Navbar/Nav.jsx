import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {

  return (
    <>
      <Link to="/dashboard" className="navLink">Dashboard</Link>
      <Link to="/analytics" className="navLink">Analytics</Link>
      <Link to="/cookies" className="navLink">Cookies</Link>
      <Link to="/feedback" className="navLink">Feedback</Link>
      <Link to="/manage-accounts" className="navLink">Accounts</Link>
      <Link to="/profile" className="navLink">Profile</Link>
      <Link to="/plan" className="navLink">Plan</Link>
    </>
  )
}

export default Nav
