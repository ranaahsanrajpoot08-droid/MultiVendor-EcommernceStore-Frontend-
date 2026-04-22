import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { toast } from 'react-toastify';

export default function VendorProducts() {
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name:'', category_id:'', description:'', price:'', discount_price:'', stock:'', image: null });

  const load = () => api.get('/vendor/products').then(r => setProducts(r.data));
  useEffect(() => { load(); api.get('/categories').then(r => setCats(r.data)); }, []);

  const openModal = (p = null) => {
    if (p) { setEditing(p); setForm({...p, image: null}); }
    else { setEditing(null); setForm({ name:'', category_id:'', description:'', price:'', discount_price:'', stock:'', image: null }); }
    setShowModal(true);
  };

  const save = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach(k => form[k] !== null && form[k] !== '' && fd.append(k, form[k]));
    try {
      if (editing) {
        fd.append('_method', 'PUT');
        await api.post(`/vendor/products/${editing.id}`, fd);
        toast.success('Updated');
      } else {
        await api.post('/vendor/products', fd);
        toast.success('Added');
      }
      setShowModal(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const del = async (id) => {
    if (!confirm('Delete?')) return;
    await api.delete(`/vendor/products/${id}`);
    toast.info('Deleted'); load();
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <aside className="col-md-3 sidebar">
          <h5 className="fw-bold mb-3">Vendor Panel</h5>
          <Link to="/vendor/dashboard">📊 Dashboard</Link>
          <Link to="/vendor/products" className="active">🛍 Products</Link>
          <Link to="/vendor/orders">📦 Orders</Link>
        </aside>
        <main className="col-md-9">
          <div className="d-flex justify-content-between mb-4">
            <h2 className="fw-bold">My Products</h2>
            <button className="btn btn-primary" onClick={() => openModal()}><i className="bi bi-plus-lg me-2"></i>Add Product</button>
          </div>
          <div className="dashboard-card">
            <table className="table">
              <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.category?.name}</td>
                    <td>${p.price}</td>
                    <td>{p.stock}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openModal(p)}><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => del(p.id)}><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{background:'rgba(0,0,0,0.5)'}} onClick={() => setShowModal(false)}>
          <div className="modal-dialog modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editing ? 'Edit' : 'Add'} Product</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={save}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6"><input required className="form-control" placeholder="Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} /></div>
                    <div className="col-md-6">
                      <select required className="form-select" value={form.category_id} onChange={e => setForm({...form, category_id:e.target.value})}>
                        <option value="">Select Category</option>
                        {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="col-md-4"><input required type="number" step="0.01" className="form-control" placeholder="Price" value={form.price} onChange={e => setForm({...form, price:e.target.value})} /></div>
                    <div className="col-md-4"><input type="number" step="0.01" className="form-control" placeholder="Discount Price" value={form.discount_price || ''} onChange={e => setForm({...form, discount_price:e.target.value})} /></div>
                    <div className="col-md-4"><input required type="number" className="form-control" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock:e.target.value})} /></div>
                    <div className="col-12"><textarea required className="form-control" rows="3" placeholder="Description" value={form.description} onChange={e => setForm({...form, description:e.target.value})}></textarea></div>
                    <div className="col-12"><input type="file" className="form-control" onChange={e => setForm({...form, image:e.target.files[0]})} /></div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}