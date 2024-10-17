import axios from 'axios';
import { useSelector } from 'react-redux'; 

const { token } = useSelector((state) => state.auth);

const apiAuthenticated = axios.create({
  baseURL: 'https://localhost:8001/api',
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
    'Authorization': `Bearer ${token}`
  }
});

export default apiAuthenticated;