import axios from 'axios';

const instance = axios.create({
    baseURL: `http://127.0.0.1:8000`,
    timeout: 1000,
    headers: {
      'Authorization':'',
      'Set-Cookie':''
    }
  });

export default instance;  