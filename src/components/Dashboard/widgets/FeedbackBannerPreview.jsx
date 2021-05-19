import React from 'react'
import './CookiesBannerPreview.scss'

const FeedbackBannerPreview = ({ banner }) => {
  return (
    <>
      {
        banner &&
        <div
          id="glowCookies-banner"
          className={`glowCookies__banner__preview glowCookies__banner__${banner?.style} glowCookies__none glowCookies__left`}
          style={{ backgroundColor: banner?.background }}
        >
          <h3 style={{ color: banner?.color }}>{banner?.heading}</h3>
          <p style={{ color: banner?.color }}>
            {banner?.description}
          </p>
          <div className="btn__section">
            <button
              type="button"
              id="acceptCookies"
              className="btn__accept accept__btn__styles"
              style={{
                color: banner?.goodBtnColor,
                backgroundColor: banner?.goodBtnBackground
              }}>
              {banner?.goodBtn}
            </button>
            <button
              type="button"
              id="rejectCookies"
              className="btn__settings settings__btn__styles"
              style={{
                color: banner?.badBtnColor,
                backgroundColor: banner?.badBtnBackground
              }}>
              {banner?.badBtn}
            </button>
          </div>
        </div>
      }
    </>
  )
}

export default FeedbackBannerPreview
