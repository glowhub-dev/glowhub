import React from 'react'
import './SideBar.scss'

const SideBar = () => {
  return (
    <div className="SideBar">
      <div className="logoSection">
        <img src="/glowhub.svg" alt="glowhub logo" />
      </div>
      <div className="nav">

        <div className="secction">
          <a href="/" className="active">Dashboard</a>
          <a href="/">Manage accounts</a>
        </div>

        <div className="secction">
          <div className="heading">PRODUCTS</div>
          <a href="/">Analytics</a>
          <a href="/">Cookies</a>
          <a href="/">Feedback</a>
        </div>

        <div className="secction">
          <div className="heading">ACCOUNT</div>
          <a href="/">Accounts</a>
          <a href="/">Settings</a>
          <a href="/">Profile</a>
          <a href="/">Plan & billing</a>
        </div>

      </div>
    </div>
  )
}

export default SideBar
