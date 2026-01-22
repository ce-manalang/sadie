// sadie/src/api/samClient.js
import axios from 'axios';

const sam = axios.create({
  baseURL: 'http://localhost:3000',
});

// This helper will be useful once you have your token
export const getPublicBooks = () => sam.get('/books');

export default sam;