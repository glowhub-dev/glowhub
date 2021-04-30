import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { FiMessageSquare } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { getCookiesWidget } from '../../../services/CookiesService';
import MiniChart from '../charts/MiniChart';

const FeedBackPreview = ({ account }) => {
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

  return (
    !loading
      ? <Link to="/feedback" className="card__dashboard card__hoverable p-4">
        <div className="glow__muted d-flex justify-content-between">
          <FiMessageSquare />
          <span>Glow Feedback</span>
        </div>
        <div className="mt-3 mb-0 d-flex justify-content-between">
          <span>Last week users</span>
          <span>5.467</span>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span>Last month users</span>
          <span>15.450</span>
        </div>
        {wdata.chartData && <MiniChart data={wdata.chartData} />}
      </Link>

      : <div className="card__dashboard card__dashboard__loading p-4">
        <span className="m-0"></span>
        <span className="mt-3"></span>
      </div>
  )
}

FeedBackPreview.propTypes = {
  account: PropTypes.string
}

export default FeedBackPreview
