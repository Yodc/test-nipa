import axios from 'axios'


const defaultInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_URL,
  headers: {
  },
})

export { defaultInstance }