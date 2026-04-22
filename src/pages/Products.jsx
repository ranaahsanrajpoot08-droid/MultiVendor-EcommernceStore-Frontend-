import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("search") || "");
  const [category, setCategory] = useState(params.get("category") || "");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await api.get("/products", {
      params: {
        search,
        category,
        sort,
        min_price: minPrice,
        max_price: maxPrice,
      },
    });
    setProducts(data.data);
    setLoading(false);
  };

  useEffect(() => {
    api.get("/categories").then((r) => setCategories(r.data));
  }, []);
  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [search, category, sort, minPrice, maxPrice]);

  return (
    <div className="container py-5">
      <div className="row">
        <aside className="col-lg-3 mb-4">
          <div className="dashboard-card sticky-top" style={{ top: "90px" }}>
            <h5 className="fw-bold mb-3">Filters</h5>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <label className="form-label fw-semibold">Category</label>
            <select
              className="form-select mb-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <label className="form-label fw-semibold">Price</label>
            <div className="row g-2 mb-3">
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min"
                  min="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>

              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <label className="form-label fw-semibold">Sort By</label>
            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </aside>
        <main className="col-lg-9">
          <h3 className="fw-bold mb-4">All Products</h3>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <div className="row g-4">
              {products.length === 0 ? (
                <p>No products found.</p>
              ) : (
                products.map((p) => (
                  <div key={p.id} className="col-md-6 col-lg-4">
                    <ProductCard product={p} />
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
