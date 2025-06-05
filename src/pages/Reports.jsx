import React, { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';

const Reports = () => {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  // Dummy data for charts
  const visitData = [
    { name: 'Week 1', visits: 240 },
    { name: 'Week 2', visits: 400 },
    { name: 'Week 3', visits: 320 },
    { name: 'Week 4', visits: 280 },
  ];

  const diseaseData = [
    { name: 'Malaria', value: 120 },
    { name: 'Typhoid', value: 80 },
    { name: 'Diabetes', value: 50 },
    { name: 'Hypertension', value: 70 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Reports & Analytics</h2>

      <div className="flex gap-4">
        <div>
          <label className="block">From</label>
          <input type="date" value={dateRange.from} onChange={e => setDateRange({ ...dateRange, from: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block">To</label>
          <input type="date" value={dateRange.to} onChange={e => setDateRange({ ...dateRange, to: e.target.value })} className="input" />
        </div>
      </div>

      {/* Patient Visit Report */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Patient Visits Trend</h3>
        <BarChart width={600} height={300} data={visitData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="visits" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Disease Distribution */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Top Diagnosed Conditions</h3>
        <PieChart width={400} height={300}>
          <Pie data={diseaseData} cx="50%" cy="50%" outerRadius={100} label>
            {diseaseData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Future additions: Billing Summary, Drug Usage, etc. */}
    </div>
  );
};

export default Reports;
