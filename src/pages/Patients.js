// src/pages/Patients.js
import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';
import patientDB from '../db/patients';

const PAGE_SIZE = 5;
const empty = { _id: '', name: '', age: '', phone: '' };

export default function Patients() {
  /* ─────────── STATE ─────────── */
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  /* ─────────── LOAD + LIVE CHANGES ─────────── */
  useEffect(() => {
    const load = async () => {
      const { rows } = await patientDB.allDocs({ include_docs: true });
      const docs = rows.map((r) => r.doc);
      setPatients(docs);
    };
    load();

    const listener = patientDB
      .changes({ since: 'now', live: true, include_docs: true })
      .on('change', load);
    return () => listener.cancel();
  }, []);

  /* ─────────── SEARCH & PAGINATION ─────────── */
  useEffect(() => {
    const term = search.toLowerCase();
    const list = patients.filter((p) =>
      p.name.toLowerCase().includes(term)
    );
    setFiltered(list);
    setPage(1); // reset page on new search
  }, [search, patients]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const view = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* ─────────── CRUD ─────────── */
  const openAdd = () => {
    setForm({ ...empty, _id: `patient:${Date.now()}` });
    setEditing(false);
    setShowForm(true);
  };

  const openEdit = (p) => {
    setForm(p);
    setEditing(true);
    setShowForm(true);
  };

  const savePatient = async () => {
    if (!form.name || !form.age) return;
    await patientDB.put(form);
    setShowForm(false);
  };

  const deletePatient = async (p) => {
    if (window.confirm(`Delete ${p.name}?`)) {
      await patientDB.remove(p);
    }
  };

  /* ─────────── UI ─────────── */
  return (
    <div className="space-y-6 p-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Patients</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded"
        >
          <FaPlus /> New
        </button>
      </div>

      {/* search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name…"
        className="border p-2 rounded w-full md:w-1/3"
      />

      {/* table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Age</th>
              <th className="p-2">Phone</th>
              <th className="p-2 w-28 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {view.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.age}</td>
                <td className="p-2">{p.phone}</td>
                <td className="p-2 flex gap-3 justify-center">
                  <button
                    onClick={() => openEdit(p)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deletePatient(p)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {view.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No patients
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md p-6 rounded space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {editing ? 'Edit Patient' : 'Add Patient'}
            </h2>

            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
              className="border p-2 w-full rounded"
            />
            <input
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              placeholder="Age"
              className="border p-2 w-full rounded"
            />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
              className="border p-2 w-full rounded"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center gap-1 border px-3 py-1 rounded"
              >
                <FaTimes /> Cancel
              </button>
              <button
                onClick={savePatient}
                className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded"
              >
                <FaSave /> {editing ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
