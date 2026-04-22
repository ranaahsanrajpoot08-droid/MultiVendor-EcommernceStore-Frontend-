export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 ">
            <h5><i className="bi bi-bag-heart-fill text-primary me-2"></i>ShopHub</h5>
            <p className="text-white">Your one-stop multi-vendor marketplace for quality products.</p>
          </div>
          <div className="col-md-4 mb-4 text-white">
            <h6>Quick Links</h6>
            <a href="/" className="text-white d-block text-decoration-none">Home</a>
            <a href="/products" className="text-white d-block text-decoration-none">Shop</a>
            <a href="/register" className="text-white d-block text-decoration-none">Become Vendor</a>
          </div>
          <div className="col-md-4 mb-4">
            <h6>Contact</h6>
            <p className="text-white mb-1"><i className="bi bi-envelope me-2"></i>support@shophub.com</p>
            <p className="text-white"><i className="bi bi-telephone me-2"></i>+1 234 567 890</p>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center text-white mb-0">&copy; 2025 ShopHub. All rights reserved.</p>
      </div>
    </footer>
  );
}