import React, { useRef } from 'react'
import PropTypes from 'prop-types';
import './Popup.scss'
import { FiX } from "react-icons/fi";

const Popup = ({ children, close }) => {
  const modal = useRef(null);

  window.onclick = (event) => {
    if (event.target === modal.current) {
      close()
    }
  }

  return (
    <div ref={modal} className="glow__popup">
      <div className="box">
        {children}
        <span onClick={close} className="close__popup"><FiX /></span>
      </div>
    </div>
  )
}

Popup.propTypes = {
  close: PropTypes.func.isRequired
}

export default Popup
