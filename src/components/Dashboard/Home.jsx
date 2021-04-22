import React from 'react'
import Dashboard from './Dashboard'
import { VictoryLine, VictoryAxis, VictoryChart } from 'victory';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
  { quarter: 5, earnings: 13000 },
  { quarter: 6, earnings: 16500 },
  { quarter: 7, earnings: 14250 },
  { quarter: 8, earnings: 19000 },
  { quarter: 9, earnings: 13000 },
  { quarter: 10, earnings: 16500 },
  { quarter: 11, earnings: 14250 },
  { quarter: 12, earnings: 19000 },
  { quarter: 13, earnings: 13000 }
];

const Home = () => {
  return (
    <Dashboard>
      <h1>Dashboard</h1>
      <p className="glow__muted">Good to see you again, Manuel</p>

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
            <div className="card p-5" style={{ backgroundColor: '#1C1C1C', borderRadius: "1rem" }}>
              <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </div>
          </div>
        </div>
      </div>


      <div className="mt-5">
        <h1>Reports overview</h1>
        <p className="glow__muted">Good to see you again, Manuel</p>
      </div>

      <div className="mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="card p-5" style={{ backgroundColor: '#1C1C1C', borderRadius: "1rem" }}>
              <br></br><br></br><br></br><br></br>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-5" style={{ backgroundColor: '#1C1C1C', borderRadius: "1rem" }}>
              <br></br><br></br><br></br><br></br>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-5" style={{ backgroundColor: '#1C1C1C', borderRadius: "1rem" }}>
              <br></br><br></br><br></br><br></br>
            </div>
          </div>
        </div>
      </div>


      <div className="mt-5">
        <h1>Reports overview</h1>
        <p className="glow__muted">Good to see you again, Manuel</p>
      </div>

      <div className="mt-4">
        <div className="card p-5" style={{ backgroundColor: '#1C1C1C', borderRadius: "1rem" }}>
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
      </div>
    </Dashboard>
  )
}

export default Home
