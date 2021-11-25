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
        loginUserEmail: function(state, payload = {}) {
            console.log('payload:', payload);
            const userEmail = payload.userEmail;
            state.loginUserEmail = userEmail;
            console.log('state:', state.loginUserEmail);
        },
        loginUserName: function(state, payload = {}) {
            console.log('payload:', payload);
            const userName = payload.updatedUserName;
            state.loginUserName = userName;
            console.log('state:', state.loginUserName);
        },
    },
    actions: {
        updateUser: function (context, payload) {
            return new Promise((resolve, reject) => {
                console.log('payapy:', payload);
                http
                .post('api/users/update', payload)
                .then(response => {
                    const updatedUserName = response.data[0].user_name;
                    console.log('resrsersr', updatedUserName);
                    if (response.status == 200) {
                        alert('변경 사항이 저장되었습니다.');
                        context.commit('loginUserName', {
                            updatedUserName
                        })
                    }
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
            })
        },
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
                        context.commit('loginUserEmail', {
                            userEmail: response.data.user_email
                        });
                        context.commit('loginUserName', {
                            userName: response.data.user_name,
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
                            context.commit('loginUserEmail', {
                                userEmail: loginData.user_email
                            });
                            context.commit('loginUserName', {
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
