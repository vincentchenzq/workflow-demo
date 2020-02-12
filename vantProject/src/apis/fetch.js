import axios from 'axios';
import qs from 'qs';

let fetch = axios.create({
  baseURL: '/',
  // baseURL: "http://demo.jiandanzu.cn",
  timeout: 20000, // 超时时间
  transformRequest: [
    function(data) {
      data = qs.stringify(data);
      return data;
    },
  ],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

axios.interceptors.request.use(
  config => config,

  error => {
    Promise.reject(error);
  }
);

// respone拦截器

axios.interceptors.response.use(
  response => {
    console.log(response);
    if (response.status === 200 && response.data.code === 1) {
      // if (response.status === 200) {
      return response.data;
    }
    return Promise.reject(response);
  },

  error => Promise.reject(error)
);

// export default axios;
export default fetch;
