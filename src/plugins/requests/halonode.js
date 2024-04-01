import axios from 'axios';

const http = axios.create({
  baseURL: 'https://router.permaswap.network/halo',
  timeout: 5000
});

// request interceptor
http.interceptors.request.use(
  config => {
    //config.headers.Authorization = 'Bearer token';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response Interceptor
http.interceptors.response.use(
  response => {
    // Processing the response
    return response.data;
  },
  error => {
    // Handling of errors
    return Promise.reject(error);
  }
);

// Encapsulating get requests
export const getChain = (params) => {
  return http.get('/info', { params });
};

// Encapsulating POST requests
export const transfer = (data) => {
  return http.post('/submit', data);
};

export const stakePost = (data) => {
  return http.post('/')
}

export const getuserToken = (params) => {
  return http.get('/token')
}
