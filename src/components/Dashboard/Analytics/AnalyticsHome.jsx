import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import useAccount from '../../../hooks/useAccount'
import { getViews } from '../../../services/ViewsService'
import GlowChart from '../charts/GlowChart'
import Dashboard from '../Dashboard'
import OnlineViews from '../widgets/OnlineViews';

const AnalyticsHome = () => {
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
      <div className="row justify-content-between align-items-end mb-3">
        <div className="col-sm-4">
          <h1>Glow Analytics</h1>
          <p className="glow__muted">Create account to start using GlowHub</p>
        </div>
        <div className="col-sm-8 text-left text-sm-end d-flex justify-content-start justify-content-md-end flex-wrap pb-3">
          <select
            className="glow__select mb-2 me-2"
            aria-label="Default select example"
          >
            <option value="7days">Last 7 days</option>
            <option value="7days">Last 14 days</option>
            <option value="7days">Last month</option>
            <option value="7days">Last 3 months</option>
            <option value="7days">Last 6 months</option>
            <option value="7days">Last year</option>
          </select>

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
                  ? <GlowChart
                    data={views.chart1data}
                    color={fullAccount?.color}
                    type="bar"
                  />
                  : <div className="card__dashboard__loading p-4">
                    <span className="span"> </span>
                    <p className="mt-3 mb-2"></p>
                  </div>
              }
            </div>
          </div>
          <div className="col-lg-3">
            <OnlineViews account={account} />
          </div>
        </div>

        <div className="row g-2 g-md-3 mt-1">
          <div className="col-sm-4 col-lg-3">
            <div className="card__dashboard p-4 mb-2">
              <span className="glow__muted">Total users</span>
              <h2 className="fw-light m-0">500</h2>
            </div>
          </div>
          <div className="col-sm-4 col-lg-3">
            <div className="card__dashboard p-4 mb-2">
              <span className="glow__muted">Total views</span>
              <h2 className="fw-light m-0">43.446</h2>
            </div>
          </div>
          <div className="col-sm-4 col-lg-3">
            <div className="card__dashboard p-4 mb-2">
              <span className="glow__muted">User sessions</span>
              <h2 className="fw-light m-0">1,34</h2>
            </div>
          </div>
          <div className="col-sm-4 col-lg-3">
            <div className="card__dashboard p-4 mb-2">
              <span className="glow__muted">Session mean time</span>
              <h2 className="fw-light m-0">01:47</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3>Audience</h3>
        <p className="glow__muted">Audience overview</p>
        <div className="row g-2 g-md-3">
          <div className="col-lg-4">
            <div className="card__dashboard p-4">
              <span className="glow__muted">Top countries</span>
              <div className="mt-3 mb-0 d-flex justify-content-between">
                <div>
                  <img src="/images/flags/spain.svg" height="20px" className="me-3" alt="spain" />
                  Spain
                </div>
                <div>
                  56
                </div>
              </div>
              <div className="mt-2 mb-0 d-flex justify-content-between">
                <div>
                  <img src="/images/flags/usa.svg" height="20px" className="me-3" alt="spain" />
                  United States
                </div>
                <div>
                  47
                </div>
              </div>
              <div className="mt-2 mb-0 d-flex justify-content-between">
                <div>
                  <img src="/images/flags/mexico.svg" height="20px" className="me-3" alt="spain" />
                  Mexico
                </div>
                <div>
                  43
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card__dashboard p-4">
              <span className="glow__muted">Top cities</span>
              <div className="mt-3 mb-0 d-flex justify-content-between">
                <div>
                  Madrid - Spain
                </div>
                <div>
                  32
                </div>
              </div>
              <div className="mt-2 mb-0 d-flex justify-content-between">
                <div>
                  Toledo - Spain
                </div>
                <div>
                  13
                </div>
              </div>
              <div className="mt-2 mb-0 d-flex justify-content-between">
                <div>
                  Ciudad de México
                </div>
                <div>
                  12
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card__dashboard p-4">
              <span className="glow__muted">Top browsers</span>
              <div className="mt-3 mb-0 d-flex justify-content-between">
                <div>
                  <img src="/images/browsers/chrome.svg" height="20px" className="me-3" alt="spain" />
                  Google Chrome
                </div>
                <div>
                  32
                </div>
              </div>
              <div className="mt-2 mb-0 d-flex justify-content-between">
                <div>
                  <img src="/images/browsers/safari.svg" height="20px" className="me-3" alt="spain" />
                  Safari
                </div>
                <div>
                  13
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card__dashboard p-4">
              <span className="glow__muted">Top Operate System</span>
              <div className="mt-3 mb-0 d-flex justify-content-between">
                <div>
                  Android
                </div>
                <div>
                  132
                </div>
              </div>
              <div className="mt-2 mb-0 d-flex justify-content-between">
                <div>
                  iOS
                </div>
                <div>
                  94
                </div>
              </div>
              <div className="mt-2 mb-0 d-flex justify-content-between">
                <div>
                  Undefined
                </div>
                <div>
                  14
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card__dashboard p-4">
              <span className="glow__muted">Top traffic sources</span>
              <div className="mt-3 mb-0 d-flex justify-content-between">
                <div>
                  Instagram
                </div>
                <div>
                  132
                </div>
              </div>
              <div className="mt-2 mb-0 d-flex justify-content-between">
                <div>
                  Google
                </div>
                <div>
                  94
                </div>
              </div>
              <div className="mt-2 mb-0 d-flex justify-content-between">
                <div>
                  Yahoo
                </div>
                <div>
                  14
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default AnalyticsHome
