import React from 'react'
import { VictoryLine, VictoryBar, VictoryAxis, VictoryChart, VictoryLabel } from 'victory';

const GlowChart = ({ data, height = 150, x = 'day', y = 'views', color, type = 'line' }) => {
  return (
    <VictoryChart
      height={height}
      domainPadding={{ x: 0, y: 10 }}
      padding={{ top: 25, bottom: 25, left: 30, right: 25 }}
    >
      <VictoryLabel
        x={10}
        y={13}
        style={{
          fill: '#666766',
          fontFamily: "inherit",
          fontSize: "8px",
        }}
        text={`Visits from ${data[0].day} to ${data[data.length - 1].day}`}
      />
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
            //interpolation="cardinal"
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
            data={data}
            x={x}
            y={y}
          />
      }
    </VictoryChart>
  )
}

export default GlowChart
