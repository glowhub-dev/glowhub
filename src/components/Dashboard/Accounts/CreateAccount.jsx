import React, { useState, useContext } from 'react'
import Dashboard from '../Dashboard'
import useAccount from '../../../hooks/useAccount'
import { AuthContext } from '../../../contexts/AuthContext'
import toast from 'react-hot-toast';
import { useHistory } from 'react-router'
import { createWebAccount } from '../../../services/AccountService';

const accountCreated = () => toast.success('Account created successfully')
const errorOn = () => toast.success('An error has occurred')

const CreateAccount = () => {
  const [formData, setformData] = useState({ name: '', business_name: '', domains: '', color: '' })
  const { getUser } = useContext(AuthContext)
  const { changeAccount } = useAccount()
  const { push } = useHistory()

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const account = await createWebAccount(formData)
      changeAccount(account.clientID)
      getUser()
      accountCreated()
      push('/dashboard')
    } catch (e) {
      errorOn()
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
        <div className="mb-3" style={{ maxWidth: '30rem' }}>
          <label htmlFor="color">Color</label>
          <select
            className="glow__select w-100 mt-2"
            aria-label="Default select example"
            onChange={onChange}
            value={formData.color}
            id='color'
            name='color'
          >
            <option value="#00ace5">Blue</option>
            <option value="#1cac52">Green</option>
            <option value="#ffab10">Yellow</option>
          </select>
        </div>
        <div className="mb-3 mt-4" style={{ maxWidth: '30rem' }}>
          <button className="glow__btn w-100">Create account</button>
        </div>
      </form>
    </Dashboard>
  )
}

export default CreateAccount
