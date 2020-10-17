import axios from 'axios'
const backendApiAxios = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: '/api_v1'
})

export { backendApiAxios }
