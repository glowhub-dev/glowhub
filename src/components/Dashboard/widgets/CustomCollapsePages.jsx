import React, { useState, useEffect } from 'react'
import { FiArrowDown, FiArrowUp } from 'react-icons/fi'

const CustomCollapsePages = ({ data }) => {
  const [collapsed, setCollapsed] = useState(true)
  const [dataToUse, setDataToUse] = useState()

  useEffect(() => {
    if (data) {
      collapsed ? setDataToUse(data.slice(0, 5)) : setDataToUse(data)
    }
  }, [collapsed, data])

  return (
    <div className="card__dashboard p-4 h-100 d-flex flex-column justify-content-between">
      <div>
        <span className="d-block mb-2">Total views per page</span>
        {
          dataToUse?.length > 0
            ? dataToUse?.sort((a, b) => b[1] - a[1]).map(page => {
              return (
                <div className="glow__muted d-flex justify-content-between" key={page[0].path}>
                  <div>{page[0].title.slice(0, 45)}{page[0].title.length > 45 && '...'} -  {page[0].path}</div>
                  <div>{page[1]}</div>
                </div>
              )
            })
            : <small className="glow__muted d-block">There are no available views at this moment.</small>
        }
      </div>
      <div className="mt-3">
        {dataToUse && dataToUse.length >= 5 ?
          collapsed
            ? <button onClick={() => setCollapsed(!collapsed)} className="white__link">
              <small>See more <FiArrowDown /></small>
            </button>
            : <button onClick={() => setCollapsed(!collapsed)} className="white__link">
              <small>See less <FiArrowUp /></small>
            </button>
          : null}
      </div>
    </div>
  )
}

export default CustomCollapsePages
