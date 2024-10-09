import axios from 'axios';
import { authHeader } from './utils/authHeader';

const API_URL = 'https://no23.lavina.tech';

export const signup = async (data: any) => {
    return await axios.post(`${API_URL}/signup`, data);
};

export const getUserInfo = async () => {
    const headers = authHeader('GET', '/myself', '');
    return await axios.get(`${API_URL}/myself`, { headers });
};

export const addBook = async (data: any) => {
    const headers = authHeader('POST', '/books', JSON.stringify(data));
    return await axios.post(`${API_URL}/books`, data, { headers });
};

export const getBooks = async () => {
    const headers = authHeader('GET', '/books', '');
    return await axios.get(`${API_URL}/books`, { headers });
};

export const updateBook = async (id: number, data: any) => {
    const headers = authHeader('PATCH', `/books/${id}`, JSON.stringify({book: data}));
    console.log(JSON.stringify({book: data}), "dataaaat header----")
    return await axios.put(`${API_URL}/books/${id}`, {book:data}, { headers });
};

export const deleteBook = async (id: string) => {
    const headers = authHeader('DELETE', `/books/${id}`, '');
    return await axios.delete(`${API_URL}/books/${id}`, { headers });
};
