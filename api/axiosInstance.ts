import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.preprod.routag.com/api/v1',
  timeout: 10000,
  headers: {
    // 'Content-Type': 'application/json',
   'RoutagAccess': '1',
  },
});

export default axiosInstance;