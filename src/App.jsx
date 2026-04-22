import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import AOS from 'aos';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';

import CustomerDashboard from './pages/customer/Dashboard';
import CustomerOrders from './pages/customer/Orders';
import CustomerProfile from './pages/customer/Profile';

import VendorDashboard from './pages/vendor/Dashboard';
import VendorProducts from './pages/vendor/Products';
import VendorOrders from './pages/vendor/Orders';

import AdminDashboard from './pages/admin/Dashboard';
import AdminVendors from './pages/admin/Vendors';
import AdminUsers from './pages/admin/Users';
import AdminOrders from './pages/admin/Orders';
import AdminCategories from './pages/admin/Categories';

function App() {
  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2500} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/customer/dashboard" element={<PrivateRoute role="customer"><CustomerDashboard /></PrivateRoute>} />
        <Route path="/customer/orders" element={<PrivateRoute role="customer"><CustomerOrders /></PrivateRoute>} />
        <Route path="/customer/profile" element={<PrivateRoute role="customer"><CustomerProfile /></PrivateRoute>} />

        <Route path="/vendor/dashboard" element={<PrivateRoute role="vendor"><VendorDashboard /></PrivateRoute>} />
        <Route path="/vendor/products" element={<PrivateRoute role="vendor"><VendorProducts /></PrivateRoute>} />
        <Route path="/vendor/orders" element={<PrivateRoute role="vendor"><VendorOrders /></PrivateRoute>} />

        <Route path="/admin/dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/vendors" element={<PrivateRoute role="admin"><AdminVendors /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute role="admin"><AdminUsers /></PrivateRoute>} />
        <Route path="/admin/orders" element={<PrivateRoute role="admin"><AdminOrders /></PrivateRoute>} />
        <Route path="/admin/categories" element={<PrivateRoute role="admin"><AdminCategories /></PrivateRoute>} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;