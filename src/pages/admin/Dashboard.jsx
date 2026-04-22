import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  useEffect(() => { api.get('/admin/stats').then(r => setStats(r.data)); }, []);

  const cards = [
    {label: 'Users', value: stats.users, icon: 'bi-people', color: '#6366f1'},
    {label: 'Vendors', value: stats.vendors, icon: 'bi-shop', color: '#f43f5e'},
    {label: 'Pending', value: stats.pending_vendors, icon: 'bi-hourglass', color: '#f59e0b'},
    {label: 'Orders', value: stats.orders, icon: 'bi-cart', color: '#10b981'},
    {label: 'Products', value: stats.products, icon: 'bi-box', color: '#8b5cf6'},
  ];

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <aside className="col-md-3 sidebar">
          <h5 className="fw-bold mb-3">Admin Panel</h5>
          <Link to="/admin/dashboard" className="active">📊 Dashboard</Link>
          <Link to="/admin/vendors">🏪 Vendors</Link>
          <Link to="/admin/users">👥 Users</Link>
          <Link to="/admin/orders">📦 Orders</Link>
          <Link to="/admin/categories">🏷️ Categories</Link>
        </aside>
        <main className="col-md-9">
          <h2 className="fw-bold mb-4">Admin Dashboard</h2>
          <div className="row g-3">
            {cards.map((c, i) => (
              <div key={i} className="col-md-4" data-aos="zoom-in" data-aos-delay={i*80}>
                <div className="stat-card" style={{background: `linear-gradient(135deg, ${c.color}, ${c.color}dd)`}}>
                  <i className={`bi ${c.icon}`} style={{fontSize:'2rem'}}></i>
                  <h6 className="mt-2">{c.label}</h6>
                  <h2>{c.value ?? '—'}</h2>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}