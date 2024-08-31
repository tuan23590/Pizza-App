import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { name: 'Apr 5', Direct: 1200, Referral: 1100, Organic: 1500 },
  { name: 'Sep 8', Direct: 2100, Referral: 2000, Organic: 2200 },
  { name: 'Sep 8', Direct: 4100, Referral: 5000, Organic: 7200 },
  { name: 'Sep 8', Direct: 3100, Referral: 3000, Organic: 3200 },
  { name: 'Sep 8', Direct: 5100, Referral: 4000, Organic: 5200 },
  { name: 'Sep 8', Direct: 6100, Referral: 7000, Organic: 8200 },
  { name: 'Sep 8', Direct: 7100, Referral: 8000, Organic: 9200 },
  { name: 'Sep 8', Direct: 8100, Referral: 9000, Organic: 10200 },
  { name: 'Sep 8', Direct: 9100, Referral: 10000, Organic: 11200 },
  { name: 'Sep 8', Direct: 10100, Referral: 11000, Organic: 12200 },
  { name: 'Sep 8', Direct: 11100, Referral: 12000, Organic: 13200 },
  { name: 'Sep 8', Direct: 12100, Referral: 13000, Organic: 14200 },
  { name: 'Sep 8', Direct: 13100, Referral: 14000, Organic: 15200 },
  { name: 'Sep 8', Direct: 14100, Referral: 15000, Organic: 16200 },
  { name: 'Sep 8', Direct: 15100, Referral: 16000, Organic: 17200 },
  { name: 'Sep 8', Direct: 16100, Referral: 17000, Organic: 18200 },
  { name: 'Sep 8', Direct: 17100, Referral: 18000, Organic: 19200 },
  { name: 'Sep 8', Direct: 18100, Referral: 19000, Organic: 20200 },
  { name: 'Sep 8', Direct: 19100, Referral: 20000, Organic: 21200 },
  { name: 'Sep 8', Direct: 20100, Referral: 21000, Organic: 22200 },
  { name: 'Sep 8', Direct: 21100, Referral: 22000, Organic: 23200 },
  
  
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <p style={{ margin: 0, color: '#333', fontWeight: 'bold' }}>{label}</p>
        <hr/>
        {payload.map((item, index) => (
          <div key={index} style={{ marginTop: '5px', color: item.color }}>
            <span style={{ fontWeight: 'bold' }}>{item.name}:</span> {item.value.toLocaleString()}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

const BieuDoDuongTest = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1769aa" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#1769aa" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorReferral" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2196f3" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4dabf5" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#4dabf5" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tickFormatter={(value) => {
            const [month, day] = value.split(' ');
            if (day === '5') {
              return `${month} ${day}`;
            }
            return '';
          }}
        />
        <YAxis
          type="number"
          domain={[0, 40000]}
          tickFormatter={(value) =>
            value.toLocaleString ? value.toLocaleString() : value
          }
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Area type="monotone" dataKey="Direct" stackId="1" stroke="#1769aa" fill="url(#colorDirect)" />
        <Area type="monotone" dataKey="Referral" stackId="1" stroke="#2196f3" fill="url(#colorReferral)" />
        <Area type="monotone" dataKey="Organic" stackId="1" stroke="#4dabf5" fill="url(#colorOrganic)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BieuDoDuongTest;
