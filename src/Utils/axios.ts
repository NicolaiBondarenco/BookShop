import axios from 'axios'

// https://www.googleapis.com/books/v1/volumes
const instance = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes',
})

export default instance
