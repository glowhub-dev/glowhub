import React, { useState, useEffect } from 'react'
import { FiArrowDown, FiArrowUp } from 'react-icons/fi'

const CustomCollapseBrowsers = ({ title, data, link }) => {
  const [collapsed, setCollapsed] = useState(true)
  const [dataToUse, setDataToUse] = useState()

  useEffect(() => {
    if (data) {
      collapsed ? setDataToUse(data.slice(0, 5)) : setDataToUse(data)
    }
  }, [collapsed, data])

  return (
    <>
      {
        dataToUse
          ? <div className="card__dashboard p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="mb-3">
                <span className="glow__muted">{title}</span>
              </div>
              {
                dataToUse.length > 0
                  ? dataToUse.map((d, id) => {
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
                  : <small className="glow__muted d-block">There are no recent activity at this moment.</small>
              }
            </div>

            <div className="mt-3">
              {
                collapsed
                  ? <button onClick={() => setCollapsed(!collapsed)} className="white__link">
                    <small>See more <FiArrowDown /></small>
                  </button>
                  : <button onClick={() => setCollapsed(!collapsed)} className="white__link">
                    <small>See less <FiArrowUp /></small>
                  </button>
              }
            </div>
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

export default CustomCollapseBrowsers
