import React, { useEffect, useState, useContext } from 'react'
import toast from 'react-hot-toast'
import { useHistory, useParams } from 'react-router'
import { AccountContext } from '../../../contexts/AccountContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { editWebAccount, getAccount, deleteAccount } from '../../../services/AccountService'
import { deleteAccountStore } from '../../../store/AccountStore'
import Popup from '../../Misc/Popup'
import Dashboard from '../Dashboard'

const toastConfig = {
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
}
const accountUpdated = () => toast.success('Account updated successfully', toastConfig)
const accountDeleted = () => toast.success('Account deleted successfully', toastConfig)
const errorOn = () => toast.success('An error has occurred', toastConfig)

const EditAccount = () => {
  let { id } = useParams()
  const { push } = useHistory()
  const { getUser } = useContext(AuthContext)
  const [account, setAccount] = useState({ name: '', business_name: '', domains: '', color: '' })
  const [isOpen, setIsOpen] = useState(false)
  const { resetAccount } = useContext(AccountContext)

  const togglePopup = () => { setIsOpen(!isOpen) }

  useEffect(() => {
    getAccount(id).then(a => setAccount(a))
  }, [id])

  const onChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value })
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
        <div className="mb-3" style={{ maxWidth: '30rem' }}>
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
        <div className="mb-3" style={{ maxWidth: '30rem' }}>
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
        <div className="mb-3" style={{ maxWidth: '30rem' }}>
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
        <div className="mb-3" style={{ maxWidth: '30rem' }}>
          <label htmlFor="color">Color</label>
          <select
            className="glow__select w-100 mt-2"
            aria-label="Default select example"
            onChange={onChange}
            value={account.color}
            id='color'
            name='color'
          >
            <option value="#00ace5">Blue</option>
            <option value="#1cac52">Green</option>
            <option value="#ffab10">Yellow</option>
          </select>
        </div>
        <div className="mb-3 mt-4" style={{ maxWidth: '30rem' }}>
          <button className="glow__btn w-100">Edit account</button>
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
