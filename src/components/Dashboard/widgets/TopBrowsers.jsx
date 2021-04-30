import React from 'react'
import PropTypes from 'prop-types';

const TopBrowsers = ({ title, data }) => {
  return (
    <>
      {
        data
          ? <div className="card__dashboard p-4 h-100 card__hoverable">
            <div className="mb-3">
              <span className="glow__muted">{title}</span>
            </div>
            {
              data.map((d, id) => {
                return (
                  <div key={id} className="mt-2 mb-0 d-flex justify-content-between">
                    <div>
                      {d[0].toLowerCase().includes('safari') && <img src="/images/browsers/safari.svg" height="20px" className="me-3" alt="safari" />}
                      {d[0].toLowerCase().includes('chrome') && <img src="/images/browsers/chrome.svg" height="20px" className="me-3" alt="chrome" />}
                      {d[0] || 'Undefined'}
                    </div>
                    <div>{d[1]}</div>
                  </div>
                )
              })
            }
          </div>
          : <div className="card__dashboard p-1 mb-2">
            <div className="card__dashboard__loading p-4">
              <span></span>
              <p className="mt-2"></p>
            </div>
          </div>
      }
    </>
  )
}

TopBrowsers.propTypes = {
  title: PropTypes.string.isRequired
}

export default TopBrowsers
