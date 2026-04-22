import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form.email, form.password);
      toast.success('Welcome back!');
      nav(user.role === 'admin' ? '/admin/dashboard' : user.role === 'vendor' ? '/vendor/dashboard' : '/');
    } catch { toast.error('Invalid credentials'); }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="dashboard-card" data-aos="fade-up">
            <h2 className="fw-bold text-center mb-4">Welcome Back</h2>
            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" required className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" required className="form-control" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
              </div>
              <button className="btn btn-primary w-100">Login</button>
            </form>
            <p className="text-center mt-3">No account? <Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}