import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { api.get('/admin/orders').then(r => setOrders(r.data)); }, []);

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <aside className="col-md-3 sidebar">
          <h5 className="fw-bold mb-3">Admin Panel</h5>
          <Link to="/admin/dashboard">📊 Dashboard</Link>
          <Link to="/admin/vendors">🏪 Vendors</Link>
          <Link to="/admin/users">👥 Users</Link>
          <Link to="/admin/orders" className="active">📦 Orders</Link>
          <Link to="/admin/categories">🏷️ Categories</Link>
        </aside>
        <main className="col-md-9">
          <h2 className="fw-bold mb-4">All Orders</h2>
          <div className="dashboard-card">
            <table className="table">
              <thead><tr><th>Order #</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td>{o.order_number}</td>
                    <td>{o.user?.name}</td>
                    <td>{o.items?.length}</td>
                    <td>${o.total}</td>
                    <td><span className="badge bg-info">{o.status}</span></td>
                    <td>{new Date(o.created_at).toLocaleDateString()}</td>
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