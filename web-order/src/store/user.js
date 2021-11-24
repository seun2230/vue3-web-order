// import { response } from 'express';
// import axios from 'axios';
import http from '../api/interceptor';
import jwt from '../util/jwt';
import router from '../router/index'

export default {
    namespaced: true,
    state: {
        count: 0,
        loginUserEmail: '',
        loginUserName: '',
        token: {
            accessToken: jwt.getToken(),
        },
        isAuthenticated: !!jwt.getToken(),
    },
    mutations: {
        logout: function(state = {}) {
            state.token.accessToken = '';
            state.isAuthenticated = false;
            state.loginUserEmail = '';
            state.loginUserName = '';
            jwt.destroyToken();
            // location.reload();
            router.push('/');
        },
        login: function(state, payload = {}) {
            const bearerToken = `Bearer ${payload.accessToken}`;
            state.token.accessToken = bearerToken;
            state.isAuthenticated = true;
            jwt.saveToken(bearerToken);
        },
        loginUser: function(state, payload = {}) {
            console.log('payload:', payload);
            const userEmail = payload.userEmail;
            const userName = payload.userName;
            state.loginUserEmail = userEmail;
            state.loginUserName = userName;
            console.log('state:', state.loginUserEmail);
            console.log('state:', state.loginUserName);
        },
    },
    actions: {
        signup: function (context, payload) {
            const userData = {
                user_email: payload.user_email,
                user_name: payload.user_name,
                user_password: payload.user_password,
            }
            return new Promise((resolve, reject) => {
                http
                .post('/api/users/signup', userData)
                .then(response => {
                    const { data } = response;
                    if (data.success === true) {
                        alert('환영합니다!');
                        context.commit('login', {
                            success: data.success,
                            accessToken: data.token,
                        });
                        context.commit('loginUser', {
                            userEmail: userData.user_email,
                            userName: userData.user_name,
                        });
                        resolve(response);
                    } else {
                        alert('이미 등록된 이메일 주소입니다!');
                    }
                })
                .catch(error => {
                    reject(error);
                })
            })
        },
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
                        if (data.success === false) {
                            alert('이메일 또는 비밀번호가 잘못 입력되었습니다.');
                        } else {
                            context.commit('login', {
                                success: data.success,
                                accessToken: data.token,
                            })
                            resolve(response);
                            console.log('loginusername:', response.data.user_name);
                            context.commit('loginUser', {
                                userEmail: loginData.user_email,
                                userName: response.data.user_name,
                            });
                        }
                    })
                    .catch(error => {
                        reject(error);
                    })
                })
        },
        logout: function(context, payload) {
            return new Promise(resolve => {
                setTimeout(function () {
                    context.commit('logout', payload);
                    resolve({});
                }, 1000);
            })
        },
    },
    getters: {
        getAccessToken: function(state) {
            return state.token.accessToken
        },
        isAuthenticated: function(state) {
            return state.isAuthenticated;
        },
    }
};
