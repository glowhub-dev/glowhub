import React, { useContext, useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { AuthContext } from '../../contexts/AuthContext';
import useAccount from '../../hooks/useAccount';
import GlowChart from './charts/GlowChart';
import PrimaryCta from './cta/PrimaryCta';
import OnlineViews from './charts/OnlineViews';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { getViews } from '../../services/ViewsService';

const Home = () => {
  const { user } = useContext(AuthContext)
  const { account, changeAccount } = useAccount()
  const [fullAccount, setfullAccount] = useState({})
  const [views, setViews] = useState({})

  useEffect(() => {
    user && account && setfullAccount(user?.accounts.filter(a => account === a.clientID)[0])
  }, [account, user])

  useEffect(() => {
    account && getViews(account).then(v => setViews(v)).catch(e => console.log(e))
  }, [account])

  return (
    <Dashboard>

      {
        user?.accounts.length <= 0
        && <PrimaryCta
          title='Create your fist account'
          desc='To start using GlowHub, create your first account'
          to='/create-account'
          text='Create account'
        />
      }

      <div className="row justify-content-between align-items-end mb-3">
        <div className="col-sm-8">
          <h1>Dashboard</h1>
          <p className="glow__muted mb-0">Good to see you again, {user && user.name.split(' ')[0]}</p>
        </div>
        <div className="col-sm-4 text-left text-sm-end">
          <select
            className="glow__select mb-2"
            aria-label="Default select example"
            value={account}
            onChange={(e) => { changeAccount(e.target.value) }}
          >
            {
              user?.accounts.length > 0
                ? user.accounts.map(acc => (<option value={acc.clientID} key={acc.clientID}>{acc.name}</option>))
                : <option value="no">No accounts</option>
            }
          </select>
        </div>
      </div>

      <div className="mt-4">
        <div className="row g-2 g-md-3">
          <div className="col-lg-9">
            <div className="card__dashboard p-2 mb-2">
              {
                views?.chart1data
                  ? <GlowChart data={views.chart1data} color={fullAccount?.color} type="line" />
                  : <div className="card__dashboard__loading p-4">
                    <span className="span"> </span>
                    <p className="mt-3 mb-2"></p>
                  </div>
              }
            </div>
            <Link to="/analytics-online" className="white__link__2">
              <small>See full Analytics <FiArrowRight /></small>
            </Link>
          </div>
          <div className="col-lg-3">
            <OnlineViews account={account} />
          </div>
        </div>
      </div>

    </Dashboard>
  )
}

export default Home
