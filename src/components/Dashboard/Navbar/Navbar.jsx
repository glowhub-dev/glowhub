import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import './Navbar.scss'

const Navbar = () => {
  return (
    <div className="Navbar d-block d-md-none">
      <div className="NavbarDesktop">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/dashboard">
            <img className="NavbarDesktop__img" src="/glowhub.svg" alt="glowhub logo" />
          </Link>
        </div>
      </div>

      <div className="MobileNav">
        <div className="container MobileNav__nav">
          <Nav />
        </div>
      </div>
    </div>
  )
}

export default Navbar
