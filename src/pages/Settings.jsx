// src/pages/Settings.jsx
import React, { useState } from 'react';

const Settings = () => {
  const [facilityName, setFacilityName] = useState('EMR Facility');
  const [autoSync, setAutoSync] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('weekly');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved successfully (not persisted yet)');
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">System Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Facility Name</label>
          <input
            type="text"
            value={facilityName}
            onChange={(e) => setFacilityName(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Automatic Sync</label>
          <select
            value={autoSync ? 'yes' : 'no'}
            onChange={(e) => setAutoSync(e.target.value === 'yes')}
            className="input"
          >
            <option value="yes">Enabled</option>
            <option value="no">Disabled</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Backup Frequency</label>
          <select
            value={backupFrequency}
            onChange={(e) => setBackupFrequency(e.target.value)}
            className="input"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Notifications</label>
          <select
            value={notificationEnabled ? 'yes' : 'no'}
            onChange={(e) => setNotificationEnabled(e.target.value === 'yes')}
            className="input"
          >
            <option value="yes">Enabled</option>
            <option value="no">Disabled</option>
          </select>
        </div>

        <button type="submit" className="btn">Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;
