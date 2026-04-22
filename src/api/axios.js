import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Accept': 'application/json' },
});

axios.get("http://127.0.0.1:8000/api/products")
  .then(res => console.log(res.data))


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// axios.post("http://127.0.0.1:8000/api/cart", {
//   product_id: product.id,
//   quantity: 1
// }, {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`
//   }
// })
// .then(res => console.log(res.data))
// .catch(err => {
//   console.log(err.response); // 👈 yahan actual error milega
// });

export default api;