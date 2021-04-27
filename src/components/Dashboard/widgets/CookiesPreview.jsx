import React, { useState } from 'react'
import { FiShield } from "react-icons/fi";
import MiniChart from '../charts/MiniChart';

const CookiesPreview = () => {
  const [loading, setLoading] = useState(false)

  return (
    !loading
      ?
      <div className="card__dashboard p-4">
        <div className="glow__muted d-flex justify-content-between">
          <FiShield />
          <span>Glow Cookies</span>
        </div>
        <div className="mt-3 mb-0 d-flex justify-content-between">
          <span>Cookies Accepted</span>
          <span>15.000</span>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span>Cookies Rejected</span>
          <span>15.000</span>
        </div>
        {/* {views.chart1data && <MiniChart data={views.chart1data} />} */}
      </div>

      : <div className="card__dashboard card__dashboard__loading p-4">
        <span className="m-0"></span>
        <span className="mt-3"></span>
      </div>
  )
}

export default CookiesPreview
