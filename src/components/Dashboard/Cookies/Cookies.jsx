import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import useAccount from '../../../hooks/useAccount'
import Dashboard from '../Dashboard'
import CustomMiniWidget from '../widgets/CustomMiniWidget'
import { getTotalCookiesWidget, updateBanner, getBanner } from '../../../services/CookiesService'
import CookiesBannerPreview from '../widgets/CookiesBannerPreview'
import toast from 'react-hot-toast'
import { Collapse } from 'react-collapse';
import { FiChevronDown } from 'react-icons/fi'

const toastConfig = {
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
}
const bannerUpdated = () => toast.success('Banner updated successfully', toastConfig)
const errorOn = () => toast.success('An error has occurred', toastConfig)

const Cookies = () => {
  const { user } = useContext(AuthContext)
  const { account, changeAccount } = useAccount()
  const [wData, setwData] = useState()
  const [bannerConfig, setbannerConfig] = useState()

  const [textCollapse, settextCollapse] = useState(false)
  const [stylesCollapse, setstylesCollapse] = useState(false)
  const [trackingScripts, setTrackingScripts] = useState(false)

  const handleTextCollapse = () => { settextCollapse(!textCollapse) }
  const handleStylesCollapse = () => { setstylesCollapse(!stylesCollapse) }
  const handleTrackingScripts = () => { setTrackingScripts(!trackingScripts) }

  useEffect(() => {
    account && getTotalCookiesWidget(account)
      .then(data => setwData(data))
      .catch(() => errorOn())
  }, [account])

  useEffect(() => {
    account && getBanner(account)
      .then(d => setbannerConfig(d.config))
      .catch(() => errorOn())
  }, [account])

  const onChange = (e) => {
    setbannerConfig({
      ...bannerConfig,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    updateBanner(account, bannerConfig)
      .then(() => bannerUpdated())
      .catch(() => errorOn())
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
        <p className="glow__muted">Customize & configure your banner</p>

        <div className="row mt-4 justify-content-between">
          <div className="col-sm-6">
            {
              bannerConfig &&
              <form onSubmit={onSubmit}>

                <div onClick={handleTextCollapse} className="card__dashboard__sm p-3 mb-2 d-block d-lg-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="acc__avatar" style={{ backgroundColor: '#35363a' }}></div>
                    <div>
                      <h6 className="m-0">Text config</h6>
                      <small className="glow__muted d-block">Change heading, description, buttons, etc.</small>
                    </div>
                  </div>
                  <div className="mt-3 mt-lg-0">
                    <button type='button' className="glow__btn__dark w-100">Open <FiChevronDown className="ms-1" /></button>
                  </div>
                </div>
                <Collapse isOpened={textCollapse}>
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
                      type="url"
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

                  <div className="mb-3">
                    <button type="submit" className="glow__btn w-100">Update cookies banner</button>
                  </div>
                </Collapse>


                <div onClick={handleStylesCollapse} className="card__dashboard__sm p-3 mb-2 d-block d-lg-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="acc__avatar" style={{ backgroundColor: '#35363a' }}></div>
                    <div>
                      <h6 className="m-0">Customize colors</h6>
                      <small className="glow__muted d-block">Change backgrounds, text colors, style, etc.</small>
                    </div>
                  </div>
                  <div className="mt-3 mt-lg-0">
                    <button type='button' className="glow__btn__dark w-100">Open <FiChevronDown className="ms-1" /></button>
                  </div>
                </div>
                <Collapse isOpened={stylesCollapse}>
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
                  <div className="mb-3">
                    <label>Position</label>
                    <input
                      type="text"
                      className="glow__input w-100"
                      value={bannerConfig.position}
                      onChange={onChange}
                      name="position"
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
                  <div className="mb-4 row">
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

                  <div className="mb-3">
                    <button type="submit" className="glow__btn w-100">Update cookies banner</button>
                  </div>
                </Collapse>

                <div onClick={handleTrackingScripts} className="card__dashboard__sm p-3 mb-2 d-block d-lg-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="acc__avatar" style={{ backgroundColor: '#35363a' }}></div>
                    <div>
                      <h6 className="m-0">Tracking scripts</h6>
                      <small className="glow__muted d-block">Change analytics, hotjar or custom scripts.</small>
                    </div>
                  </div>
                  <div className="mt-3 mt-lg-0">
                    <button type='button' className="glow__btn__dark w-100">Open <FiChevronDown className="ms-1" /></button>
                  </div>
                </div>
                <Collapse isOpened={trackingScripts}>

                </Collapse>

              </form>
            }
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
