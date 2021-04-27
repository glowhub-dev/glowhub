import React from 'react'

const CustomMiniWidget = ({ title, data }) => {
  return (
    <div className="card__dashboard p-4 mb-2">
      <span className="glow__muted">{title}</span>
      <h2 className="fw-light m-0">{data}</h2>
    </div>
  )
}

export default CustomMiniWidget
