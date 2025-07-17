import React, { useState } from 'react';
function SuspenseForm({ onCreate }) {
  const [form, setForm] = useState({ title: '', customer: '', dueDate: '', notes: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onCreate({ ...form, id: Date.now(), status: 'open' });
    setForm({ title: '', customer: '', dueDate: '', notes: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mt-4 shadow-sm">
      <h6 className="fw-bold mb-3">Create New Suspense</h6>
      <input className="form-control mb-2" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input className="form-control mb-2" name="customer" value={form.customer} onChange={handleChange} placeholder="Customer" required />
      <input className="form-control mb-2" type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required />
      <textarea className="form-control mb-2" name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" rows="3" />
      <button type="submit" className="btn btn-primary">Create Suspense</button>
    </form>
  );
}
export default SuspenseForm;