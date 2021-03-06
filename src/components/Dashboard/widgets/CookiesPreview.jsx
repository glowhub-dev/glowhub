import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { FiShield } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { getCookiesWidget } from '../../../services/CookiesService';
import MiniChart from '../charts/MiniChart';
import ReactTooltip from 'react-tooltip';
import { cookiesPreviewData } from '../SampleData/sampleData';

const CookiesPreview = ({ account, user }) => {
  const [loading, setLoading] = useState(true)
  const [wdata, setwdata] = useState({})

  useEffect(() => {
    account && getCookiesWidget(account)
      .then(data => {
        setwdata(data)
        setLoading(false)
      })
      .catch(e => {
        console.log(e)
      })
  }, [account])

  useEffect(() => {
    if (!account && user?.accounts.length <= 0) {
      setwdata(cookiesPreviewData)
      setLoading(false)
    }
  }, [account, user])

  return (
    !loading
      ?
      <>
        <Link to="/cookies" className="card__dashboard card__hoverable p-4">
          <div className="glow__muted d-flex justify-content-between">
            <FiShield />
            <span>Glow Cookies</span>
          </div>
          <div className="mt-3 mb-0 d-flex justify-content-between">
            <span>Cookies Accepted</span>
            <span>
              <small
                data-tip="Compared to data from the previous week"
                className={`me-2 ${wdata && wdata.percentRejected >= 0 ? 'badge-sm-success' : 'badge-sm-danger'}`}>
                {wdata && wdata.percentAccepted}
              </small>
              {wdata?.accepted}
            </span>
          </div>
          <div className="mb-2 d-flex justify-content-between">
            <span>Cookies Rejected</span>
            <span>
              <small
                data-tip="Compared to data from the previous week"
                className={`me-2 ${wdata && wdata.percentRejected >= 0 ? 'badge-sm-success' : 'badge-sm-danger'}`}>
                {wdata && wdata.percentRejected}
              </small>

              {wdata?.rejected}
            </span>
          </div>
          {wdata.chartData && <MiniChart data={wdata.chartData} />}
        </Link>
        <ReactTooltip />
      </>

      : <div className="card__dashboard card__dashboard__loading p-4">
        <span className="m-0"></span>
        <span className="mt-3"></span>
      </div>
  )
}

CookiesPreview.propTypes = {
  account: PropTypes.string,
}

export default CookiesPreview
