import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function Cart() {
  const { cart, updateCart, removeFromCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-cart-x" style={{fontSize:'5rem', color:'#cbd5e1'}}></i>
        <h3 className="mt-3">Your cart is empty</h3>
        <Link to="/products" className="btn btn-primary mt-3">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Shopping Cart</h2>
      <div className="row g-4">
        <div className="col-lg-8">
          {cart.map(item => {
            const img = item.product.image?.startsWith('http') ? item.product.image : `http://localhost:8000/storage/${item.product.image}`;
            const price = item.product.discount_price || item.product.price;
            return (
              <div key={item.id} className="dashboard-card mb-3">
                <div className="d-flex align-items-center gap-3">
                  <img src={img} style={{width:'100px', height:'100px', objectFit:'cover', borderRadius:'10px'}} />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.product.name}</h6>
                    <small className="text-muted">{item.product.vendor?.shop_name}</small>
                    <p className="text-primary fw-bold mb-0">${price}</p>
                  </div>
                  <div className="input-group" style={{width:'120px'}}>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => item.quantity > 1 && updateCart(item.id, item.quantity - 1)}>-</button>
                    <input className="form-control form-control-sm text-center" value={item.quantity} readOnly />
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => updateCart(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => { removeFromCart(item.id); toast.info('Removed'); }}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-lg-4">
          <div className="dashboard-card">
            <h5 className="fw-bold">Order Summary</h5>
            <div className="d-flex justify-content-between mt-3"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="d-flex justify-content-between"><span>Shipping</span><span>Free</span></div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5"><span>Total</span><span className="text-primary">${total.toFixed(2)}</span></div>
            <Link to="/checkout" className="btn btn-primary w-100 mt-3">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}