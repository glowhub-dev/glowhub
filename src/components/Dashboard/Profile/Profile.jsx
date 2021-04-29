import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import Dashboard from '../Dashboard'

const Profile = () => {
  const { user } = useContext(AuthContext)

  return (
    <Dashboard>
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </Dashboard>
  )
}

export default Profile
