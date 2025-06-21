import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const patientData = [
  { month: 'Jan', patients: 120 },
  { month: 'Feb', patients: 200 },
  { month: 'Mar', patients: 180 },
  { month: 'Apr', patients: 250 },
];

const diagnosisData = [
  { name: 'Malaria', cases: 45 },
  { name: 'Hypertension', cases: 30 },
  { name: 'Diabetes', cases: 20 },
  { name: 'Flu', cases: 60 },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Facility Dashboard</h1>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: 'Total Patients', value: 2045 },
          { title: 'Appointments Today', value: 48 },
          { title: 'New Registrations', value: 12 },
          { title: 'Sync Status', value: 'All Synced' }
        ].map((stat, index) => (
          <div key={index} className="bg-white shadow rounded p-4 text-center">
            <h2 className="text-sm font-medium text-gray-500">{stat.title}</h2>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Monthly Patient Visits</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={patientData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="patients" stroke="#4ade80" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Top Diagnoses</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={diagnosisData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cases" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
