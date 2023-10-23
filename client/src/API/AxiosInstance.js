import axios from 'axios';

const url = process.env.REACT_APP_URL;

console.log('url', url);

const Axios = axios.create({
  baseURL: url || 'http://localhost:5001', // Your API base URL
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('session')}`,
    // Other common headers
  },
});

export default Axios;
