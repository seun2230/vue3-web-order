<template>
    <div class="container">
        <h2 class="title">회원 가입</h2>
        <form class="form" @submit.prevent="submitForm">

            <div class="input-group">
                <label for="email" class="label">이메일</label>
                <input
                    type="email"
                    id="email"
                    class="input"
                    placeholder="이메일을 입력하세요."
                    v-model="user.user_email">
                <span class="error-message"></span>
                <svg class="icon icon-success hidden" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                </svg>

                <svg class="icon icon-error hidden" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                </svg>
            </div>

            <div class="input-group">
                <label for="username" class="label">이름</label>
                <input
                    type="text"
                    id="username"
                    class="input"
                    placeholder="이름을 입력하세요."
                    v-model="user.user_name">
                <span class="error-message"></span>
                <svg class="icon icon-success hidden hidden" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                </svg>

                <svg class="icon icon-error hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                </svg>
            </div>

            <div class="input-group">
                <label for="password" class="label">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    class="input"
                    v-model="user.user_password">
                <span class="error-message"></span>
                <svg class="icon icon-success hidden" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                </svg>

                <svg class="icon icon-error hidden" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                </svg>
            </div>

            <div class="input-group">
                <label for="password_confirmation" class="label">비밀번호 확인</label>
                <input
                    type="password"
                    id="password_confirmation"
                    class="input"
                    v-model="user.user_passwordConfirmation">
                <span class="error-message"></span>
                <svg class="icon icon-success hidden" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                </svg>

                <svg class="icon icon-error hidden" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                </svg>
            </div>

            <input type="submit" class="button" value="회원 가입">

        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    methods: {
        async submitForm() {
            try {
                const userData = {
                    user_email: this.user.user_email,
                    user_name: this.user.user_name,
                    user_password: this.user.user_password,
                };
                console.log('userData on Front: ', userData);
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                    },
                };
                const { data } = await (axios.post('api/users/signup', userData, config));
                // const { data } = await signUp(userData);
                if (data.message === true) {
                    alert(data.message);
                    this.$router.push('/login');
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.log('error on Front: ', error.res);
            }
        },
    },
    data() {
        return {
            user: {
                user_name: '',
                user_email: '',
                user_password: '',
                user_passwordConfirmation: '',
            },
        };
    },
};
</script>

<style scoped>
* {
    box-sizing: border-box;
    /* 박스의 크기 계산 기준 */
}

body {
    background-color:burlywood;
}

.title {
    margin-bottom: 2rem;
}

.hidden {
    display: none;
}

.icon {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 32px;
    right: 5px;
    pointer-events: none;
    /* 해당 영역의 이벤트에 응답하지 않도록 */
    z-index: 2;
}

.icon.icon-success {
    fill: green;
}

.icon-error {
    fill: red;
}

.container {
    max-width: 460px;
    margin: 3rem auto;
    padding: 3rem;
    border: 1px solid #ddd;
    border-radius: .25rem;
    background-color: white;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.label {
    text-align: left;
    font-weight: bold;
    display: block;
    color: #333;
    margin-bottom: .25rem;
    color: #2d3748;
}

.input {
    appearance: none;
    /* 운영체제 및 브라우저에 기본 설정된 테마를 기반으로 요소 표현
        : 네이티브로 지원되는 모양들을 해제 또는 추가
        -> ios, 안드로이드 간의 모양 차이 없애기 -- 모든 브라우저 완벽지원은 안 함 */
    display: block;
    width: 100%;
    color: #2d3748;
    border: 1px solid #cdb5e0;
    line-height: 1.25;
    background-color: white;
    padding: .65rem .75rem;
    border-radius: 0.25rem;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.input::placeholder {
    /* :: -> pseudo-element(의사 요소) 선택자 */
    color: #a0aec0;
}

.input.input-error {
    border: 1px solid red;
}

.input.input-error:focus {
    border: 1px solid red;
}

.input:focus {
    outline: none;
    border: 1px solid #a0aec0;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.06);
    background-clip: padding-box;
    /* 요소의 배경이 테두리, 안쪽 여백, 콘텐츠 상자 중 어디까지 차지할 지 지정 */
}

.input-group {
    margin-bottom: 2rem;
    position: relative;
}

.error-message {
    font-size: .85rem;
    color: red;
}

.button {
    background-color: royalblue;
    padding: 1rem 2rem;
    border: none;
    border-radius: .25rem;
    color: white;
    font-weight: bold;
    display: block;
    width: 100%;
    text-align: center;
    cursor: pointer;
}

.button:hover {
    /* : 와 :: 를 구분할 것
        -> : 가상 클래스 - 특정 부분에 스타일
        -> :: 가상 요소 - 특정 상태에 스타일 */
        filter: brightness(110%);
}
</style>