import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { getViewsOnlineHomeWidget } from '../../../services/ViewsService'
import { FiArrowRight } from "react-icons/fi";

const OnlineViews = ({ account, user }) => {
  const [onlineViews, setOnlineViews] = useState()
  const [loading, setLoading] = useState(true)

  const getViews = useCallback(async () => {
    try {
      const views = await getViewsOnlineHomeWidget(account)
      views && setOnlineViews(views)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }, [account])

  useEffect(() => {
    setLoading(true)
  }, [account])

  useEffect(() => {
    if (account) {
      setTimeout(getViews, 500)
      const interval = setInterval(getViews, 3000);
      return () => clearInterval(interval);
    }
  }, [account, getViews])

  useEffect(() => {
    if (!account && user?.accounts.length <= 0) {
      setOnlineViews({ pages: [], totalUsers: 34 })
      setLoading(false)
    }
  }, [account, user])

  return (
    !loading
      ? (<div className="card__dashboard p-4 h-100 d-flex flex-column justify-content-between">
        <div>
          <span>Total users online</span>
          <h1 className="fw-light">{onlineViews?.totalUsers}</h1>

          <div className="mb-3">
            <p className="mt-4 mb-2">Top active pages</p>
            {
              onlineViews?.pages.length > 0
                ? onlineViews?.pages.sort((a, b) => a[1] - b[1]).slice(-3).map(page => {
                  return (
                    <small className="glow__muted d-block" key={page[0].path}>
                      {page[0].title.slice(0, 15)}{page[0].title.length > 10 && '...'} - {page[0].path.slice(-10)}
                    </small>)
                })
                : <small className="glow__muted d-block">There are no online users at this moment.</small>
            }
          </div>
        </div>

        <Link to="/online" className="white__link">
          <small>See more <FiArrowRight /></small>
        </Link>
      </div>)
      : (<div className="card__dashboard card__dashboard__loading p-4 h-100">
        <span className="span"> </span>
        <p className="mt-3 mb-2"></p>
      </div>)
  )
}

OnlineViews.propTypes = {
  account: PropTypes.string
}

export default OnlineViews
