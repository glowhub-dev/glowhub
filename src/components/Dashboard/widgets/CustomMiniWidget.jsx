import React from 'react'
import PropTypes from 'prop-types';

const CustomMiniWidget = ({ title, data }) => {
  return (
    <>
      {
        data
          ? <div className="card__dashboard p-4 mb-2">
            <span className="glow__muted">{title}</span>
            <h2 className="fw-light m-0">{data || 0}</h2>
          </div>
          : <div className="card__dashboard p-1 mb-2">
            <div className="card__dashboard__loading p-4">
              <span></span>
            </div>
          </div>
      }
    </>
  )
}

CustomMiniWidget.propTypes = {
  title: PropTypes.string.isRequired
}

export default CustomMiniWidget
