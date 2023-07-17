import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:5000', // Your API base URL
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('session')}`,
    // Other common headers
  },
});

export default Axios;
