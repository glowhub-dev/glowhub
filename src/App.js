import { Route, Switch } from 'react-router';
import './App.scss';
import CreateAccount from './components/Dashboard/Accounts/CreateAccount';
import EditAccount from './components/Dashboard/Accounts/EditAccount';
import ManageAccounts from './components/Dashboard/Accounts/ManageAccounts';
import AnalyticsHome from './components/Dashboard/Analytics/AnalyticsHome';
import Feedback from './components/Dashboard/Feedback/Feedback';
import Cookies from './components/Dashboard/Cookies/Cookies';
import Home from './components/Dashboard/Home';
import Login from './components/Login/Login';
import Error404 from './components/Misc/Error404';
import Register from './components/Register/Register';
import './scss/glowhub.scss'
import PrivateRoute from './utils/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />

        {/* Private routes */}
        <PrivateRoute exact path="/dashboard" component={Home} />
        <PrivateRoute exact path="/create-account" component={CreateAccount} />
        <PrivateRoute exact path="/manage-accounts" component={ManageAccounts} />
        <PrivateRoute exact path="/edit-account/:id" component={EditAccount} />
        <PrivateRoute exact path="/analytics" component={AnalyticsHome} />
        <PrivateRoute exact path="/cookies" component={Cookies} />
        <PrivateRoute exact path="/feedback" component={Feedback} />

        {/* 404 Route */}
        <Route path="*" component={Error404} />
      </Switch>
    </div>
  )
}

export default App;
