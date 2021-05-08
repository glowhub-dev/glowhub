import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import useAccount from '../../../hooks/useAccount'
import { getTotalAudicence } from '../../../services/ViewsService'
import Dashboard from '../Dashboard'
import CustomCollapseBrowsers from '../widgets/CustomCollapseBrowsers'
import CustomCollapseCountries from '../widgets/CustomCollapseCountries'
import CustomCollapsePages from '../widgets/CustomCollapsePages'
import CustomCollapseWidget from '../widgets/CustomCollapseWidget'
const oneDayInMilisec = (1000 * 60 * 60 * 24)

const Audience = () => {
  const { user } = useContext(AuthContext)
  const [audience, setAudience] = useState()
  const { account, changeAccount } = useAccount()
  const [fromDate, setFromDate] = useState(6)

  const changeFromDate = (e) => setFromDate(e.target.value)

  useEffect(() => {
    if (account) {
      getTotalAudicence({
        account, params: {
          fromDate: (new Date().getTime() - oneDayInMilisec * fromDate)
        }
      })
        .then(aud => setAudience(aud))
        .catch(e => console.log(e))
    }
  }, [account, fromDate])

  return (
    <Dashboard>
      <div className="row justify-content-between align-items-end mb-3">
        <div className="col-sm-8">
          <h1 className="mb-0">Total audience</h1>
          <p className="glow__muted mb-3 mb-md-0">Detailed view of your audience</p>
        </div>
        <div className="col-sm-4 text-left text-sm-end">
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
          <div className="col-lg-4">
            <div className="card__dashboard p-4">
              <span>Total users</span>
              <h1 className="fw-light">{audience?.totalUsers}</h1>
            </div>
          </div>
          <div className="col-lg-8">
            <CustomCollapsePages
              data={audience?.pages}
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="row g-2 g-md-3">
          <div className="col-lg-4">
            <CustomCollapseCountries
              title='Top countries'
              data={audience?.countries}
            />
          </div>
          <div className="col-lg-4">
            <CustomCollapseWidget
              title='Top cities'
              data={audience?.cities}
            />
          </div>
          <div className="col-lg-4">
            <CustomCollapseBrowsers
              title='Top browsers'
              data={audience?.browsers}
            />
          </div>
          <div className="col-lg-4">
            <CustomCollapseWidget
              title='Top Operate System'
              data={audience?.OS}
            />
          </div>
          <div className="col-lg-8">
            <CustomCollapseWidget
              title='Top traffic sources'
              data={audience?.refDomains}
            />
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default Audience
