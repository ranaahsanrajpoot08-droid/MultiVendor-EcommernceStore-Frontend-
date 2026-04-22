import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { toast } from 'react-toastify';

export default function VendorOrders() {
  const [items, setItems] = useState([]);
  const load = () => api.get('/vendor/orders').then(r => setItems(r.data));
  useEffect(() => { load(); }, []);

  const update = async (id, status) => {
    await api.put(`/vendor/orders/${id}/status`, { status });
    toast.success('Updated'); load();
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <aside className="col-md-3 sidebar">
          <h5 className="fw-bold mb-3">Vendor Panel</h5>
          <Link to="/vendor/dashboard">📊 Dashboard</Link>
          <Link to="/vendor/products">🛍 Products</Link>
          <Link to="/vendor/orders" className="active">📦 Orders</Link>
        </aside>
        <main className="col-md-9">
          <h2 className="fw-bold mb-4">Orders</h2>
          <div className="dashboard-card">
            <table className="table">
              <thead><tr><th>Order #</th><th>Customer</th><th>Product</th><th>Qty</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {items.map(i => (
                  <tr key={i.id}>
                    <td>{i.order?.order_number}</td>
                    <td>{i.order?.user?.name}</td>
                    <td>{i.product?.name}</td>
                    <td>{i.quantity}</td>
                    <td>${(i.price * i.quantity).toFixed(2)}</td>
                    <td>
                      <select className="form-select form-select-sm" value={i.status} onChange={e => update(i.id, e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
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