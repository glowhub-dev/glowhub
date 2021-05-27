import React, { useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../../../contexts/AuthContext'
import useAccount from '../../../hooks/useAccount'
import { Collapse } from 'react-collapse';
import ColapseCard from '../Cookies/ColapseCard'
import Dashboard from '../Dashboard'
import CustomMiniWidget from '../widgets/CustomMiniWidget'
import { getBanner, getTotalFeedbackWidget, updateBanner } from '../../../services/FeedbackService'
import FeedbackBannerPreview from '../widgets/FeedbackBannerPreview'
import { ThemeContext } from '../../../contexts/ThemeContext';

const toastConfig = {
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
}
const bannerUpdated = () => toast.success('Banner updated successfully', toastConfig)
const errorOn = () => toast.error('An error has occurred', toastConfig)


const Feedback = () => {
  const { user } = useContext(AuthContext)
  const { theme } = useContext(ThemeContext)
  const { account, changeAccount } = useAccount()
  const [wData, setwData] = useState()
  const [bannerConfig, setbannerConfig] = useState()

  const [textCollapse, settextCollapse] = useState(false)
  const handleTextCollapse = () => { settextCollapse(!textCollapse) }
  const [colorsCollapse, setColorsCollapse] = useState(false)
  const handleColorsCollapse = () => { setColorsCollapse(!colorsCollapse) }

  useEffect(() => {
    account && getTotalFeedbackWidget(account)
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
          <h1 className="mb-0">Glow Feedback</h1>
          <p className="glow__muted">Get feedback from your customers</p>
        </div>
        <div className="col-sm-4 text-left text-sm-end">
          <select
            className={`${theme === 'light' ? 'glow__select__light' : 'glow__select'} mb-2`}
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
            title="Last week positive feedback"
            data={wData?.last7DaysPositive}
          />
        </div>
        <div className="col-sm-4 col-lg-3">
          <CustomMiniWidget
            title="Last week negative feedback"
            data={wData?.last7DaysNegative}
          />
        </div>
        <div className="col-sm-4 col-lg-3">
          <CustomMiniWidget
            title="Total positive feedback"
            data={wData?.totalPositive}
          />
        </div>
        <div className="col-sm-4 col-lg-3">
          <CustomMiniWidget
            title="Total negative feedback"
            data={wData?.totalNegative}
          />
        </div>
      </div>

      <div className="mt-4 mt-md-5">
        <h3 className="mb-0">Your feedback banner</h3>
        <p className="glow__muted">Customize & configure your banner</p>

        <div className="row mt-4 justify-content-between">
          <div className="col-sm-6">

            {
              bannerConfig
              && <form onSubmit={onSubmit}>
                <ColapseCard
                  handleClick={handleTextCollapse}
                  state={textCollapse}
                  title='Text config'
                  description='Change heading, description, buttons, etc.'
                />
                <Collapse isOpened={textCollapse}>
                  <div className="my-4">
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
                        name='description'
                      />
                    </div>
                    <div className="mb-3">
                      <label>Positive feedback</label>
                      <input
                        type="text"
                        className="glow__input w-100"
                        value={bannerConfig.goodBtn}
                        onChange={onChange}
                        name='goodBtn'
                      />
                    </div>
                    <div className="mb-3">
                      <label>Negative feedback</label>
                      <input
                        type="text"
                        className="glow__input w-100"
                        value={bannerConfig.badBtn}
                        onChange={onChange}
                        name='badBtn'
                      />
                    </div>
                    <div className="my-4">
                      <button type="submit" className="glow__btn w-100">Update feedback banner</button>
                    </div>
                  </div>
                </Collapse>

                <ColapseCard
                  handleClick={handleColorsCollapse}
                  state={colorsCollapse}
                  title='Customize banner styles'
                  description='Change heading, description, buttons, etc.'
                />
                <Collapse isOpened={colorsCollapse}>
                  <div className="my-4">

                    <div className="mb-3">
                      <label htmlFor="style">Banner style</label>
                      <select
                        className="glow__select w-100 mt-2"
                        aria-label="Banner style"
                        onChange={onChange}
                        value={bannerConfig.style}
                        name="style"
                        id="style"
                      >
                        <option value="1">Rounded</option>
                        <option value="2">Rounded small</option>
                        <option value="3">Square</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Text color</label>
                      <input
                        type="text"
                        className="glow__input w-100"
                        value={bannerConfig.color}
                        onChange={onChange}
                        name='color'
                      />
                    </div>
                    <div className="mb-3">
                      <label>background color</label>
                      <input
                        type="text"
                        className="glow__input w-100"
                        value={bannerConfig.background}
                        onChange={onChange}
                        name='background'
                      />
                    </div>

                    <div className="row row-cols-2">
                      <div className="col">
                        <div className="mb-3">
                          <label>Positive btn color</label>
                          <input
                            type="text"
                            className="glow__input w-100"
                            value={bannerConfig.goodBtnColor}
                            onChange={onChange}
                            name='goodBtnColor'
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label>Positive btn background</label>
                          <input
                            type="text"
                            className="glow__input w-100"
                            value={bannerConfig.goodBtnBackground}
                            onChange={onChange}
                            name='goodBtnBackground'
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row row-cols-2">
                      <div className="col">
                        <div className="mb-3">
                          <label>Negative btn color</label>
                          <input
                            type="text"
                            className="glow__input w-100"
                            value={bannerConfig.badBtnColor}
                            onChange={onChange}
                            name='badBtnColor'
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label>Negative btn background</label>
                          <input
                            type="text"
                            className="glow__input w-100"
                            value={bannerConfig.badBtnBackground}
                            onChange={onChange}
                            name='badBtnBackground'
                          />
                        </div>
                      </div>
                    </div>

                    <div className="my-4">
                      <button type="submit" className="glow__btn w-100">Update feedback banner</button>
                    </div>
                  </div>
                </Collapse>
              </form>
            }

          </div>
          <div className="col-sm-5">
            <FeedbackBannerPreview banner={bannerConfig} />
          </div>
        </div>

      </div>
    </Dashboard>
  )
}

export default Feedback
