import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { api.get('/my-orders').then(r => setOrders(r.data)); }, []);

  const statusColor = {pending:'warning', processing:'info', shipped:'primary', delivered:'success', cancelled:'danger'};

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <aside className="col-md-3 sidebar">
          <h5 className="fw-bold mb-3">Customer Panel</h5>
          <Link to="/customer/dashboard">📊 Dashboard</Link>
          <Link to="/customer/orders" className="active">📦 My Orders</Link>
          <Link to="/customer/profile">👤 Profile</Link>
        </aside>
        <main className="col-md-9">
          <h2 className="fw-bold mb-4">My Orders</h2>
          {orders.map(o => (
            <div key={o.id} className="dashboard-card mb-3">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="fw-bold">{o.order_number}</h6>
                  <small className="text-muted">{new Date(o.created_at).toLocaleDateString()}</small>
                </div>
                <div className="text-end">
                  <span className={`badge bg-${statusColor[o.status]} mb-2`}>{o.status}</span>
                  <h5 className="text-primary">${o.total}</h5>
                </div>
              </div>
              <hr />
              {o.items.map(i => (
                <div key={i.id} className="d-flex justify-content-between py-2">
                  <span>{i.product?.name} × {i.quantity}</span>
                  <span>${(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          ))}
          {orders.length === 0 && <p>No orders yet.</p>}
        </main>
      </div>
    </div>
  );
}