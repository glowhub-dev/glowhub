import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Register.scss'

const Register = () => {

  return (
    <div className="Register">
      <Navbar />

      <div className="container mt-5">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-5 order-3 order-md-1">
            <div className="custom__card">
              <h4>Instant static deploys</h4>
              <p className="glow__muted mb-4">Push to git and your website is live. Zero configuration required.</p>

              <h4>Instant static deploys</h4>
              <p className="glow__muted mb-4">Push to git and your website is live. Zero configuration required.</p>

              <h4>Instant static deploys</h4>
              <p className="glow__muted mb-4">Push to git and your website is live. Zero configuration required.</p>

              <h4>Instant static deploys</h4>
              <p className="glow__muted">Push to git and your website is live. Zero configuration required.</p>
            </div>
          </div>
          <div className="col-md-1 order-2"></div>
          <div className="col-md-5 order-1 order-md-3 mb-5 mb-md-0">
            <h1 className="m-0 p-0">Welcome</h1>
            <p className="glow__muted">Good to see you again, Manuel</p>

            <form style={{ maxWidth: '30rem' }}>
              <div className="mt-4">
                <label htmlFor="name" className="form-label">Full name</label>
                <input type="text" className="glow__input w-100" id="name" placeholder="Manuel Carrillo Almoguera" />
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="glow__input w-100" id="email" placeholder="manucaralmo@gmail.com" />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="glow__input w-100" id="password" placeholder="**********" />
              </div>
              <div className="mt-4">
                <label>
                  <input type="checkbox" className="glow__checkbox" value="first_checkbox" />
                  Subscribe to newsletter
                </label>
              </div>
              <div className="mt-5">
                <button type="submit" className="glow__btn w-100">Register now</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
