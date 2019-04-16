import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-f1fcc.firebaseio.com/'
});

export default instance; 