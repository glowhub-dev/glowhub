import React, { useContext, useState, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { AuthContext } from '../../../contexts/AuthContext'
import useAccount from '../../../hooks/useAccount'
import Dashboard from '../Dashboard'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardNumberElement } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_aKXAngMXOasC99dapoLzwS5500SAkrz1IT');

const Plan = () => {
  const { user } = useContext(AuthContext)
  const { account, changeAccount } = useAccount()
  const [fullAccount, setfullAccount] = useState({})

  useEffect(() => {
    user && account && setfullAccount(user?.accounts.filter(a => account === a.clientID)[0])
  }, [account, user])

  return (
    <Dashboard>

      <div className="row justify-content-between align-items-end mb-3">
        <div className="col-sm-8">
          <h1 className="mb-0">Plan & billing</h1>
          <p className="glow__muted mb-3 mb-md-0">Good to see you again, {user && user.name.split(' ')[0]}</p>
        </div>
        <div className="col-sm-4 text-left text-sm-end">
          <select
            className="glow__select mb-2"
            aria-label="Default select example"
            value={account}
            onChange={(e) => { changeAccount(e.target.value) }}
          >
            {
              user?.accounts.length > 0
                ? user.accounts.map(acc => (<option value={acc.clientID} key={acc.clientID}>{acc.name}</option>))
                : <option value="no">No accounts</option>
            }
          </select>
        </div>
      </div>

      <div className="mt-4">
        <div className="row g-3 g-lg-4 mb-4">
          <div className="col-lg-3">
            <div className="card__dashboard p-4" style={{ border: '2px solid #1c1c1c' }}>
              {
                fullAccount?.billing_plan === 'free'
                && <small>Your current plan</small>
              }
              <h2>Free plan</h2>
              <p className="glow__muted m-0">Free, forever</p>
              <hr />

              <h6 className="mb-0">Glow Analytics</h6>
              <small className="d-block glow__muted mb-3">Up to 10.000 views/month</small>

              <h6 className="mb-0">Glow Cookies</h6>
              <small className="d-block glow__muted mb-3">Up to 7.500 actions/month</small>

              <h6 className="mb-0">Glow Feedback</h6>
              <small className="d-block glow__muted">Up to 3.000 actions/month</small>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="card__dashboard p-4 h-100 d-flex flex-column justify-content-between" style={{ border: '2px solid #00ace5' }}>
              <div>
                {
                  fullAccount?.billing_plan === 'free'
                    ? <small>Recomended option</small>
                    : <small>Your current plan</small>
                }

                <div className="d-flex justify-content-between">
                  <div>
                    <h1>Unlimited</h1>
                    <p className="glow__muted m-0">Monthly pricing for projects and teams of all sizes.</p>
                  </div>
                  <div>
                    <h3>$9,99/mes</h3>
                  </div>
                </div>
                <hr />

                <p className="mb-1">
                  Enjoy <strong>Glow Analytics</strong>, <strong>Glow Cookies</strong> & <strong>Glow Feedback</strong> without limits.
                </p>
                <p className="mb-1">
                  Enterprise Support.
                </p>
              </div>

              {
                fullAccount?.billing_plan === 'free'
                  ? <button className="glow__btn__blue mt-3 w-100">
                    Become unlimited <FaArrowRight className="ms-2" style={{ marginTop: '-4px' }} />
                  </button>
                  : <button className="glow__btn__dark mt-3 w-100">
                    Cancel subscription
                  </button>
              }

            </div>
          </div>
        </div>

        <div>
          <p className="mb-0 glow__muted">This is the plan corresponding to the {fullAccount?.name} account.</p>
          <p className="mb-0 glow__muted">Each plan corresponds to a single account and resources cannot be shared between them.</p>
          <p className="glow__muted">
            Each plan is subject to our fair use policy and its respective platform limits.
            Free plam are limited to personal, non-commercial use.
          </p>
        </div>
      </div>

      <Elements stripe={stripePromise}>
        <CardNumberElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#fff',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </Elements>
    </Dashboard>
  )
}

export default Plan
