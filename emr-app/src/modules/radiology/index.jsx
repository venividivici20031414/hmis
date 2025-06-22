import React from 'react';

export default function Radiology() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Radiology Module</h2>
      <p className="text-gray-700">
        This module will handle radiology orders, imaging results, and reports.
      </p>
      <ul className="list-disc pl-5 mt-4 text-gray-600">
        <li>Order imaging tests (X-Ray, CT, MRI, Ultrasound)</li>
        <li>View uploaded radiology reports</li>
        <li>Track radiology technician workload</li>
      </ul>
    </div>
  );
}
