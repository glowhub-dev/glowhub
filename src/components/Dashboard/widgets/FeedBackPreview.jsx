import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { FiMessageSquare } from "react-icons/fi";
import { Link } from 'react-router-dom';
import MiniChart from '../charts/MiniChart';
import { getFeedbackWidget } from '../../../services/FeedbackService';
import ReactTooltip from 'react-tooltip';
import { feedbackPreviewData } from '../SampleData/sampleData';

const FeedBackPreview = ({ account, user }) => {
  const [loading, setLoading] = useState(true)
  const [wdata, setwdata] = useState({})

  useEffect(() => {
    account && getFeedbackWidget(account)
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
      setwdata(feedbackPreviewData)
      setLoading(false)
    }
  }, [account, user])

  return (
    !loading
      ? <>
        <Link to="/feedback" className="card__dashboard card__hoverable p-4">
          <div className="glow__muted d-flex justify-content-between">
            <FiMessageSquare />
            <span>Glow Feedback</span>
          </div>
          <div className="mt-3 mb-0 d-flex justify-content-between">
            <span>Positive feedback</span>
            <span>
              <small data-tip="Compared to data from the previous week" className={`me-2 ${wdata.percentPositive < 0 ? 'text-danger' : 'text-success'}`}>
                ({wdata.percentPositive})
            </small>
              {wdata.positive}
            </span>
          </div>
          <div className="mb-2 d-flex justify-content-between">
            <span>Negative feedback</span>
            <span>
              <small data-tip="Compared to data from the previous week" className={`me-2 ${wdata.percentNegative > 0 ? 'text-danger' : 'text-success'}`}>
                ({wdata.percentNegative})
            </small>
              {wdata.negative}
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

FeedBackPreview.propTypes = {
  account: PropTypes.string
}

export default FeedBackPreview
