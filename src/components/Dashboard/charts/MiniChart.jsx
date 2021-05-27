import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { VictoryLine, VictoryAxis, VictoryChart } from 'victory';
import { ThemeContext } from '../../../contexts/ThemeContext';

const MiniChart = ({ data, height = 40, x = 'day', y = 'views', type = 'line' }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <VictoryChart
      height={height}
      domainPadding={{ x: 0, y: 10 }}
      padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
    >

      <VictoryAxis style={{ tickLabels: { fontSize: 0 } }} />
      <VictoryLine
        style={{
          data: { stroke: `${theme === 'light' ? '#000' : '#fff'}`, strokeWidth: 4, opacity: 0.3 },
        }}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
        data={data}
        x={x}
        y={y}
      />
    </VictoryChart>
  )
}

MiniChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
  x: PropTypes.string,
  y: PropTypes.string,
  type: PropTypes.string
}

export default MiniChart
