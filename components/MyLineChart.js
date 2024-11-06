'use client';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { date: '09-10-2023', categoryCount: 10 },
  { date: '10-10-2023', categoryCount: 15 },
  { date: '11-10-2023', categoryCount: 8 },
  { date: '12-10-2023', categoryCount: 12 },
  { date: '13-10-2023', categoryCount: 18 },
  { date: '14-10-2023', categoryCount: 14 },
  // Add more data points as needed
];

// Convert date format from "DD-MM-YYYY" to "YYYY-MM"
const formattedData = data.map((item) => {
  const [day, month, year] = item.date.split('-');
  return { date: `${year}-${month}`, categoryCount: item.categoryCount };
});

const LineChartExample = () => {
  return (
    <div style={{ width: '100%', height: '100%', padding: '20px', boxSizing: 'border-box' }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={formattedData}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          style={{ filter: 'drop-shadow(0px 0px 15px rgba(13, 148, 136, 0.8))' }} // Glow effect updated to match header style
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#0D9488" />
          <XAxis dataKey="date" stroke="#0D9488" tick={{ fill: '#0D9488' }} />
          <YAxis stroke="#0D9488" tick={{ fill: '#0D9488' }} />
          <Tooltip contentStyle={{ backgroundColor: '#0D9488', color: '#fff', borderRadius: '8px', border: '1px solid #0D9488' }} />
          <Legend wrapperStyle={{ color: '#FFFFFF' }} />
          <Line
            type="monotone"
            dataKey="categoryCount"
            stroke="#0D9488"
            strokeWidth={3}
            dot={{ r: 6, strokeWidth: 3, fill: '#FFFFFF', stroke: '#0D9488' }}
            activeDot={{ r: 8, fill: '#0D9488', stroke: '#FFFFFF', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartExample;


// import { LineChart, Line, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     pv: 4300,
//     amt: 2100,
//   },
// ];

// const MyLineChart = () => {
//   return (
//     <ResponsiveContainer>
//       <LineChart
//         data={data}
//         margin={{
//           top: 5,
//           right: 30,
//           left: 10,
//           bottom: 5,
//         }}
//       >
//         <YAxis stroke="#025F5F" />
//         <Tooltip />
//         <Line type="monotone" dataKey="pv" stroke="#025F5F" dot={false} />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default MyLineChart;
