import React, { useState, useContext } from 'react'
import Dashboard from './Dashboard'
import { createWebAccount } from '../../services/UserService'
import useAccount from '../../hooks/useAccount'
import { AuthContext } from '../../contexts/AuthContext'
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router'

const CreateAccount = () => {
  const [formData, setformData] = useState({ name: '', business_name: '', domains: '' })
  const { getUser } = useContext(AuthContext)
  const { changeAccount } = useAccount()
  const { push } = useHistory()

  const accountCreated = () => toast.success('Account created successfully')

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const account = await createWebAccount(formData)
      changeAccount(account.clientID)
      getUser()
      accountCreated()
      setTimeout(() => { push('/dashboard') }, 500)
    } catch (e) {
      console.log(e)
    }
  }

  const onChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Dashboard>
      <Toaster />
      <div className="mb-4">
        <h1>Create account</h1>
        <p className="glow__muted">Create account to start using GlowHub</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-3" style={{ maxWidth: '30rem' }}>
          <label htmlFor="name">Account name</label>
          <input
            className="glow__input w-100"
            type="text"
            placeholder="My first account"
            name="name"
            value={formData.name}
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
            value={formData.business_name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3" style={{ maxWidth: '30rem' }}>
          <label htmlFor="business_name">Domain</label>
          <input
            className="glow__input w-100"
            type="text"
            placeholder="https://www.mydomain.com"
            name="domains"
            value={formData.domains}
            onChange={onChange}
          />
        </div>
        <div className="mb-3 mt-4" style={{ maxWidth: '30rem' }}>
          <button className="glow__btn w-100">Create account</button>
        </div>
      </form>
    </Dashboard>
  )
}

export default CreateAccount
