import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Accept': 'application/json' },
});

axios.get(`${import.meta.env.VITE_API_URL}/products`)
  .then(res => console.log(res.data))


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
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