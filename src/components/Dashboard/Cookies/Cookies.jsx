import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import useAccount from '../../../hooks/useAccount'
import Dashboard from '../Dashboard'
import CustomMiniWidget from '../widgets/CustomMiniWidget'
import { getTotalCookiesWidget } from '../../../services/CookiesService'
import CookiesBannerPreview from '../widgets/CookiesBannerPreview'

const bannerData = {
  heading: 'We use cookies',
  description: 'We use our own and third-party cookies to personalize content and to analyze web traffic.',
  background: "#1c1c1c",
  color: "#fff",
  acceptBtnColor: "white",
  acceptBtnBackground: '#6d6d6d',
  acceptBtnText: "Accept cookies",
  rejectBtnColor: "white",
  rejectBtnBackground: '#6d6d6d',
  rejectBtnText: "Reject",
  bannerStyle: 1,
  border: 'none',
  policyLink: 'https://glowmedia.es',
  policyLinkText: 'Read more about cookies'
}

const Cookies = () => {
  const { user } = useContext(AuthContext)
  const { account, changeAccount } = useAccount()
  const [wData, setwData] = useState()
  const [bannerConfig, setbannerConfig] = useState({})

  useEffect(() => {
    account && getTotalCookiesWidget(account)
      .then(data => setwData(data))
      .catch(e => console.log(e))
  }, [account])

  useEffect(() => {
    setbannerConfig(bannerData)
  }, [])

  const onChange = (e) => {
    setbannerConfig({
      ...bannerConfig,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Dashboard>
      <div className="row justify-content-between align-items-end mb-3">
        <div className="col-sm-8">
          <h1 className="mb-0">Glow Cookies</h1>
          <p className="glow__muted">Easy and advanced cookie management</p>
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

      <div className="row g-2 g-md-3 my-1">
        <div className="col-sm-4 col-lg-3">
          <CustomMiniWidget
            title="Last week accepted"
            data={wData?.last7DaysAccepted}
          />
        </div>
        <div className="col-sm-4 col-lg-3">
          <CustomMiniWidget
            title="Last week rejected"
            data={wData?.last7DaysRejected}
          />
        </div>
        <div className="col-sm-4 col-lg-3">
          <CustomMiniWidget
            title="Total accepted"
            data={wData?.totalAccepted}
          />
        </div>
        <div className="col-sm-4 col-lg-3">
          <CustomMiniWidget
            title="Total rejected"
            data={wData?.totalRejected}
          />
        </div>
      </div>

      <div className="mt-4 mt-md-5">
        <h3 className="mb-0">Your cookies banner</h3>
        <p className="glow__muted">Text configuration</p>

        <div className="row mt-4 justify-content-between">
          <div className="col-sm-6">
            <form>
              <div className="mb-3">
                <label>Heading</label>
                <input
                  type="text"
                  className="glow__input w-100"
                  value={bannerConfig.heading}
                  onChange={onChange}
                  name='heading'
                />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <input
                  type="text"
                  className="glow__input w-100"
                  value={bannerConfig.description}
                  onChange={onChange}
                  name="description"
                />
              </div>
              <div className="mb-3">
                <label>Policy link</label>
                <input
                  type="text"
                  className="glow__input w-100"
                  value={bannerConfig.policyLink}
                  onChange={onChange}
                  name="policyLink"
                />
              </div>
              <div className="mb-3">
                <label>Policy link text</label>
                <input
                  type="text"
                  className="glow__input w-100"
                  value={bannerConfig.policyLinkText}
                  onChange={onChange}
                  name="policyLinkText"
                />
              </div>
              <div className="mb-3 row">
                <div className="col">
                  <label>Accept text</label>
                  <input
                    type="text"
                    className="glow__input w-100"
                    value={bannerConfig.acceptBtnText}
                    onChange={onChange}
                    name="acceptBtnText"
                  />
                </div>
                <div className="col">
                  <label>Reject text</label>
                  <input
                    type="text"
                    className="glow__input w-100"
                    value={bannerConfig.rejectBtnText}
                    onChange={onChange}
                    name="rejectBtnText"
                  />
                </div>
              </div>

              <div className="mt-4">
                <p className="glow__muted">Banner styles</p>
                <hr />
              </div>
              <div className="mb-3">
                <label>Banner style</label>
                <input
                  type="text"
                  className="glow__input w-100"
                  value={bannerConfig.bannerStyle}
                  onChange={onChange}
                  name="bannerStyle"
                />
              </div>

              <div className="mt-4">
                <p className="glow__muted">Colors configuration</p>
                <hr />
              </div>
              <div className="mb-3 row">
                <div className="col">
                  <label>Background color</label>
                  <input
                    type="text"
                    className="glow__input w-100"
                    value={bannerConfig.background}
                    onChange={onChange}
                    name="background"
                  />
                </div>
                <div className="col">
                  <label>Text color</label>
                  <input
                    type="text"
                    className="glow__input w-100"
                    value={bannerConfig.color}
                    onChange={onChange}
                    name="color"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col">
                  <label>Accept button color</label>
                  <input
                    type="text"
                    className="glow__input w-100"
                    value={bannerConfig.acceptBtnColor}
                    onChange={onChange}
                    name="acceptBtnColor"
                  />
                </div>
                <div className="col">
                  <label>Accept button background</label>
                  <input
                    type="text"
                    className="glow__input w-100"
                    value={bannerConfig.acceptBtnBackground}
                    onChange={onChange}
                    name="acceptBtnBackground"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col">
                  <label>Reject button color</label>
                  <input
                    type="text"
                    className="glow__input w-100"
                    value={bannerConfig.rejectBtnColor}
                    onChange={onChange}
                    name="rejectBtnColor"
                  />
                </div>
                <div className="col">
                  <label>Reject button background</label>
                  <input
                    type="text"
                    className="glow__input w-100"
                    value={bannerConfig.rejectBtnBackground}
                    onChange={onChange}
                    name="rejectBtnBackground"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-sm-5">
            <CookiesBannerPreview banner={bannerConfig} />
          </div>
        </div>
      </div>

    </Dashboard>
  )
}

export default Cookies
