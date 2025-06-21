import React, { useState } from 'react';

export default function Billing() {
  const [bill, setBill] = useState({
    patientName: '',
    services: '',
    amount: '',
    paymentMethod: 'cash',
    insuranceProvider: '',
    insuranceNumber: '',
  });

  const [claims, setClaims] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBill({ ...bill, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to billing database (offline PouchDB logic can be added)
    console.log('Billing record submitted:', bill);
    alert('Billing record created');
    setBill({
      patientName: '',
      services: '',
      amount: '',
      paymentMethod: 'cash',
      insuranceProvider: '',
      insuranceNumber: '',
    });
  };

  const handleClaimSubmit = () => {
    const claim = {
      insuranceProvider: bill.insuranceProvider,
      patientName: bill.patientName,
      insuranceNumber: bill.insuranceNumber,
      amount: bill.amount,
      status: 'Pending',
      date: new Date().toLocaleDateString(),
    };
    setClaims([...claims, claim]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Billing Creation Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="patientName" value={bill.patientName} onChange={handleChange} placeholder="Patient Name" className="input" required />
        <input type="text" name="services" value={bill.services} onChange={handleChange} placeholder="Services Rendered" className="input" required />
        <input type="number" name="amount" value={bill.amount} onChange={handleChange} placeholder="Amount" className="input" required />
        <select name="paymentMethod" value={bill.paymentMethod} onChange={handleChange} className="input">
          <option value="cash">Cash</option>
          <option value="insurance">Insurance</option>
          <option value="mobile">Mobile Payment</option>
        </select>

        {bill.paymentMethod === 'insurance' && (
          <>
            <input type="text" name="insuranceProvider" value={bill.insuranceProvider} onChange={handleChange} placeholder="Insurance Provider" className="input" />
            <input type="text" name="insuranceNumber" value={bill.insuranceNumber} onChange={handleChange} placeholder="Insurance Number" className="input" />
          </>
        )}

        <div className="col-span-1 md:col-span-2 flex gap-4">
          <button type="submit" className="btn">Create Bill</button>
          {bill.paymentMethod === 'insurance' && (
            <button type="button" className="btn bg-blue-500" onClick={handleClaimSubmit}>Submit Insurance Claim</button>
          )}
        </div>
      </form>

      {/* Insurance Claims Panel */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Insurance Claims Panel</h3>
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Provider</th>
              <th className="p-2 border">Patient</th>
              <th className="p-2 border">Number</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim, idx) => (
              <tr key={idx} className="text-center">
                <td className="p-2 border">{claim.insuranceProvider}</td>
                <td className="p-2 border">{claim.patientName}</td>
                <td className="p-2 border">{claim.insuranceNumber}</td>
                <td className="p-2 border">{claim.amount}</td>
                <td className="p-2 border">{claim.status}</td>
                <td className="p-2 border">{claim.date}</td>
              </tr>
            ))}
            {claims.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 p-2">No insurance claims submitted yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
