import axios from 'axios';

export const configAxios = () => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';
};
