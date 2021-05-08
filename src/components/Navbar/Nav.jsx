import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
//import { logout } from '../../store/AccessTokenStore'

const Nav = () => {
  const { user } = useContext(AuthContext)

  return (
    <>
      <a href="https://glowhub.dev/" className="navLink">Home</a>
      <a href="https://glowhub.dev/#cookies" className="navLink">Cookies</a>
      <a href="https://glowhub.dev/#analytics" to="/" className="navLink">Analytics</a>
      <a href="https://glowhub.dev/#feedback" className="navLink">Feedback</a>
      <a href="https://glowhub.dev/pricing" className="navLink">Pricing</a>
      {
        !user
          ? (<><Link to="/register" className="navLink">Register</Link>
            <Link to="/" className="navLink">Login</Link></>)
          : (<><Link to="/dashboard" className="navLink">Dashboard</Link>
            <Link to="/" className="navLink">Logout</Link></>)
      }
    </>
  )
}

export default Nav
