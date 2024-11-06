'use client';
import React, { useCallback } from 'react';
import { PieChart, Pie, Sector, Tooltip, ResponsiveContainer } from 'recharts';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    count,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 15) * cos;
  const sy = cy + (outerRadius + 15) * sin;
  const mx = cx + (outerRadius + 40) * cos;
  const my = cy + (outerRadius + 40) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 30;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} style={{ fontSize: '1.2em', fontWeight: 'bold', filter: 'drop-shadow(0px 0px 15px rgba(13, 148, 136, 1))' }}>
        {payload.status}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: 'drop-shadow(0px 0px 25px rgba(13, 148, 136, 0.6))' }} // Inner glow effect
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 15}
        fill={fill}
        style={{ filter: 'drop-shadow(0px 0px 25px rgba(13, 148, 136, 0.9))' }} // Outer glow effect
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
        strokeWidth={2}
        style={{ filter: 'drop-shadow(0px 0px 10px rgba(13, 148, 136, 1))' }}
      />
      <circle cx={ex} cy={ey} r={5} fill={fill} stroke="none" style={{ filter: 'drop-shadow(0px 0px 10px rgba(13, 148, 136, 1))' }} />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 15}
        y={ey}
        textAnchor={textAnchor}
        fill="#0D9488"
        style={{ fontWeight: 'bold', filter: 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.8))', fontSize: '1em' }}
      >
        {`Count ${count}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 15}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#0D9488"
        style={{ filter: 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.8))', fontSize: '0.9em' }}
      >
        {`(${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

const MyPieChart = ({ data, activeIndex, setActiveIndex }) => {
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          innerRadius={80}
          outerRadius={110}
          fill="#0D9488"
          dataKey="count"
          onMouseEnter={onPieEnter}
          style={{ filter: 'drop-shadow(0px 0px 20px rgba(13, 148, 136, 1))' }} // Enhanced glow effect for pie chart
        />
        <Tooltip contentStyle={{ backgroundColor: '#0D9488', color: '#fff', borderRadius: '12px', border: '2px solid #0D9488', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)' }} />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default MyPieChart;

// const data = [
//   { status: 'Group A', count: 400 },
//   { status: 'Group B', count: 300 },
//   { status: 'Group C', count: 300 },
//   { status: 'Group D', count: 200 },
// ];