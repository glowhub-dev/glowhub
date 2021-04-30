import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const PrimaryCta = ({ title, desc, to, text }) => {
  return (
    <div className="card__banner p-4 mb-4">
      <div className="row justify-content-between align-items-center">
        <div className="col-sm-8">
          <h3>{title}</h3>
          <p className="m-0">{desc}</p>
        </div>
        <div className="col-sm-3">
          <Link to={to} className="glow__btn w-100">{text}</Link>
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
