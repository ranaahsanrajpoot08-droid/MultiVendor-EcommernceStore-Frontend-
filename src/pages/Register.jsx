import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'', password_confirmation:'', role:'customer', shop_name:'', description:'' });
  const { register } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      toast.success('Registered successfully!');
      nav(form.role === 'vendor' ? '/vendor/dashboard' : '/');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="dashboard-card" data-aos="fade-up">
            <h2 className="fw-bold text-center mb-4">Create Account</h2>
            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">Register As</label>
                <select className="form-select" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                  <option value="customer">Customer</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input required className="form-control" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              {form.role === 'vendor' && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Shop Name</label>
                    <input required className="form-control" value={form.shop_name} onChange={e => setForm({...form, shop_name: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Shop Description</label>
                    <textarea className="form-control" value={form.description} onChange={e => setForm({...form, description: e.target.value})}></textarea>
                  </div>
                </>
              )}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" required className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" required className="form-control" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input type="password" required className="form-control" value={form.password_confirmation} onChange={e => setForm({...form, password_confirmation: e.target.value})} />
              </div>
              <button className="btn btn-primary w-100">Register</button>
            </form>
            <p className="text-center mt-3">Have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}