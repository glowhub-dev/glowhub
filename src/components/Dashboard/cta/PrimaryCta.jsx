import React from 'react'
import PropTypes from 'prop-types';

const PrimaryCta = ({ title, desc, btnFunc, text }) => {
  return (
    <div className="card__banner p-4 mb-4">
      <div className="row justify-content-between align-items-center">
        <div className="col-sm-8">
          <h3>{title}</h3>
          <p className="m-0">{desc}</p>
        </div>
        <div className="col-sm-3">
          <button type="button" onClick={btnFunc} className="glow__btn w-100">{text}</button>
        </div>
      </div>
    </div>
  )
}

PrimaryCta.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default PrimaryCta
