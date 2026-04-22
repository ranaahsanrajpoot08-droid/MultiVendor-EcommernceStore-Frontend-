import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

export default function Checkout() {
  const { cart, total, fetchCart } = useCart();
  const nav = useNavigate();
  const [form, setForm] = useState({ shipping_address: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/checkout', form);
      toast.success('Order placed successfully!');
      fetchCart();
      nav('/customer/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
    setLoading(false);
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Checkout</h2>
      <form onSubmit={submit} className="row g-4">
        <div className="col-lg-7">
          <div className="dashboard-card">
            <h5 className="fw-bold mb-3">Shipping Info</h5>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea required className="form-control" rows="3" value={form.shipping_address} onChange={e => setForm({...form, shipping_address: e.target.value})}></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input required className="form-control" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            </div>
            <h5 className="fw-bold mt-4 mb-3">Payment Method</h5>
            <div className="border rounded p-3">
              <i className="bi bi-cash-stack text-success me-2"></i><strong>Cash on Delivery (COD)</strong>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="dashboard-card">
            <h5 className="fw-bold">Order Summary</h5>
            {cart.map(c => (
              <div key={c.id} className="d-flex justify-content-between py-2 border-bottom">
                <span>{c.product.name} × {c.quantity}</span>
                <span>${((c.product.discount_price || c.product.price) * c.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="d-flex justify-content-between fw-bold fs-5 mt-3">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary w-100 mt-3">
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}