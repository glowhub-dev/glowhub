import React from 'react'

const CustomWidget = ({ title, data }) => {

  return (
    <>
      {
        data
          ? <div className="card__dashboard p-4 h-100">
            <div className="mb-3">
              <span className="glow__muted">{title}</span>
            </div>
            {
              data.map((d, id) => {
                return (
                  <div key={id} className="mt-2 mb-0 d-flex justify-content-between">
                    <div>{d[0] || 'Undefined'}</div>
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

export default CustomWidget
