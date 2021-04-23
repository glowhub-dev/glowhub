import React, { useContext } from 'react'
import Dashboard from './Dashboard'
import { VictoryLine, VictoryAxis, VictoryChart } from 'victory';
import { AuthContext } from '../../contexts/AuthContext';
import useAccount from '../../hooks/useAccount';
import { Link } from 'react-router-dom';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 17250 },
  { quarter: 4, earnings: 19000 },
  { quarter: 5, earnings: 20000 },
  { quarter: 6, earnings: 22500 },
  { quarter: 7, earnings: 22250 },
  { quarter: 8, earnings: 23000 },
  { quarter: 9, earnings: 24000 },
  { quarter: 10, earnings: 16500 },
  { quarter: 11, earnings: 18250 },
  { quarter: 12, earnings: 23000 },
  { quarter: 13, earnings: 25000 }
];

const Home = () => {
  const { user } = useContext(AuthContext)
  const { account, changeAccount } = useAccount()

  const onChangeAccount = (e) => { changeAccount(e.target.value) }

  return (
    <Dashboard>

      {user?.accounts.length <= 0
        && (
          <div className="card__banner p-4 mb-4">
            <div className="row justify-content-between align-items-center">
              <div className="col-sm-8">
                <h3>Create your fist account</h3>
                <p className="m-0">To start using GlowHub, create your first account</p>
              </div>
              <div className="col-sm-3">
                <Link to="/create-account" className="glow__btn w-100">Create account</Link>
              </div>
            </div>
          </div>
        )}

      <div className="row justify-content-between align-items-end mb-3">
        <div className="col-sm-8">
          <h1>Dashboard</h1>
          <p className="glow__muted mb-0">Good to see you again, {user && user.name.split(' ')[0]}</p>
        </div>
        <div className="col-sm-4 text-left text-sm-end">
          <select
            className="glow__select mb-2"
            aria-label="Default select example"
            value={account}
            onChange={onChangeAccount}
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
        <div className="row">
          <div className="col-lg-9">
            <div className="card p-2" style={{ backgroundColor: '#1C1C1C', borderRadius: "1rem" }}>
              <VictoryChart
                height={150}
                domainPadding={{ x: 10 }}
                padding={{ top: 25, bottom: 25, left: 35, right: 20 }}
              >
                <VictoryAxis
                  dependentAxis
                  orientation="left"
                  standalone={false}
                  style={{
                    grid: {
                      stroke: ({ tick }) =>
                        tick === -10 ? "transparent" : "#ffffff",
                      strokeWidth: 0.1
                    },
                    axis: { stroke: '#FFF', strokeWidth: 0 },
                    ticks: { strokeWidth: 0 },
                    tickLabels: {
                      fill: '#6D6D6D',
                      fontFamily: "inherit",
                      fontSize: 6
                    }
                  }}
                />
                <VictoryLine
                  style={{
                    data: { stroke: "#00ace5", strokeWidth: 2 },
                  }}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                  }}
                  interpolation="cardinal"
                  data={data}
                  x="quarter"
                  y="earnings"
                />
              </VictoryChart>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card p-4" style={{ backgroundColor: '#1C1C1C', borderRadius: "1rem" }}>
              <span>Total users online</span>
              <h1 className="fw-light">751.346</h1>

              <p className="mt-4 mb-2">Top active pages</p>
              <small className="glow__muted">Home - loquesea (/home)</small><br />
              <small className="glow__muted">About us (/about)</small><br />
              <small className="glow__muted">Another page (/another)</small><br />
              <small className="glow__muted">Home - loquesea (/home)</small><br />
            </div>
          </div>
        </div>
      </div>

    </Dashboard>
  )
}

export default Home
