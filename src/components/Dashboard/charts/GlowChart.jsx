import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types';
import {
  VictoryLine,
  VictoryBar,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryTooltip,

  VictoryVoronoiContainer
} from 'victory';
import { ThemeContext } from '../../../contexts/ThemeContext';

const GlowChart = ({ data, data2, x = 'day', y = 'views', color, type = 'line' }) => {
  const { theme } = useContext(ThemeContext)

  const [height, setHeight] = useState(150)
  const setHeightw = () => {
    setHeight(window.innerWidth <= 550 ? 350 : 150)
  }

  useEffect(() => {
    setHeightw()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', setHeightw)
    return () => {
      window.removeEventListener('resize', setHeightw)
    }
  }, [])

  return (
    <VictoryChart
      height={height}
      domainPadding={{ x: 0, y: 10 }}
      padding={{ top: 25, bottom: 25, left: 30, right: 25 }}

      containerComponent={
        <VictoryVoronoiContainer voronoiDimension="x"
          labels={({ datum }) => `${datum.views} views`}
          labelComponent={
            <VictoryTooltip cornerRadius={5}
              flyoutStyle={{
                fill: "none",
                stroke: 'none'
              }}
              pointerLength={3}
            />}
        />
      }
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
        tickFormat={(x, i) => {
          if (data.length < 10) {
            return x
          } else if (i % (Math.floor(data.length / 10)) === 0) {
            return x
          }
        }}
        style={{
          axis: { stroke: `${theme === 'light' ? '#fff' : '#000'}`, strokeWidth: 0 },
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
            stroke: `${theme === 'light' ? '#000' : '#fff'}`,
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
          ?
          <VictoryLine
            style={{
              data: { stroke: color, strokeWidth: window.innerWidth <= 550 ? 5 : 2 },
              labels: {
                fontFamily: "inherit",
                fontSize: 8,
                fill: `${theme === 'light' ? '#000' : '#fff'}`
              }
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            data={data}
            x={x}
            y={y}
          />
          : <VictoryBar
            style={{
              data: { fill: color },
              labels: {
                fontFamily: "inherit",
                fontSize: 8,
                fill: `${theme === 'light' ? '#000' : '#fff'}`
              }
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

GlowChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
  x: PropTypes.string,
  y: PropTypes.string,
  color: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['line', 'bar'])
}

export default GlowChart