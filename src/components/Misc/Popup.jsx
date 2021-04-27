import React, { useRef } from 'react'
import './Popup.scss'

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
      </div>
    </div>
  )
}

export default Popup
