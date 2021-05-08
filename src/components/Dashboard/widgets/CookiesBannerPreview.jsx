import React from 'react'
import './CookiesBannerPreview.scss'

const CookiesBannerPreview = ({ banner }) => {
  return (
    <>
      {
        banner &&
        <div
          id="glowCookies-banner"
          className={`glowCookies__banner glowCookies__banner__${banner?.bannerStyle} glowCookies__${banner?.border} glowCookies__left`}
          style={{ backgroundColor: banner?.background }}
        >
          <h3 style={{ color: banner?.color }}>{banner?.heading}</h3>
          <p style={{ color: banner?.color }}>
            {banner?.description}
            <a
              href={banner?.link}
              target="_blank"
              rel="noreferrer"
              className="read__more"
              style={{ color: banner?.color }}
            >{banner.policyLinkText}
            </a>
          </p>
          <div className="btn__section">
            <button
              type="button"
              id="acceptCookies"
              className="btn__accept accept__btn__styles"
              style={{
                color: banner?.acceptBtnColor,
                backgroundColor: banner?.acceptBtnBackground
              }}>
              {banner?.acceptBtnText}
            </button>
            <button
              type="button"
              id="rejectCookies"
              className="btn__settings settings__btn__styles"
              style={{
                color: banner?.rejectBtnColor,
                backgroundColor: banner?.rejectBtnBackground
              }}>
              {banner?.rejectBtnText}
            </button>
          </div>
        </div>
      }
    </>
  )
}

export default CookiesBannerPreview
