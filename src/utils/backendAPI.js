import axios from "axios";

const backendAPI = axios.create({
  baseURL: 'http://3.34.96.155',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default backendAPI;