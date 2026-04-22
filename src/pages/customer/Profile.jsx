import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function CustomerProfile() {
  const { user } = useAuth();
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <aside className="col-md-3 sidebar">
          <h5 className="fw-bold mb-3">Customer Panel</h5>
          <Link to="/customer/dashboard">📊 Dashboard</Link>
          <Link to="/customer/orders">📦 My Orders</Link>
          <Link to="/customer/profile" className="active">👤 Profile</Link>
        </aside>
        <main className="col-md-9">
          <h2 className="fw-bold mb-4">My Profile</h2>
          <div className="dashboard-card">
            <div className="mb-3"><label className="form-label fw-semibold">Name</label><input className="form-control" defaultValue={user.name} /></div>
            <div className="mb-3"><label className="form-label fw-semibold">Email</label><input className="form-control" defaultValue={user.email} disabled /></div>
            <div className="mb-3"><label className="form-label fw-semibold">Phone</label><input className="form-control" defaultValue={user.phone || ''} /></div>
            <div className="mb-3"><label className="form-label fw-semibold">Address</label><textarea className="form-control" defaultValue={user.address || ''}></textarea></div>
            <button className="btn btn-primary">Update Profile</button>
          </div>
        </main>
      </div>
    </div>
  );
}