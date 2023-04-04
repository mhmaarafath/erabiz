import Axios from 'axios'

const axios = (token = null) => {
  return Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

export default axios;
