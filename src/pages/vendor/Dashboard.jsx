import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

export default function VendorDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ products: 0, orders: 0 });

  useEffect(() => {
    Promise.all([api.get('/vendor/products'), api.get('/vendor/orders')]).then(([p, o]) => {
      setStats({ products: p.data.length, orders: o.data.length });
    });
  }, []);

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <aside className="col-md-3 sidebar">
          <h5 className="fw-bold mb-3">Vendor Panel</h5>
          <Link to="/vendor/dashboard" className="active">📊 Dashboard</Link>
          <Link to="/vendor/products">🛍 Products</Link>
          <Link to="/vendor/orders">📦 Orders</Link>
        </aside>
        <main className="col-md-9">
          <h2 className="fw-bold">Vendor: {user.vendor?.shop_name}</h2>
          {user.vendor?.status !== 'approved' && (
            <div className="alert alert-warning mt-3">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Your vendor account is <strong>{user.vendor?.status}</strong>. You cannot add products until approved.
            </div>
          )}
          <div className="row g-4 mt-3">
            <div className="col-md-6"><div className="stat-card"><h6>Total Products</h6><h2>{stats.products}</h2></div></div>
            <div className="col-md-6"><div className="stat-card" style={{background:'linear-gradient(135deg,#f43f5e,#be123c)'}}><h6>Total Orders</h6><h2>{stats.orders}</h2></div></div>
          </div>
        </main>
      </div>
    </div>
  );
}