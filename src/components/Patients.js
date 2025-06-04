import React, { useState } from 'react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const Patient = ({ patient, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState({ ...patient });

  const handleSave = () => {
    onUpdate(editedPatient);
    setIsEditing(false);
  };

  return (
    <tr>
      <td className="border px-2 py-1">
        {isEditing ? (
          <input
            type="text"
            value={editedPatient.name}
            onChange={(e) =>
              setEditedPatient({ ...editedPatient, name: e.target.value })
            }
            className="border px-1"
          />
        ) : (
          patient.name
        )}
      </td>
      <td className="border px-2 py-1">
        {isEditing ? (
          <input
            type="number"
            value={editedPatient.age}
            onChange={(e) =>
              setEditedPatient({ ...editedPatient, age: e.target.value })
            }
            className="border px-1"
          />
        ) : (
          patient.age
        )}
      </td>
      <td className="border px-2 py-1">
        {isEditing ? (
          <input
            type="text"
            value={editedPatient.condition}
            onChange={(e) =>
              setEditedPatient({ ...editedPatient, condition: e.target.value })
            }
            className="border px-1"
          />
        ) : (
          patient.condition
        )}
      </td>
      <td className="border px-2 py-1 flex gap-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaSave />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-yellow-500 hover:text-yellow-700"
          >
            <FaEdit />
          </button>
        )}
        <button
          onClick={() => onDelete(patient._id, patient._rev)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default Patient;
