import React, { useState, useContext } from 'react'
import SideBar from './SideBar/SideBar'
import './Dashboard.scss'
import DashboardTopNav from './TopBar/DashboardTopNav'
import { Toaster } from 'react-hot-toast'
import Navbar from './Navbar/Navbar'
import Popup from '../Misc/Popup'
import { AuthContext } from '../../contexts/AuthContext'
import useAccount from '../../hooks/useAccount'

const Dashboard = ({ children }) => {
  const { user } = useContext(AuthContext)
  const { changeAccount } = useAccount()

  const [changeAccountModal, setChangeAccount] = useState(false)
  const togglechangeAccount = () => { setChangeAccount(!changeAccountModal) }

  const changeAccountFunc = (account) => {
    changeAccount(account)
    togglechangeAccount()
  }

  return (
    <div className="Dashboard">
      <Toaster />
      <Navbar />
      <SideBar />
      <div className="content">
        <DashboardTopNav changeAccount={togglechangeAccount} />
        <div className="children">
          {children}
        </div>
      </div>

      {
        changeAccountModal
        && <Popup close={togglechangeAccount}>
          <h3>Your accounts</h3>
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
    </div>
  )
}

export default Dashboard
