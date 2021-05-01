import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { resetLink } from '../../services/AuthService'

const toastConfig = {
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
}
const emailSent = () => toast.success('Email sent succesfully', toastConfig)
const errorOn = () => toast.error('An error has occurred', toastConfig)

const ResetPassword = () => {
  const [resetForm, setResetForm] = useState({ email: '', error: '' })
  const [loading, setloading] = useState(false)

  const onChange = (e) => {
    setResetForm({ ...resetForm, email: e.target.value })
  }

  const resetPass = async (e) => {
    e.preventDefault()
    setloading(true)

    try {
      if (!resetForm.email) {
        setResetForm({ ...resetForm, error: 'Email is required' })
      } else {
        await resetLink(resetForm)
        emailSent()
      }
    } catch (e) {
      errorOn()
      console.log(e)
    }

    setloading(false)
  }

  return (
    <>
      <Navbar />
      <Toaster />

      <div className="container">
        <div className="mx-auto mt-5" style={{ maxWidth: '24rem' }}>

          <div className="text-center">
            <h1 className="m-0 p-0">Reset password</h1>
            <p className="glow__muted">Don't have an account? <Link to="/register" className="white__link">Sign up</Link></p>
          </div>

          <form onSubmit={resetPass}>
            <div className="mt-4">
              <input
                type="email"
                className="glow__input w-100"
                id="email"
                placeholder="Email address"
                name="email"
                onChange={onChange}
                value={resetForm.email}
                autoFocus
              />
            </div>
            {
              resetForm.error
              && <div className="mt-4 text-center alert-normal">
                {resetForm.error}
              </div>
            }
            <div className="mt-4">
              <button type="submit" className="glow__btn w-100">{loading ? 'Loading...' : 'Send email'}</button>
            </div>

            <div className="mt-3 text-center">
              <small className="glow__muted">To restore your password, we will send you an email with a recovery link.</small>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
