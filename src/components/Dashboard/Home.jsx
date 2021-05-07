import React, { useContext, useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { AuthContext } from '../../contexts/AuthContext';
import useAccount from '../../hooks/useAccount';
import GlowChart from './charts/GlowChart';
import PrimaryCta from './cta/PrimaryCta';
import OnlineViews from './widgets/OnlineViews';
import { getAnalyticsHomeWidget } from '../../services/ViewsService';
import AnalyticsPreview from './widgets/AnalyticsPreview'
import CookiesPreview from './widgets/CookiesPreview';
import FeedBackPreview from './widgets/FeedBackPreview'
import { FiExternalLink } from 'react-icons/fi';
import { analyticsPreviewData } from './SampleData/sampleData'
import Popup from '../Misc/Popup';
import CreateAccount from './Accounts/CreateAccount';

const Home = () => {
  const { user } = useContext(AuthContext)
  const { account, changeAccount } = useAccount()
  const [fullAccount, setfullAccount] = useState({})
  const [views, setViews] = useState({})

  const [createModal, setcreateModal] = useState(false)
  const togglecreateModal = () => { setcreateModal(!createModal) }

  useEffect(() => {
    // Use for chart color
    user && account && setfullAccount(user?.accounts.filter(a => account === a.clientID)[0])
  }, [account, user])

  useEffect(() => {
    account && getAnalyticsHomeWidget(account)
      .then(v => setViews(v))
      .catch(e => console.log(e))
  }, [account])

  useEffect(() => {
    user?.accounts.length <= 0
      && setViews(analyticsPreviewData)
  }, [user])

  return (
    <Dashboard>
      {
        user?.accounts.length <= 0
        && <PrimaryCta
          title='Create your fist account'
          desc='To start using GlowHub, create your first account'
          btnFunc={togglecreateModal}
          text='Create account'
        />
      }

      <div className="row justify-content-between align-items-end mb-3">
        <div className="col-sm-8">
          <h1 className="mb-0">Dashboard</h1>
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
          <div className="col-lg-9">
            <div className="card__dashboard p-2">
              {
                views?.chart1data
                  ? <GlowChart data={views.chart1data} color={fullAccount?.color || '#0fa7e1'} type="line" />
                  : <div className="card__dashboard__loading p-4">
                    <span className="span"> </span>
                    <p className="mt-3"></p>
                  </div>
              }
            </div>
          </div>
          <div className="col-lg-3">
            <OnlineViews account={account} user={user} />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-4">
          <h3 className="mb-0">Products overview</h3>
          <p className="glow__muted">Last week overview</p>
        </div>
        <div className="row g-2 g-md-3">
          <div className="col-lg-4">
            <AnalyticsPreview account={account} user={user} />
          </div>
          <div className="col-lg-4">
            <CookiesPreview account={account} user={user} />
          </div>
          <div className="col-lg-4">
            <FeedBackPreview account={account} user={user} />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-4">
          <h3 className="mb-0">Discover</h3>
          <p className="glow__muted">Discover the latest products</p>
        </div>

        <div className="row g-2 g-md-3">
          <div className="col-lg-4">
            <div className="card__dashboard card__hoverable p-4" style={{ height: '150px' }}>
              <div className="h-100 d-flex flex-column justify-content-between">
                <small><FiExternalLink /> dev.to</small>
                <h5>My top 3 Useful Hacks for Working from Home</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        createModal &&
        <Popup close={togglecreateModal}>
          <CreateAccount
            closeFunc={togglecreateModal}
          />
        </Popup>
      }

    </Dashboard>
  )
}

export default Home
