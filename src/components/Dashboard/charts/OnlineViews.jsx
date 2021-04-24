import React, { useCallback, useEffect, useState } from 'react'
import { getViewsOnline } from '../../../services/ViewsService'

const OnlineViews = ({ account }) => {
  const [onlineViews, setOnlineViews] = useState()
  const [loading, setLoading] = useState(true)

  const getViews = useCallback(async () => {
    try {
      const views = await getViewsOnline(account)
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

  return (
    !loading
      ? (<div className="card__dashboard p-4">
        <span>Total users online</span>
        <h1 className="fw-light">{onlineViews?.totalUsers}</h1>

        <p className="mt-4 mb-2">Top active pages</p>
        <small className="glow__muted">Home - loquesea (/home)</small><br />
        <small className="glow__muted">About us (/about)</small><br />
        <small className="glow__muted">Another page (/another)</small><br />
        <small className="glow__muted">Home - loquesea (/home)</small><br />
      </div>)
      : (<div className="card__dashboard card__dashboard__loading p-4">
        <span className="span"> </span>
        <p className="mt-3 mb-2"></p>
      </div>)
  )
}

export default OnlineViews
