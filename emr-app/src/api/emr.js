// src/api/emr.js (or split by modules like users.js, patients.js)
export const getData = async () => {
  const response = await fetch('/api/emr');
  if (!response.ok) throw new Error('Failed to fetch EMR data');
  return await response.json();
};

export const postData = async (data) => {
  const response = await fetch('/api/emr', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to post EMR data');
  return await response.json();
};
