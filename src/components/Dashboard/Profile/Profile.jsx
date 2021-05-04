import React, { useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../../../contexts/AuthContext'
import { update } from '../../../services/UserService'
import Dashboard from '../Dashboard'

const toastConfig = {
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
}
const userUpdated = () => toast.success('User updated successfully', toastConfig)
const errorOn = (e = 'An error has occurred') => toast.error(e, toastConfig)

const Profile = () => {
  const { user } = useContext(AuthContext)
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '' })

  useEffect(() => {
    user && setUserForm({ name: user.name, email: user.email, password: '' })
  }, [user])

  const onChange = (e) => {
    setUserForm((prevstate) => ({ ...prevstate, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    let userToUpdate = { ...userForm }

    if (userToUpdate.password !== '' && userToUpdate.password.length < 6) {
      errorOn('The password must be at least 6 characters')
      return
    } else if (userToUpdate.password === '') {
      delete userToUpdate.password
    }

    if (!userToUpdate.name || !userToUpdate.email) {
      errorOn()
    } else {
      try {
        await update(userToUpdate)
        userUpdated()
      } catch (e) {
        errorOn()
      }
    }
  }

  return (
    <Dashboard>
      <div className="row justify-content-between align-items-end mb-3">
        <div className="col-sm-8">
          <h1 className="mb-0">Your profile</h1>
          <p className="glow__muted mb-3 mb-md-0">Good to see you again, {user && user.name.split(' ')[0]}</p>
        </div>
        <div className="col-sm-4 text-left text-sm-end">
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="row g-lg-4 g-2">
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <input
                className="glow__input w-100"
                type="text"
                placeholder="Name"
                name="name"
                value={userForm?.name}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                className="glow__input w-100"
                type="email"
                placeholder="Email"
                name="email"
                value={userForm?.email}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                className="glow__input w-100"
                type="password"
                placeholder="Password"
                name="password"
                value={userForm?.password}
                onChange={onChange}
              />
            </div>
            <div className="mb-3 mt-4">
              <button className="glow__btn px-3">Save account changes</button>
            </div>
          </div>
        </div>
      </form>

    </Dashboard>
  )
}

export default Profile
