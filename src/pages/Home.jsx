import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/products/featured').then(r => setProducts(r.data));
    api.get('/categories').then(r => setCategories(r.data));
  }, []);

  return (
    <>
      <section className="hero text-center">
        <div className="container" data-aos="fade-up">
          <h1 className="display-3 fw-bold mb-3">Shop Smarter, Live Better</h1>
          <p className="lead mb-4">Discover millions of products from verified vendors worldwide</p>
          <Link to="/products" className="btn btn-light btn-lg px-5 py-3 fw-bold rounded-pill">
            Start Shopping <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="text-center mb-5 fw-bold" data-aos="fade-up">Shop by Category</h2>
        <div className="row g-3">
          {categories.map((c, i) => (
            <div key={c.id} className="col-6 col-md-4 col-lg-2" data-aos="zoom-in" data-aos-delay={i * 50}>
              <Link to={`/products?category=${c.id}`} className="text-decoration-none">
                <div className="category-card">
                  <i className={`bi ${c.icon || 'bi-tag'}`}></i>
                  <h6 className="mt-2 mb-0 text-dark">{c.name}</h6>
                  <small className="text-muted">{c.products_count} items</small>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-5">
        <h2 className="text-center mb-5 fw-bold" data-aos="fade-up">Featured Products</h2>
        <div className="row g-4">
          {products.map(p => (
            <div key={p.id} className="col-6 col-md-4 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <div className="row text-center g-4">
            {[
              {i: 'bi-truck', t: 'Free Shipping', d: 'On orders over $50'},
              {i: 'bi-shield-check', t: 'Secure Payment', d: '100% safe checkout'},
              {i: 'bi-arrow-repeat', t: 'Easy Returns', d: '30-day money back'},
              {i: 'bi-headset', t: '24/7 Support', d: 'Dedicated support'},
            ].map((f, i) => (
              <div key={i} className="col-md-3" data-aos="fade-up" data-aos-delay={i * 100}>
                <i className={`bi ${f.i} text-primary`} style={{fontSize: '3rem'}}></i>
                <h5 className="mt-3">{f.t}</h5>
                <p className="text-muted">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}