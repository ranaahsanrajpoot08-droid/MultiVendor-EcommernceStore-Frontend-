import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { toast } from 'react-toastify';

export default function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const load = () => api.get('/admin/vendors').then(r => setVendors(r.data));
  useEffect(() => { load(); }, []);

  const approve = async (id) => { await api.post(`/admin/vendors/${id}/approve`); toast.success('Approved'); load(); };
  const reject = async (id) => { await api.post(`/admin/vendors/${id}/reject`); toast.info('Rejected'); load(); };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <aside className="col-md-3 sidebar">
          <h5 className="fw-bold mb-3">Admin Panel</h5>
          <Link to="/admin/dashboard">📊 Dashboard</Link>
          <Link to="/admin/vendors" className="active">🏪 Vendors</Link>
          <Link to="/admin/users">👥 Users</Link>
          <Link to="/admin/orders">📦 Orders</Link>
          <Link to="/admin/categories">🏷️ Categories</Link>
        </aside>
        <main className="col-md-9">
          <h2 className="fw-bold mb-4">Manage Vendors</h2>
          <div className="dashboard-card">
            <table className="table">
              <thead><tr><th>Shop Name</th><th>Owner</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {vendors.map(v => (
                  <tr key={v.id}>
                    <td>{v.shop_name}</td>
                    <td>{v.user?.name}</td>
                    <td>{v.user?.email}</td>
                    <td><span className={`badge bg-${v.status==='approved'?'success':v.status==='pending'?'warning':'danger'}`}>{v.status}</span></td>
                    <td>
                      {v.status !== 'approved' && <button className="btn btn-sm btn-success me-2" onClick={() => approve(v.id)}>Approve</button>}
                      {v.status !== 'rejected' && <button className="btn btn-sm btn-danger" onClick={() => reject(v.id)}>Reject</button>}
                    </td>
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