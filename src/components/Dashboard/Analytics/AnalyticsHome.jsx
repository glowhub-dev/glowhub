import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import useAccount from '../../../hooks/useAccount'
import { getViews } from '../../../services/ViewsService'
import GlowChart from '../charts/GlowChart'
import Dashboard from '../Dashboard'
import CustomMiniWidget from '../widgets/CustomMiniWidget'
import CustomWidget from '../widgets/CustomWidget'
import OnlineViews from '../widgets/OnlineViews';
import TopBrowsers from '../widgets/TopBrowsers'
import TopCountries from '../widgets/TopCountries'
const oneDayInMilisec = (1000 * 60 * 60 * 24)

const AnalyticsHome = () => {
  const { user } = useContext(AuthContext)
  const { account, changeAccount } = useAccount()
  const [fullAccount, setfullAccount] = useState({})
  const [views, setViews] = useState({})
  const [fromDate, setFromDate] = useState(6)
  const [chartType, setChartType] = useState('line')

  const changeFromDate = (e) => setFromDate(e.target.value)
  const changeChartType = (e) => setChartType(e.target.value)

  useEffect(() => {
    user && account && setfullAccount(user?.accounts.filter(a => account === a.clientID)[0])
  }, [account, user])

  useEffect(() => {
    account && getViews({
      account, params: {
        fromDate: (new Date().getTime() - oneDayInMilisec * fromDate)
      }
    })
      .then(v => setViews(v))
      .catch(e => console.log(e))
  }, [account, fromDate])

  return (
    <Dashboard>
      <div className="row justify-content-between align-items-end mb-3">
        <div className="col-sm-4">
          <h1 className="mb-0">Glow Analytics</h1>
          <p className="glow__muted">Web analytics with improved users privacy</p>
        </div>
        <div className="col-sm-8 text-left text-sm-end d-flex justify-content-start justify-content-md-end flex-wrap pb-3">
          <select
            className="glow__select mb-2 me-2"
            aria-label="Default select example"
            onChange={changeFromDate}
            value={fromDate}
          >
            <option value={6}>Last 7 days</option>
            <option value={13}>Last 14 days</option>
            <option value={29}>Last month</option>
            <option value={89}>Last 3 months</option>
            <option value={179}>Last 6 months</option>
            <option value={359}>Last year</option>
          </select>

          <select
            className="glow__select mb-2 me-2"
            aria-label="Default select example"
            onChange={changeChartType}
            value={chartType}
          >
            <option value='line'>Lines chart</option>
            <option value='bar'>Bars chart</option>
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
            <div className="card__dashboard p-2">
              {
                views?.chart1data
                  ? <GlowChart
                    data={views.chart1data}
                    color={fullAccount?.color}
                    type={chartType}
                  />
                  : <div className="card__dashboard__loading p-4">
                    <span className="span"> </span>
                    <p className="mt-3"></p>
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
            <CustomMiniWidget
              title="Total users"
              data={views.totalUsers}
            />
          </div>
          <div className="col-sm-4 col-lg-3">
            <CustomMiniWidget
              title="Total views"
              data={views.totalViews}
            />
          </div>
          <div className="col-sm-4 col-lg-3">
            <CustomMiniWidget
              title="User sessions"
              data={views.totalViews && (views.totalViews / views.totalUsers).toFixed(1)}
            />
          </div>
          <div className="col-sm-4 col-lg-3">
            <CustomMiniWidget
              title="Session mean time"
              data={views.meanTimeInPage && (views.meanTimeInPage / 1000).toFixed(2)}
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="m-0">Audience</h3>
        <p className="glow__muted">Audience overview</p>
        <div className="row g-2 g-md-3">
          <div className="col-lg-4">
            <TopCountries
              title='Top countries'
              data={views.topCountries}
              link="/audience"
            />
          </div>
          <div className="col-lg-4">
            <CustomWidget
              title='Top cities'
              data={views.topCities}
              link="/audience"
            />
          </div>
          <div className="col-lg-4">
            <TopBrowsers
              title='Top browsers'
              data={views.topBrowsers}
              link="/audience"
            />
          </div>
          <div className="col-lg-4">
            <CustomWidget
              title='Top Operate System'
              data={views.topOS}
              link="/audience"
            />
          </div>
          <div className="col-lg-4">
            <CustomWidget
              title='Top traffic sources'
              data={views.topRefDomains}
              link="/audience"
            />
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default AnalyticsHome
