// import { response } from 'express';
import axios from 'axios';
import http from '../api/interceptor';
import jwt from '../util/jwt';

export const user = {
    state: {
        count: 0,
        token: {
            accessToken: jwt.getToken(),
        },
        isAuthenticated: !!jwt.getToken(),
    },
    mutations: {
        // setToken(state, data) {
        //     console.log('data in setToken mutations: ', data);
        //     state.user = data;
        //     localStorage.setItem('user', JSON.stringify(data));
        //     axios.defaults.headers.common[
        //         'Authorization'
        //     ] = `Bearer ${data.token}`;
        // },
        logout: function(state = {}) {
            state.token.accessToken = '';
            state.isAuthenticated = false;
            jwt.destroyToken();
            location.reload();
        },
        login: function(state, payload = {}) {
            console.log('payload on mutations', payload);
            const bearerToken = `Bearer ${payload.accessToken}`;
            state.token.accessToken = bearerToken;
            console.log('bearerToken:', bearerToken);
            console.log('state:', state);
            state.isAuthenticated = true;
            jwt.saveToken(bearerToken);
        },
    },
    actions: {
        signup: function (context, payload) {
            console.log('payload', payload);
            let userData = {
                user_email: payload.user_email,
                user_name: payload.user_name,
                user_password: payload.user_password,
            }
            return new Promise((resolve, reject) => {
                http
                .post('/api/users/signup', userData)
                .then(response => {
                    const { data } = response;
                    context.commit('login', {
                        success: data.success,
                        accessToken: data.token,
                    });
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
            })
        },
        // async signup({ commit }, credentials) {
        //     const config = {
        //         headers: {
        //             'Content-type': 'application/json',
        //         },
        //     };
        //     const { data } = await axios.post('api/users/signup', credentials, config);
        //     // const { data } = await signUp(userData);
        //     console.log('setToken data: ', data);
        //     if (data.success === true) {
        //         commit('setToken', data);
        //     } else {
        //         return;
        //     }
        // },

        login: function(context, payload) {
            let loginData = {
                user_email: payload.user_email,
                user_password: payload.user_password,
            }
            return new Promise((resolve, reject) => {
                http
                    .post('/api/users/login', loginData)
                    .then(response => {
                        const { data } = response;
                        console.log('data on login actions', data);
                        context.commit('login', {
                            success: data.success,
                            accessToken: data.token,
                        })
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        },

        // async login({ commit }, credentials) {
        //     const config = {
        //         headers: {
        //             'Content-type': 'application/json',
        //         },
        //     };
        //     const { data } = await axios.post('api/users/login', credentials, config);
        //     console.log('setToken data: ', data);
        //     commit('setToken', data);
        // },

        logout: function(context, payload) {
            return new Promise(resolve => {
                setTimeout(function () {
                    context.commit('logout', payload);
                    resolve({});
                }, 1000);
            })
        },

        // logout({ commit }) {
        //     commit('logout');
        // },

        async update ({ commit }, credentials) {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            const { data } = await axios.post('api/users/update', credentials, config);
            console.log('setToken data in update: ', data);
            commit('setToken', data);
        },
    },
    getters: {
        // loggedIn(state) {
        //     return !!state.user;
        // },
        getAccessToken: function(state) {
            return state.token.accessToken
        },
        isAuthenticated: function(state) {
            return state.isAuthenticated;
        }
    }
};
