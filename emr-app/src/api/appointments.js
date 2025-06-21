const API_BASE = '/api';

// Fetch all appointments
export const getAppointments = async () => {
  const response = await fetch(`${API_BASE}/appointments`);
  if (!response.ok) throw new Error('Failed to fetch appointments');
  return response.json();
};

// Create a new appointment
export const createAppointment = async (appointmentData) => {
  const response = await fetch(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointmentData),
  });
  if (!response.ok) throw new Error('Failed to create appointment');
  return response.json();
};

// Add other appointment API calls here as needed
