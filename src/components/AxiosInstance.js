import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/', // Replace with your API URL
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'key': '116fc96c9ea9a8a45a00ad1481141179' },

});

export default axiosInstance;