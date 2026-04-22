import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const nav = useNavigate();

  const handleLogout = async () => { await logout(); nav('/'); };

  const dashLink = user?.role === 'admin' ? '/admin/dashboard' : user?.role === 'vendor' ? '/vendor/dashboard' : '/customer/dashboard';

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold" style={{fontSize:'1.5rem'}}>
          <i className="bi bi-bag-heart-fill text-primary me-2"></i>
          ShopHub
        </Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto ms-4">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/products" className="nav-link">Shop</Link></li>
          </ul>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item me-3 position-relative">
              <Link to="/cart" className="nav-link">
                <i className="bi bi-cart3" style={{fontSize:'1.3rem'}}></i>
                {cart.length > 0 && <span className="badge-custom">{cart.length}</span>}
              </Link>
            </li>
            {user ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  <i className="bi bi-person-circle me-1"></i> {user.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link to={dashLink} className="dropdown-item"><i className="bi bi-speedometer2 me-2"></i>Dashboard</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                <li className="nav-item"><Link to="/register" className="btn btn-primary ms-2">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}