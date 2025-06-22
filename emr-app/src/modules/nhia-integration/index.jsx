import React from 'react';

export default function NHIAIntegration() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">NHIA Integration</h2>
      <p className="text-gray-700">
        This module will integrate the system with NHIA (National Health Insurance Authority) for Ghana.
      </p>
      <ul className="list-disc pl-5 mt-4 text-gray-600">
        <li>Check NHIA membership status</li>
        <li>Upload claims for reimbursement</li>
        <li>View response reports from NHIA</li>
      </ul>
    </div>
  );
}
