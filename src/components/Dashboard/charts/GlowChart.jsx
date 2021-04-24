import React from 'react'
import { VictoryLine, VictoryBar, VictoryAxis, VictoryChart } from 'victory';

const exampleData = [
  { day: '01/04', views: 13000 },
  { day: '02/04', views: 16500 },
  { day: '03/04', views: 17250 },
  { day: '04/04', views: 19000 },
  { day: '05/04', views: 20000 },
  { day: '06/04', views: 22500 },
  { day: '07/04', views: 22250 },
  { day: '08/04', views: 23000 },
  { day: '09/04', views: 24000 },
  { day: '10/04', views: 16500 },
  { day: '11/04', views: 18250 },
  { day: '12/04', views: 23000 },
  { day: '13/04', views: 25000 },
  { day: '14/04', views: 23000 },
  { day: '15/04', views: 23000 },
  { day: '16/04', views: 24000 },
  { day: '17/04', views: 16500 },
  { day: '18/04', views: 18250 },
  { day: '19/04', views: 23000 },
  { day: '20/04', views: 25000 },
  { day: '21/04', views: 23000 }
]

const GlowChart = ({ data = exampleData, height = 150, x = 'day', y = 'views', color, type = 'line' }) => {
  return (
    <VictoryChart
      height={height}
      domainPadding={{ x: 10 }}
      padding={{ top: 25, bottom: 25, left: 35, right: 20 }}
    >
      <VictoryAxis
        tickFormat={data.map(d => d.day)}
        style={{
          axis: { stroke: '#FFF', strokeWidth: 0 },
          ticks: { strokeWidth: 0 },
          tickLabels: {
            fill: '#6D6D6D',
            fontFamily: "inherit",
            fontSize: 6
          }
        }}
      />
      <VictoryAxis
        dependentAxis
        orientation="left"
        standalone={false}
        style={{
          grid: {
            stroke: "#ffffff",
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
      {
        type === 'line'
          ? <VictoryLine
            style={{
              data: { stroke: color, strokeWidth: 2 },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            interpolation="cardinal"
            data={data}
            x={x}
            y={y}
          />
          : <VictoryBar
            style={{
              data: { fill: color },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            interpolation="cardinal"
            data={data}
            x={x}
            y={y}
          />
      }
    </VictoryChart>
  )
}

export default GlowChart
