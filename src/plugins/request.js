import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://81.70.101.187:1337/'
})

export default instance
