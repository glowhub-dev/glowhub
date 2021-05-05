import React, { useState, useContext } from 'react'
import useAccount from '../../../hooks/useAccount'
import { AuthContext } from '../../../contexts/AuthContext'
import toast from 'react-hot-toast';
import { useHistory } from 'react-router'
import { createWebAccount } from '../../../services/AccountService';
import { TwitterPicker } from 'react-color'

const accountCreated = () => toast.success('Account created successfully')
const errorOn = () => toast.success('An error has occurred')

const CreateAccount = () => {
  const [formData, setformData] = useState({ name: '', business_name: '', domains: '', color: '#03A9F4' })
  const [showPicker, setShowPicker] = useState(false)
  const { getUser } = useContext(AuthContext)
  const { changeAccount } = useAccount()
  const { push } = useHistory()

  const togglePicker = () => { setShowPicker(!showPicker) }
  const handleColorChange = (color) => {
    setformData((prevstate) => ({ ...prevstate, color: color.hex }))
  }

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
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
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
        <div className="mb-3">
          <label className="d-block mb-2">Account color</label>
          <div className="d-flex flex-row align-items-center">
            <div onClick={togglePicker} className="me-2" style={{ height: '35px', width: '35px', borderRadius: '0.5rem', backgroundColor: formData.color }}></div>
            <button type="button" className="glow__btn__dark" onClick={togglePicker}>
              Change color
                </button>
          </div>
        </div>

        {
          showPicker
          && <TwitterPicker
            color={formData.color}
            onChange={handleColorChange}
            colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#607d8b"]}
          />
        }
        <div className="mb-3 mt-4" style={{ maxWidth: '30rem' }}>
          <button className="glow__btn w-100">Create account</button>
        </div>
      </form>
    </>
  )
}

export default CreateAccount
