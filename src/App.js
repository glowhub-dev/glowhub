import { Route, Switch } from 'react-router';
import './App.scss';
import Home from './components/Dashboard/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './scss/glowhub.scss'
import PrivateRoute from './utils/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Home} />
      </Switch>
    </div>
  )
}

export default App;
