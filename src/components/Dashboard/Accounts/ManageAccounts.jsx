import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Dashboard from '../Dashboard'
import { FiPlus } from "react-icons/fi";
import Popup from '../../Misc/Popup';
import CreateAccount from './CreateAccount';

const ManageAccounts = () => {
  const { user } = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false)
  const togglePopup = () => { setIsOpen(!isOpen) }

  return (
    <Dashboard>
      <div className="row justify-content-between align-items-end mb-3">
        <div className="col-sm-8">
          <h1>Manage accounts</h1>
          <p className="glow__muted mb-0">Good to see you again, {user && user.name.split(' ')[0]}</p>
        </div>
        <div className="col-sm-4 text-left text-sm-end">
          <button onClick={togglePopup} className="glow__btn__dark mb-2 py-2"><FiPlus className="me-1" /> Create account</button>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 g-2 g-md-3 mt-4">
        {user?.accounts.map(acc => {
          return (
            <div key={acc.clientID}>
              <div className="card__dashboard p-4 d-block d-lg-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <div className="acc__avatar" style={{ backgroundColor: acc.color }}></div>
                  <div>
                    <h5 className="m-0">{acc.name}</h5>
                    <small className="glow__muted d-block">ClientID: {acc.clientID}</small>
                  </div>
                </div>
                <div className="mt-3 mt-lg-0">
                  <Link to={`/edit-account/${acc.id}`} className="glow__btn__dark me-2">Edit</Link>
                  <Link to='/create-account' className="glow__btn__dark">Code</Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>


      {
        isOpen &&
        <Popup close={togglePopup}>
          <CreateAccount />
        </Popup>
      }
    </Dashboard>
  )
}

export default ManageAccounts
