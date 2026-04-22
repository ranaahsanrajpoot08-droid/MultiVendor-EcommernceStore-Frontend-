import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { toast } from 'react-toastify';

export default function AdminCategories() {
  const [cats, setCats] = useState([]);
  const [form, setForm] = useState({ name: '', icon: 'bi-tag' });
  const load = () => api.get('/categories').then(r => setCats(r.data));
  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await api.post('/admin/categories', form);
    toast.success('Added'); setForm({name:'', icon:'bi-tag'}); load();
  };

  const del = async (id) => {
    if (!confirm('Delete?')) return;
    await api.delete(`/admin/categories/${id}`);
    toast.info('Deleted'); load();
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <aside className="col-md-3 sidebar">
          <h5 className="fw-bold mb-3">Admin Panel</h5>
          <Link to="/admin/dashboard">📊 Dashboard</Link>
          <Link to="/admin/vendors">🏪 Vendors</Link>
          <Link to="/admin/users">👥 Users</Link>
          <Link to="/admin/orders">📦 Orders</Link>
          <Link to="/admin/categories" className="active">🏷️ Categories</Link>
        </aside>
        <main className="col-md-9">
          <h2 className="fw-bold mb-4">Categories</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="dashboard-card">
                <h5 className="fw-bold">Add Category</h5>
                <form onSubmit={add}>
                  <input required className="form-control mb-2" placeholder="Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
                  <input className="form-control mb-2" placeholder="Icon (bi-tag)" value={form.icon} onChange={e => setForm({...form, icon:e.target.value})} />
                  <button className="btn btn-primary w-100">Add</button>
                </form>
              </div>
            </div>
            <div className="col-md-8">
              <div className="dashboard-card">
                <table className="table">
                  <thead><tr><th>Icon</th><th>Name</th><th>Products</th><th>Actions</th></tr></thead>
                  <tbody>
                    {cats.map(c => (
                      <tr key={c.id}>
                        <td><i className={`bi ${c.icon}`}></i></td>
                        <td>{c.name}</td>
                        <td>{c.products_count}</td>
                        <td><button className="btn btn-sm btn-outline-danger" onClick={() => del(c.id)}><i className="bi bi-trash"></i></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}