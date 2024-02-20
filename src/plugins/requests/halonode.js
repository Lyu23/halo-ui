import axios from 'axios';

const http = axios.create({
  baseURL: 'https://node.halonode.com',
  timeout: 5000
});

// 请求拦截器
http.interceptors.request.use(
  config => {
    //config.headers.Authorization = 'Bearer token';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  response => {
    // 对响应进行处理
    return response.data;
  },
  error => {
    // 对错误进行处理
    return Promise.reject(error);
  }
);

// 封装get请求
export const getChain = (params) => {
  return http.get('/info', { params });
};

// 封装 POST 请求
export const transfer = (data) => {
  return http.post('/submit', data);
};

export const stakePost = (data) => {
  return http.post('/')
}

export const getuserToken = (params) => {
  return http.get('/token')
}
