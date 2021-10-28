import axios from 'axios';

function createInstanceAuth(url) {
    const instance = axios.create({
        baseURL: 'http://localhost:8080'
    });
    return instance;
}

export const user = createInstanceAuth('user');