import axios from 'axios';
import store from '../store';

const http = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: { 'content-type': 'application/json' },
});

http.interceptors.request.use(
    config => {
        const isAuthenthicated = store.getters['isAuthenthicated'];
        if (isAuthenthicated) {
            config.headers.common['Authorization'] = store.getters['getAccessToken'];
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
)
// http.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded';
http.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

export default http;
