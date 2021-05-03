import React from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

const ColapseCard = ({ handleClick, state, title, description }) => {
  return (
    <div onClick={handleClick} className="card__dashboard__sm card__hoverable p-3 mb-2 d-block d-lg-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <div className="acc__avatar" style={{ backgroundColor: '#35363a' }}></div>
        <div>
          <h6 className="m-0">{title}</h6>
          <small className="glow__muted d-block">{description}</small>
        </div>
      </div>
      <div className="mt-3 mt-lg-0">
        <button type='button' className="glow__btn__dark w-100">
          {
            !state
              ? 'Open'
              : 'Close'
          }
          {
            state
              ? <FiChevronUp className="ms-1" />
              : <FiChevronDown className="ms-1" />
          }
        </button>
      </div>
    </div>
  )
}

export default ColapseCard
