import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FiBarChart } from "react-icons/fi"
import { Link } from 'react-router-dom'
import { getAnalyticsHomeWidget } from '../../../services/ViewsService'
import MiniChart from '../charts/MiniChart'
import ReactTooltip from 'react-tooltip';

const AnalyticsPreview = ({ account }) => {
  const [views, setViews] = useState()
  const [loading, setLoading] = useState(true)

  const getViews = useCallback(async () => {
    try {
      const views = await getAnalyticsHomeWidget(account)
      views && setViews(views)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }, [account])

  useEffect(() => {
    setLoading(true)
  }, [account])

  useEffect(() => {
    if (account) { getViews() }
  }, [account, getViews])


  return (
    !loading
      ? <>
        <Link
          to="/analytics"
          className="card__dashboard card__hoverable p-4"
        >
          <div className="glow__muted d-flex justify-content-between">
            <FiBarChart />
            <span>Glow Analytics</span>
          </div>
          <div className="mt-3 mb-0 d-flex justify-content-between">
            <span>Last week users</span>
            <span>
              <small data-tip="Compared to data from the previous week" className={`me-2 ${views && views.percentUsers < 0 ? 'text-danger' : 'text-success'}`}>
                ({views && views.percentUsers})
            </small>
              {views && views.totalUsers}
            </span>
          </div>
          <div className="mb-2 d-flex justify-content-between">
            <span>Last week views</span>
            <span>
              <small data-tip="Compared to data from the previous week" className={`me-2 ${views && views.percentViews < 0 ? 'text-danger' : 'text-success'}`}>
                ({views && views.percentViews})
              </small>
              {views && views.totalViews}
            </span>
          </div>
          {views.chart1data && <MiniChart data={views?.chart1data} />}
        </Link>
        <ReactTooltip />
      </>

      : <div className="card__dashboard card__dashboard__loading p-4">
        <span className="m-0"></span>
        <span className="mt-3"></span>
      </div>
  )
}

AnalyticsPreview.propTypes = {
  account: PropTypes.string,
}

export default AnalyticsPreview
