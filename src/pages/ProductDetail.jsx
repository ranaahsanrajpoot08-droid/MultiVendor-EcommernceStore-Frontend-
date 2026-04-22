import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => { api.get(`/products/${id}`).then(r => setProduct(r.data)); }, [id]);

  if (!product) return <div className="loader"></div>;

  const price = product.discount_price || product.price;
  const img = product.image?.startsWith('http') ? product.image : `http://localhost:8000/storage/${product.image}`;

  const handleAdd = async () => {
    if (!user) { nav('/login'); return; }
    await addToCart(product.id, qty);
    toast.success('Added to cart!');
  };

  return (
    <div className="container py-5 fade-in">
      <div className="row g-5">
        <div className="col-md-6">
          <div className="dashboard-card p-3"><img src={img} alt={product.name} className="img-fluid rounded" /></div>
        </div>
        <div className="col-md-6">
          <span className="badge bg-primary mb-2">{product.category?.name}</span>
          <h1 className="fw-bold">{product.name}</h1>
          <p className="text-muted"><i className="bi bi-shop me-2"></i>Sold by <strong>{product.vendor?.shop_name}</strong></p>
          <div className="my-3">
            <span className="fw-bold text-primary display-5">${price}</span>
            {product.discount_price && <span className="text-muted ms-3 text-decoration-line-through fs-4">${product.price}</span>}
          </div>
          <p className="text-muted">{product.description}</p>
          <p><i className="bi bi-box me-2"></i>In Stock: <strong>{product.stock}</strong></p>
          <div className="d-flex align-items-center gap-3 my-4">
            <label>Quantity:</label>
            <div className="input-group" style={{width:'150px'}}>
              <button className="btn btn-outline-secondary" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <input type="number" className="form-control text-center" value={qty} onChange={e => setQty(parseInt(e.target.value) || 1)} />
              <button className="btn btn-outline-secondary" onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>
          <button className="btn btn-primary btn-lg px-5" onClick={handleAdd}><i className="bi bi-cart-plus me-2"></i>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}