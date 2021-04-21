import { Route, Switch } from 'react-router';
import './App.scss';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './scss/glowhub.scss'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  )
}

export default App;
