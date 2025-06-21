const API_BASE = '/api';

// Generic response handler
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error || 'An error occurred');
  }
  return res.json();
};

// Add new patient
export const addPatient = async (patient) => {
  const res = await fetch(`${API_BASE}/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient),
  });
  return handleResponse(res);
};

// Fetch all patients
export const getAllPatients = async () => {
  const res = await fetch(`${API_BASE}/patients`);
  return handleResponse(res);
};

// Update existing patient
export const updatePatient = async (patient) => {
  if (!patient._id) throw new Error('Patient ID is required for update.');
  const res = await fetch(`${API_BASE}/patients/${patient._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient),
  });
  return handleResponse(res);
};

// Delete a patient
export const deletePatient = async (patientId) => {
  if (!patientId) throw new Error('Patient ID is required for deletion.');
  const res = await fetch(`${API_BASE}/patients/${patientId}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
};
