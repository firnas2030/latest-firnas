'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const MyBarChart = ({ data }) => {
  const heightOfLabel = () => {
    const tallestLabel = Math.max(...data.map((item) => item.category.length));
    const height = tallestLabel * 7.5;
    return height;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: heightOfLabel(),
        }}
      >
        <XAxis
          dataKey="category"
          angle={-45}
          textAnchor="end"
          interval={0}
          height={heightOfLabel()}
          stroke="#0D9488"
          tick={{ fill: '#0D9488', fontSize: '0.9em', fontWeight: 'bold' }}
        />
        <YAxis stroke="#0D9488" tick={{ fill: '#0D9488', fontSize: '0.9em', fontWeight: 'bold' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0D9488',
            color: '#fff',
            borderRadius: '8px',
            border: '1px solid #0D9488',
          }}
        />
        <Bar dataKey="count" radius={[10, 10, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill="#0D9488"
              style={{ filter: 'drop-shadow(0px 0px 5px rgba(13, 148, 136, 0.5))' }}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;


// const data = [
//   {
//     category: 'بروز حواجز حديدية او خرسانية مشوهة أو مخالفة أو مهملة على الطرق',
//     count: 10,
//   },
//   {
//     category: 'مخلفات الهدم والبناء',
//     count: 10,
//   },
//   {
//     category: 'تدني مستوى نظافة الأماكن العامة',
//     count: 30,
//   },
// ];