import axios from 'axios';

export const user = {
    state: {
        user: null,
    },
    mutations: {
        setToken(state, data) {
            if (data.message === true) {
                state.user = data;
            } else {
                state.user = null;
            }
            localStorage.setItem('user', JSON.stringify(data));
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${data.token}`;
        },
        logout() {
            localStorage.removeItem('user');
            location.reload();
        }
    },
    actions: {
        async signup({ commit }, credentials) {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            const { data } = await axios.post('api/users/signup', credentials, config);
            // const { data } = await signUp(userData);
            console.log('setToken data: ', data);
            commit('setToken', data);
        },
        async login({ commit }, credentials) {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            const { data } = await axios.post('api/users/login', credentials, config);
            console.log('setToken data: ', data);
            commit('setToken', data);
        },
        logout({ commit }) {
            commit('logout');
        }
    },
    getters: {
        loggedIn(state) {
            return !!state.user;
        }
    }
};
