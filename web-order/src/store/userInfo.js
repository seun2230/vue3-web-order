import axios from 'axios'

export default {
    namespaced: true,
    state: () => {
        return {
            maskedUser: {
                maskedAge: '',
                maskedPhone: '',
            },
        }
    },

    getters: {
        getMaskedUser: function(state) {
            return state.maskedUser;
        }
    },

    mutations: {
        maskedUser(state, payload) {
            console.log('payload on maskedUser mutation: ', payload);
            const maskedAge = payload.maskedAge.replace((/^(.{4})/), "$1. ");
            const maskedPhone = payload.maskedPhone;
            state.maskedUser.maskedAge = maskedAge;
            state.maskedUser.maskedPhone = maskedPhone;
            console.log('state on maskedUser: ', state.maskedUser);
        },
    },

    actions: {
        maskedUser: function (context) {
            return new Promise((resolve, reject) => {
                axios
                .get('http://localhost:3000/maskedUser')
                .then(response => {
                    console.log('response.data[0] on maskedUser actions: ', response.data[0]);
                    if (response.status == 200) {
                        context.commit('maskedUser', {
                            maskedAge: response.data[0].maskedAge,
                            maskedPhone: response.data[0].maskedPhone,
                        });
                    }
                    resolve(response);
                })
                .catch (error => {
                    reject(error);
                })
            })
        },

        //  다음 차례

        // updateUser: function (context, payload) {
        //     return new Promise((resolve, reject) => {
        //         console.log('payload on updateUser action:', payload);
        //         const updateData = {
        //             user_acc: payload.acc,
        //             user_name: payload.firstName,
        //             user_password: payload.password,
        //             user_phone: payload.phoneNumber,
        //             user_age: payload.birthDay,
        //         }
        //         http
        //         .post('/api/users/update', updateData)
        //         .then(response => {
        //             const userData = response.data[0].user_name;
        //             console.log('updatedUserName', userData);
        //             if (response.status == 200) {
        //                 alert('변경 사항이 저장되었습니다.');
        //                 context.commit('loginUserData', {
        //                     userData
        //                 })
        //             }
        //             resolve(response);
        //         })
        //         .catch(error => {
        //             reject(error);
        //         })
        //     })
        // },
    }
}