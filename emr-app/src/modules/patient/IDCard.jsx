import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const IDCard = forwardRef(({ patient }, ref) => {
  const cardRef = useRef(null);

  useImperativeHandle(ref, () => cardRef.current);

  if (!patient) return null;

  return (
    <div
      ref={cardRef}
      className="w-[320px] h-auto border rounded-md p-4 bg-white text-xs shadow-md flex flex-col justify-between"
    >
      <div className="mb-2">
        <h2 className="text-center text-base font-semibold mb-2">Jachie Health Centre </h2>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>DOB:</strong> {new Date(patient.dob).toLocaleDateString()}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Unique ID:</strong> {patient.uniqueId}</p>
      </div>

      <div className="flex justify-center mt-2">
        <QRCodeSVG
  value={
    `Name: ${patient.name}\n` +
    `DOB: ${patient.dob}\n` +
    `Gender: ${patient.gender}\n` +
    `Phone: ${patient.phone}\n` +
    `Unique ID: ${patient.uniqueId}`
  }
  size={100}
  level="H"
  includeMargin
/>

      </div>
    </div>
  );
});

export default IDCard;
