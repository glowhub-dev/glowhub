import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { resetPassword } from '../../services/AuthService';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const toastConfig = {
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
}
const errorToast = (err) => toast.error(err, toastConfig)
const successToast = () => toast.success('Password changed', toastConfig)

const ChangePassword = () => {
  const { push } = useHistory()
  let query = useQuery()
  let TOKEN = query.get("token")

  const [changeForm, setChangeForm] = useState({
    password: '',
    repeatpassword: '',
    error: '',
    token: TOKEN || null
  })
  const [loading, setloading] = useState(false)

  const onChange = (e) => {
    setChangeForm({ ...changeForm, [e.target.name]: e.target.value })
  }

  const resetPass = async (e) => {
    e.preventDefault()
    setloading(true)

    if (changeForm.password === changeForm.repeatpassword) {
      try {
        resetPassword(changeForm)
        successToast()
        setTimeout(() => push('/'), 500)

      } catch (e) {
        console.log(e)
        errorToast('An error has occurred')
      }
    } else {
      setChangeForm({ ...changeForm, error: 'Passwords do not match' })
      errorToast('Passwords do not match')
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
            <h1 className="m-0 p-0">Change password</h1>
            <p className="glow__muted">Don't have an account? <Link to="/register" className="white__link">Sign up</Link></p>
          </div>

          <form onSubmit={resetPass}>
            <div className="mt-4">
              <input
                type="password"
                className="glow__input w-100"
                id="password"
                placeholder="Password"
                name="password"
                onChange={onChange}
                value={changeForm.password}
              />
            </div>
            <div className="mt-4">
              <input
                type="password"
                className="glow__input w-100"
                id="repeatpassword"
                placeholder="Repeat password"
                name="repeatpassword"
                onChange={onChange}
                value={changeForm.repeatpassword}
              />
            </div>
            {
              changeForm.error
              && <div className="mt-4 text-center alert-normal">
                {changeForm.error}
              </div>
            }
            <div className="mt-4">
              <button type="submit" className="glow__btn w-100">{loading ? 'Loading...' : 'Change password'}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangePassword