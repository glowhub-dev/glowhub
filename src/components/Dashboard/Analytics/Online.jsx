import React, { useContext, useEffect, useState, useCallback } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import useAccount from '../../../hooks/useAccount'
import { getViewsOnline } from '../../../services/ViewsService'
import Dashboard from '../Dashboard'
import CustomWidget from '../widgets/CustomWidget'
import TopBrowsers from '../widgets/TopBrowsers'
import TopCountries from '../widgets/TopCountries'

const Online = () => {
  const { user } = useContext(AuthContext)
  const { account, changeAccount } = useAccount()
  const [views, setViews] = useState()
  //const [loading, setLoading] = useState(true)

  const getViews = useCallback(async () => {
    try {
      const views = await getViewsOnline(account)
      views && setViews(views)
      //setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }, [account])

  useEffect(() => {
    if (account) {
      setTimeout(getViews, 500)
      const interval = setInterval(getViews, 4000)
      return () => clearInterval(interval)
    }
  }, [account, getViews])

  return (
    <Dashboard>
      <div className="row justify-content-between align-items-end mb-3">
        <div className="col-sm-8">
          <h1 className="mb-0">Online views</h1>
          <p className="glow__muted mb-3 mb-md-0">Good to see you again, {user && user.name.split(' ')[0]}</p>
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
          <div className="col-lg-4">
            <div className="card__dashboard p-4">
              <span>Total users online</span>
              <h1 className="fw-light">{views?.totalUsers}</h1>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card__dashboard p-4 h-100">
              <span className="d-block mb-2">Total active pages</span>
              {
                views?.pages.length > 0
                  ? views?.pages.sort((a, b) => b[1] - a[1]).map(page => {
                    return (
                      <div className="glow__muted d-flex justify-content-between" key={page[0].path}>
                        <div>{page[0].title.slice(0, 45)}{page[0].title.length > 45 && '...'} -  {page[0].path}</div>
                        <div>{page[1]}</div>
                      </div>
                    )
                  })
                  : <small className="glow__muted d-block">There are no online users at this moment.</small>
              }
            </div>
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
              data={views?.countries}
            />
          </div>
          <div className="col-lg-4">
            <CustomWidget
              title='Top cities'
              data={views?.cities}
            />
          </div>
          <div className="col-lg-4">
            <TopBrowsers
              title='Top browsers'
              data={views?.browsers}
            />
          </div>
          <div className="col-lg-4">
            <CustomWidget
              title='Top Operate System'
              data={views?.os}
            />
          </div>
          <div className="col-lg-4">
            <CustomWidget
              title='Top traffic sources'
              data={views?.refDomains}
            />
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default Online
