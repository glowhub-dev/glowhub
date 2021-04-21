import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const Login = () => {
  return (
    <>
      <Navbar />

      <div className="container">
        <div className="mx-auto mt-5" style={{ maxWidth: '24rem' }}>

          <div className="text-center">
            <h1 className="m-0 p-0">Welcome back</h1>
            <p className="glow__muted">Good to see you again, Manuel</p>
          </div>

          <form>
            <div className="mt-4">
              <input type="email" className="glow__input w-100" id="email" placeholder="manucaralmo@gmail.com" />
            </div>
            <div className="mt-4">
              <input type="password" className="glow__input w-100" id="password" placeholder="**********" />
            </div>
            <div className="mt-4">
              <button type="submit" className="glow__btn w-100">Login</button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <small className="glow__muted">Don't have an account? <Link to="/register" className="text-white">Sign Up</Link></small>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
