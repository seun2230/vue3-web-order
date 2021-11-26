import axios from 'axios';
import store from '../store';

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: { 'content-type': 'application/json' },
});

http.interceptors.request.use(
    config => {
        const isAuthenticated = store.getters['user/isAuthenticated'];
        if (isAuthenticated) {
            config.headers.common['Authorization'] = store.getters['user/getAccessToken'];
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
)
// http.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded';
http.defaults.headers.post['Content-Type'] = 'application/json';

export default http;
