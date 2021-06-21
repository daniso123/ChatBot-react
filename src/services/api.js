import { create } from 'axios';

const api = create({
  baseURL: 'https://60cfc6c44a030f0017f68004.mockapi.io/api/v1/',
});

export default api;