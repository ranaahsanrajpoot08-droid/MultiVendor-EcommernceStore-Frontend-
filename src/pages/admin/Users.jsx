import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => { api.get('/admin/users').then(r => setUsers(r.data)); }, []);

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <aside className="col-md-3 sidebar">
          <h5 className="fw-bold mb-3">Admin Panel</h5>
          <Link to="/admin/dashboard">📊 Dashboard</Link>
          <Link to="/admin/vendors">🏪 Vendors</Link>
          <Link to="/admin/users" className="active">👥 Users</Link>
          <Link to="/admin/orders">📦 Orders</Link>
          <Link to="/admin/categories">🏷️ Categories</Link>
        </aside>
        <main className="col-md-9">
          <h2 className="fw-bold mb-4">All Users</h2>
          <div className="dashboard-card">
            <table className="table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className={`badge bg-${u.role==='admin'?'danger':u.role==='vendor'?'warning':'info'}`}>{u.role}</span></td>
                    <td>{new Date(u.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}