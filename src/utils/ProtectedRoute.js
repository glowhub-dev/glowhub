import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogged } = useContext(AuthContext)
  const [logged, setLogged] = useState(undefined)

  useEffect(() => {
    isLogged().then(res => setLogged(res))
  }, [isLogged])

  return (
    <Route {...rest} render={(props) => (
      logged
        ? <Component {...props} />
        : logged === undefined ? ('Loading..') : <Redirect to="/" />
    )} />
  )
}

export default PrivateRoute;