import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
//import { logout } from '../../store/AccessTokenStore'

const Nav = () => {
  const { user } = useContext(AuthContext)

  return (
    <>
      <Link to="/" className="navLink">Home</Link>
      <Link to="/" className="navLink">Overview</Link>
      <Link to="/" className="navLink">Pricing</Link>
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
