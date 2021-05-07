import React, { useState, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaCheckCircle, FaGithub } from 'react-icons/fa'
import { useHistory } from 'react-router'
import { AuthContext } from '../../contexts/AuthContext'
import { register } from '../../services/AuthService'
import { setAccessToken } from '../../store/AccessTokenStore'
import Navbar from '../Navbar/Navbar'
import './Register.scss'

const Register = () => {
  const [registerForm, setregisterForm] = useState({ name: '', email: '', password: '', error: '' })
  const [loading, setloading] = useState(false)
  const { getUser } = useContext(AuthContext)
  const { push } = useHistory()

  const errorToast = (err) => toast.error(err)
  const successToast = () => toast.success('Login successful')

  const onChange = (e) => {
    setregisterForm({ ...registerForm, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password } = registerForm
    const error1 = 'Debes rellenar todos los campos'
    const error2 = 'Ha ocurrido un error al registrarte'
    const error409 = 'Email already registered'
    setloading(true)

    if (!name || !email || !password) {
      setregisterForm({ ...registerForm, error: error1 })
      errorToast(error1)
      setloading(false)
    } else {

      try {
        const token = await register({ name, email, password })

        if (token.access_token) {
          setAccessToken(token.access_token)
          await getUser()
          setTimeout(() => push('/dashboard'), 500)
        } else {
          setregisterForm({ ...registerForm, error: error2 })
          errorToast(error2)
        }

        setregisterForm({ ...registerForm, error: '' })
        successToast()
      } catch (e) {
        if (e.response.status === 409) {
          setregisterForm({ ...registerForm, error: error409 })
          errorToast(error409)
        } else {
          setregisterForm({ ...registerForm, error: error2 })
          errorToast(error2)
        }
      }
    }

  }

  return (
    <div className="Register">
      <Navbar />
      <Toaster />

      <div className="container mt-5">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-5 order-3 order-md-1">
            <div className="custom__card">
              <h4><FaCheckCircle className="me-1" style={{ marginTop: '-3px' }} /> Only one script</h4>
              <p className="glow__muted mb-4">Install one script and use all the tools.</p>

              <h4><FaCheckCircle className="me-1" style={{ marginTop: '-3px' }} /> Zero configuration</h4>
              <p className="glow__muted mb-4">Register your website at glowhub and we will take care of the rest.</p>

              <h4><FaCheckCircle className="me-1" style={{ marginTop: '-3px' }} /> Easy to use</h4>
              <p className="glow__muted mb-4">Choose your tools and customize them directly from the app.</p>

              <h4><FaCheckCircle className="me-1" style={{ marginTop: '-3px' }} /> Privacy-based</h4>
              <p className="glow__muted">Users choose whether or not they want to grant tracking permission.</p>
            </div>
          </div>
          <div className="col-md-1 order-2"></div>
          <div className="col-md-5 order-1 order-md-3 mb-5 mb-md-0">
            <h1 className="m-0 p-0">Welcome</h1>
            <p className="glow__muted">Get started today for free</p>

            <form onSubmit={onSubmit} style={{ maxWidth: '30rem' }}>
              <div className="mt-4">
                <label htmlFor="name" className="form-label">Full name</label>
                <input
                  type="text"
                  className="glow__input w-100"
                  id="name"
                  name="name"
                  placeholder="Manuel Carrillo Almoguera"
                  value={registerForm.name}
                  onChange={onChange}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="glow__input w-100"
                  id="email"
                  name="email"
                  placeholder="manucaralmo@gmail.com"
                  value={registerForm.email}
                  onChange={onChange}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="glow__input w-100"
                  id="password"
                  name="password"
                  placeholder="**********"
                  value={registerForm.password}
                  onChange={onChange}
                />
              </div>
              <div className="mt-4">
                <button type="submit" className="glow__btn w-100">{!loading ? 'Register now' : 'Loading...'}</button>
              </div>

              <hr className="mt-4" />
              <a href={`${process.env.REACT_APP_BASE_URL}/github-auth`} className="glow__btn__github w-100 mt-3">
                <FaGithub className="me-2" /> Login with Github
              </a>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
