import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!user) { nav('/login'); return; }
    try {
      await addToCart(product.id);
      toast.success('Added to cart!');
    } catch { toast.error('Failed'); }
  };

  const price = product.discount_price || product.price;

  return (
    <div className="product-card h-100" data-aos="fade-up">
      <Link to={`/products/${product.id}`}>
        <div style={{overflow: 'hidden'}}>
          <img src={product.image?.startsWith('http') ? product.image : `http://localhost:8000/storage/${product.image}`} alt={product.name} className="w-100" />
        </div>
      </Link>
      <div className="p-3">
        <small className="text-muted">{product.category?.name}</small>
        <h6 className="mt-1">
          <Link to={`/products/${product.id}`} className="text-dark text-decoration-none">{product.name}</Link>
        </h6>
        <div className="d-flex align-items-center mb-2">
          <span className="fw-bold text-primary fs-5">${price}</span>
          {product.discount_price && <small className="text-muted ms-2 text-decoration-line-through">${product.price}</small>}
        </div>
        <small className="text-muted d-block mb-2"><i className="bi bi-shop me-1"></i>{product.vendor?.shop_name}</small>
        <button onClick={handleAdd} className="btn btn-primary btn-sm w-100">
          <i className="bi bi-cart-plus me-1"></i>Add to Cart
        </button>
      </div>
    </div>
  );
}