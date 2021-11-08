import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
});

const config = {
    headers: {
        'Content-type': 'application/json',
    },
};

function signUp(userData) {
    return axiosInstance.post('api/users/signup', userData, config);
}

export default { signUp };
