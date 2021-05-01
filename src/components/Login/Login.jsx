import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { login, githubLogin } from '../../services/AuthService'
import { setAccessToken } from '../../store/AccessTokenStore'
import Navbar from '../Navbar/Navbar'
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthContext'
import { FaGithub } from "react-icons/fa";

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
const successToast = () => toast.success('Login successful', toastConfig)
const loadingToast = () => toast.loading('Loading', toastConfig)

const Login = () => {
  const [loginForm, setloginForm] = useState({ email: '', password: '', error: '' })
  const [loading, setloading] = useState(false)
  const [gbToken, setgbToken] = useState(null)
  const [logging, setLogging] = useState(false)
  const { getUser } = useContext(AuthContext)
  const { push } = useHistory()
  let query = useQuery()

  // EMAIL LOGIN
  const onChange = (e) => {
    setloginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  const doLogin = async (e) => {
    e.preventDefault()
    setloading(true)

    const error1 = 'Debes rellenar todos los campos'
    const error2 = 'Ha ocurrido un error al iniciar sesión'
    const error3 = 'Usuario o contraseña incorrectos'

    if (!loginForm.email || !loginForm.password) {
      setloginForm({ ...loginForm, error: error1 })
      errorToast(error1)
      setloading(false)
    } else {
      try {
        const token = await login({ email: loginForm.email, password: loginForm.password })

        if (token.access_token) {
          setAccessToken(token.access_token)
          await getUser()
          setTimeout(() => push('/dashboard'), 500)
        } else {
          setloginForm({ ...loginForm, error: error2 })
          errorToast(error2)
        }

        setloginForm({ ...loginForm, error: '' })
        successToast()

      } catch (e) {
        setloginForm({ ...loginForm, error: error3 })
        errorToast(error3)
      }
      setloading(false)
    }

  }

  // GITHUB LOGIN
  useEffect(() => {
    const doGithubLogin = async () => {
      setLogging(true)
      try {
        loadingToast()
        const token = await githubLogin(gbToken)
        if (token.access_token) {
          setAccessToken(token.access_token)
          await getUser()
          toast.dismiss()
          successToast()
          setTimeout(() => push('/dashboard'), 500)
        }
      } catch (e) {
        errorToast('An error has ocurred')
        setLogging(false)
      }
    }

    gbToken && !logging && doGithubLogin()
  }, [gbToken, push, getUser, logging])

  useEffect(() => {
    setgbToken(query.get("code"))
  }, [query])


  return (
    <>
      <Navbar />
      <Toaster />

      <div className="container">
        <div className="mx-auto mt-5" style={{ maxWidth: '24rem' }}>

          <div className="text-center">
            <h1 className="m-0 p-0">Welcome back</h1>
            <p className="glow__muted">Don't have an account? <Link to="/register" className="white__link">Sign up</Link></p>
          </div>

          <form onSubmit={doLogin}>
            <div className="mt-4">
              <input
                type="email"
                className="glow__input w-100"
                id="email"
                placeholder="manucaralmo@gmail.com"
                name="email"
                onChange={onChange}
                value={loginForm.email}
                autoFocus
              />
            </div>
            <div className="mt-4">
              <input
                type="password"
                className="glow__input w-100"
                id="password"
                placeholder="**********"
                name="password"
                onChange={onChange}
                value={loginForm.password}
              />
            </div>
            {
              loginForm.error
              && <div className="mt-4 text-center alert-normal">
                {loginForm.error}
              </div>
            }
            <div className="mt-4">
              <button type="submit" className="glow__btn w-100">{loading ? 'Loading...' : 'Login'}</button>
            </div>
          </form>

          <div className="my-4 text-center">
            <small className="glow__muted">¿Has olvidado la contraseña? <Link to="/reset-password" className="white__link">Haz click aquí</Link></small>
            <hr />
          </div>

          <a href="http://localhost:3001/github-auth" className="glow__btn__github w-100 mt-3">
            <FaGithub className="me-2" /> Login with Github
          </a>
        </div>
      </div>
    </>
  )
}

export default Login
