import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <>
      <Link to="/" className="navLink">Home</Link>
      <Link to="/" className="navLink">Overview</Link>
      <Link to="/" className="navLink">Pricing</Link>
      <Link to="/register" className="navLink">Register</Link>
      <Link to="/" className="navLink">Login</Link>
    </>
  )
}

export default Nav
