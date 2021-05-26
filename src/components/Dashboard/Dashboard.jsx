import React, { useState, useContext, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types';
import SideBar from './SideBar/SideBar'
import './Dashboard.scss'
import DashboardTopNav from './TopBar/DashboardTopNav'
import { Toaster } from 'react-hot-toast'
import Navbar from './Navbar/Navbar'
import Popup from '../Misc/Popup'
import { AuthContext } from '../../contexts/AuthContext'
import useAccount from '../../hooks/useAccount'
import FooterMenu from './Navbar/FooterMenu';
import { GlowHubLoader } from 'react-glowhub'
import { SideBarContext } from '../../contexts/SideBarContext';

const Dashboard = ({ children }) => {
  const { user } = useContext(AuthContext)
  const { changeAccount } = useAccount()
  const { sidebar, setSidebarStatus } = useContext(SideBarContext)

  const changeSidebarCollapse = () => {
    setSidebarStatus(!sidebar)
  }

  const [changeAccountModal, setChangeAccount] = useState(false)
  const togglechangeAccount = useCallback(() => { setChangeAccount(!changeAccountModal) }, [changeAccountModal])

  const changeAccountFunc = (account) => {
    changeAccount(account)
    togglechangeAccount()
  }


  const detectCommand = useCallback((e) => {
    if (e.key === '7' && e.ctrlKey) {
      togglechangeAccount()
    }
  }, [togglechangeAccount])

  useEffect(() => {
    window.addEventListener('keypress', detectCommand, true)
    return () => window.removeEventListener('keypress', detectCommand, true)
  }, [detectCommand])

  return (
    <div className="Dashboard">
      <Toaster />
      <GlowHubLoader
        clientID='GH-JQZ5BU5GPMK'
      />

      <Navbar />
      <SideBar
        sidebarCollapsed={sidebar}
        changeSidebarCollapse={changeSidebarCollapse}
      />
      <div className="content">
        <DashboardTopNav changeAccount={togglechangeAccount} />
        <div className="children">
          {children}
        </div>
      </div>

      {
        changeAccountModal
        && <Popup close={togglechangeAccount}>
          <h3 className="mb-0">Your accounts</h3>
          <p className="glow__muted mb-4">These are your available accounts</p>

          {user?.accounts.map(acc => {
            return (
              <div key={acc.clientID}>
                <div className="card__dashboard__sm p-3 mb-2 d-block d-lg-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="acc__avatar" style={{ backgroundColor: acc.color }}></div>
                    <div>
                      <h6 className="m-0">{acc.name}</h6>
                      <small className="glow__muted d-block">ClientID: {acc.clientID}</small>
                    </div>
                  </div>
                  <div className="mt-3 mt-lg-0">
                    <button onClick={() => changeAccountFunc(acc.clientID)} className="glow__btn__dark w-100">Select</button>
                  </div>
                </div>
              </div>
            )
          })}
        </Popup>
      }

      <FooterMenu />
    </div>
  )
}

Dashboard.propTypes = {
  children: PropTypes.node.isRequired
}

export default Dashboard
