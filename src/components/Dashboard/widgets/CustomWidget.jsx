import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CustomWidget = ({ title, data, link }) => {

  return (
    <>
      {
        data
          ?
          link
            ? <Link to={link} className="card__dashboard p-4 h-100 card__hoverable">
              <div className="mb-3">
                <span className="glow__muted">{title}</span>
              </div>
              {
                data.length > 0
                  ? data.map((d, id) => {
                    return (
                      <div key={id} className="mt-2 mb-0 d-flex justify-content-between">
                        <div>{d[0] || 'Undefined'}</div>
                        <div>{d[1]}</div>
                      </div>
                    )
                  })
                  : <small className="glow__muted d-block">There are no recent activity at this moment.</small>
              }
            </Link>
            : <div className="card__dashboard p-4 h-100">
              <div className="mb-3">
                <span className="glow__muted">{title}</span>
              </div>
              {
                data.length > 0
                  ? data.map((d, id) => {
                    return (
                      <div key={id} className="mt-2 mb-0 d-flex justify-content-between">
                        <div>{d[0] || 'Undefined'}</div>
                        <div>{d[1]}</div>
                      </div>
                    )
                  })
                  : <small className="glow__muted d-block">There are no recent activity at this moment.</small>
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

CustomWidget.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string
}

export default CustomWidget
