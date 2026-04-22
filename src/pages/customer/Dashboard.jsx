import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function CustomerDashboard() {
  const { user } = useAuth();
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <aside className="col-md-3 sidebar">
          <h5 className="fw-bold mb-3">Customer Panel</h5>
          <Link to="/customer/dashboard" className="active">📊 Dashboard</Link>
          <Link to="/customer/orders">📦 My Orders</Link>
          <Link to="/customer/profile">👤 Profile</Link>
        </aside>
        <main className="col-md-9">
          <h2 className="fw-bold">Welcome, {user.name}!</h2>
          <div className="row g-4 mt-3">
            <div className="col-md-4"><div className="stat-card"><h6>Total Orders</h6><h2>—</h2></div></div>
            <div className="col-md-4"><div className="stat-card" style={{background:'linear-gradient(135deg,#f43f5e,#be123c)'}}><h6>Wishlist</h6><h2>0</h2></div></div>
            <div className="col-md-4"><div className="stat-card" style={{background:'linear-gradient(135deg,#10b981,#047857)'}}><h6>Reviews</h6><h2>0</h2></div></div>
          </div>
        </main>
      </div>
    </div>
  );
}