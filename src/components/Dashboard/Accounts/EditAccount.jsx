import React, { useEffect, useState, useContext } from 'react'
import toast from 'react-hot-toast'
import { useHistory, useParams } from 'react-router'
import { AccountContext } from '../../../contexts/AccountContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { editWebAccount, getAccount, deleteAccount } from '../../../services/AccountService'
import { deleteAccountStore } from '../../../store/AccountStore'
import Popup from '../../Misc/Popup'
import Dashboard from '../Dashboard'
import { TwitterPicker } from 'react-color'

const toastConfig = {
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
}
const accountUpdated = () => toast.success('Account updated successfully', toastConfig)
const accountDeleted = () => toast.success('Account deleted successfully', toastConfig)
const errorOn = () => toast.error('An error has occurred', toastConfig)

const EditAccount = () => {
  let { id } = useParams()
  const { push } = useHistory()
  const { getUser } = useContext(AuthContext)
  const [account, setAccount] = useState({ name: '', business_name: '', domains: '', color: '' })
  const [isOpen, setIsOpen] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const { resetAccount } = useContext(AccountContext)

  const togglePopup = () => { setIsOpen(!isOpen) }
  const togglePicker = () => { setShowPicker(!showPicker) }

  useEffect(() => {
    getAccount(id).then(a => setAccount(a))
  }, [id])

  const onChange = (e) => {
    setAccount((prevstate) => ({ ...prevstate, [e.target.name]: e.target.value }))
  }

  const handleColorChange = (color) => {
    setAccount((prevstate) => ({ ...prevstate, color: color.hex }))
  }

  const onChangeServices = (e) => {
    setAccount((prevstate) => ({ ...prevstate, services: { ...prevstate.services, [e.target.name]: e.target.value } }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await editWebAccount(id, account)
      getUser() // Update user context
      accountUpdated() // Toast
      push('/manage-accounts') // Redirect
    } catch (e) {
      errorOn()
      console.log(e)
    }
  }

  const deleteAccountPerm = async () => {
    try {
      await deleteAccount(id)
      getUser()
      accountDeleted()
      deleteAccountStore()
      resetAccount()

      push('/manage-accounts')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Dashboard>
      <div className="row justify-content-between align-items-end mb-3">
        <div className="col-sm-8">
          <h1 className="mb-0">Edit account</h1>
          <p className="glow__muted">Edit your account: {account.name}</p>
        </div>
        <div className="col-sm-4 text-left text-sm-end">
          <button className="glow__btn__dark mb-3" onClick={togglePopup}>
            Delete account
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="row g-lg-4 g-2">
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="name">Account name</label>
              <input
                className="glow__input w-100"
                type="text"
                placeholder="My first account"
                name="name"
                value={account.name}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="business_name">Business name</label>
              <input
                className="glow__input w-100"
                type="text"
                placeholder="My first account"
                name="business_name"
                value={account.business_name}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="business_name">Domain</label>
              <input
                className="glow__input w-100"
                type="url"
                placeholder="https://www.mydomain.com"
                name="domains"
                value={account.domains}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label className="d-block mb-2">Account color</label>
              <div className="d-flex flex-row align-items-center">
                <div onClick={togglePicker} className="me-2" style={{ height: '35px', width: '35px', borderRadius: '0.5rem', backgroundColor: account.color }}></div>
                <button type="button" className="glow__btn__dark" onClick={togglePicker}>
                  Change color
            </button>
              </div>
            </div>

            {
              showPicker
              && <TwitterPicker
                color={account.color}
                onChange={handleColorChange}
                colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#607d8b"]}
              />
            }
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="analytics">Glow Analytics</label>
              <select
                className="glow__select w-100 mt-2 py-2"
                aria-label="Glow analytics"
                onChange={onChangeServices}
                value={account.services?.analytics}
                id='analytics'
                name='analytics'
              >
                <option value="true">Active</option>
                <option value="false">Deactivated</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="cookies">Glow Cookies</label>
              <select
                className="glow__select w-100 mt-2 py-2"
                aria-label="Glow cookies"
                onChange={onChangeServices}
                value={account.services?.cookies}
                id='cookies'
                name='cookies'
              >
                <option value="true">Active</option>
                <option value="false">Deactivated</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="feedback">Glow Feedback</label>
              <select
                className="glow__select w-100 mt-2 py-2"
                aria-label="Glow cookies"
                onChange={onChangeServices}
                value={account.services?.feedback}
                id='feedback'
                name='feedback'
              >
                <option value="true">Active</option>
                <option value="false">Deactivated</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-3 mt-4">
          <button className="glow__btn px-5">Save account changes</button>
        </div>
      </form>

      {
        isOpen &&
        <Popup close={togglePopup}>
          <h3>¿Realmente deseas eliminar esta cuenta?</h3>
          <p>Eliminar es una acción irreversible y no podrás recuperar los datos más adelante.</p>
          <button className="glow__btn mt-4 w-100" onClick={deleteAccountPerm}>Delete account</button>
        </Popup>
      }
    </Dashboard>
  )
}

export default EditAccount
