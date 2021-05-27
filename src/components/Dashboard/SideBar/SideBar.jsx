import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './SideBar.scss'
import { FiHome, FiGrid, FiMessageSquare, FiShield, FiUser, FiCreditCard, FiPieChart, FiZap } from "react-icons/fi";
import Popup from '../../Misc/Popup';
import { ThemeContext } from '../../../contexts/ThemeContext';

const SideBar = ({ sidebarCollapsed, changeSidebarCollapse }) => {
  const [whatsNewModal, setWhatsNewModal] = useState(false)
  const toggleWhatsNewModal = () => { setWhatsNewModal(!whatsNewModal) }
  const { theme } = useContext(ThemeContext)

  return (
    <>
      {
        sidebarCollapsed !== null
        &&
        <div className={!sidebarCollapsed ? 'SideBar' : 'SideBarCollapsed'}>
          <div className="logoSection">
            <div onClick={changeSidebarCollapse} className="logo">
              {
                theme === 'dark'
                  ? sidebarCollapsed
                    ? <img src="/icon.svg" alt="glowhub logo" />
                    : <img src="/glowhub.svg" alt="glowhub logo" />
                  : sidebarCollapsed
                    ? <img src="/icon-dark.svg" alt="glowhub logo" />
                    : <img src="/glowhub-dark.svg" alt="glowhub logo" />
              }
            </div>
          </div>
          <div className="nav">

            <div className="secction">
              <NavLink to="/dashboard" activeClassName="active">
                <FiHome style={{ marginTop: '-2px' }} className={!sidebarCollapsed && 'me-2'} />
                {!sidebarCollapsed && 'Dashboard'}
              </NavLink>
            </div>

            <div className="secction">
              <div className="heading">{!sidebarCollapsed ? 'PRODUCTS' : 'PRODS'}</div>
              <NavLink to="/analytics" activeClassName="active">
                <FiPieChart className={!sidebarCollapsed && 'me-2'} style={{ marginTop: '-2px' }} />
                {!sidebarCollapsed && 'Analytics'}
              </NavLink>
              <NavLink to="/cookies" activeClassName="active">
                <FiShield className={!sidebarCollapsed && 'me-2'} style={{ marginTop: '-2px' }} />
                {!sidebarCollapsed && 'Cookies'}
              </NavLink>
              <NavLink to="/feedback" activeClassName="active">
                <FiMessageSquare className={!sidebarCollapsed && 'me-2'} style={{ marginTop: '-2px' }} />
                {!sidebarCollapsed && 'Feedback'}
              </NavLink>
            </div>

            <div className="secction">
              <div className="heading">{!sidebarCollapsed ? 'ACCOUNT' : 'ACCTS'}</div>
              <NavLink to="/manage-accounts" activeClassName="active">
                <FiGrid className={!sidebarCollapsed && 'me-2'} style={{ marginTop: '-2px' }} />
                {!sidebarCollapsed && 'Manage accounts'}
              </NavLink>
              {/* <NavLink to="/settings"><FiSettings className="me-1" style={{ marginTop: '-2px' }} /> Settings</NavLink> */}
              <NavLink to="/profile" activeClassName="active">
                <FiUser className={!sidebarCollapsed && 'me-2'} style={{ marginTop: '-2px' }} />
                {!sidebarCollapsed && 'Profile'}
              </NavLink>
              <NavLink to="/plan" activeClassName="active">
                <FiCreditCard className={!sidebarCollapsed && 'me-2'} style={{ marginTop: '-2px' }} />
                {!sidebarCollapsed && 'Plan & billing'}
              </NavLink>
            </div>

            <div className="secction">
              <div className="heading">EXTRA</div>
              <button onClick={toggleWhatsNewModal}>
                <FiZap className={!sidebarCollapsed && 'me-2'} style={{ marginTop: '-2px' }} />
                {!sidebarCollapsed && "What's new?"}
              </button>
            </div>

          </div>
        </div>
      }

      {
        whatsNewModal
        && <Popup close={toggleWhatsNewModal}>
          <h3 className="mb-0">What's new on Glowhub?</h3>
          <p className="glow__muted mb-4">These are the latest news</p>

          <div className="mt-3">
            <h6 className="mb-0">New collapsible Sidebar</h6>
            <small className="glow__muted">Click on the glowhub logo to try it out. Your selection will remain even if you close the tab.</small>
          </div>
          <div className="mt-3">
            <h6 className="mb-0">New React component</h6>
            <small className="glow__muted">Add Glowhub to your React app with just one component.
            <a href="https://www.npmjs.com/package/react-glowhub" target="_blank" rel="noreferrer">Take a look at npmjs.com</a></small>
          </div>

        </Popup>
      }
    </>
  )
}

export default SideBar
