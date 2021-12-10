<template>
    <div class="container">
        <h2 class="title">회원 가입</h2>
        <Form class="form" @submit="OnSubmit">

            <div class="input-group">
                <label for="acc" class="label">아이디</label>
                <Field
                    type="text"
                    name="acc"
                    id="acc"
                    class="input"
                    maxlength="20"
                    placeholder="아이디를 입력하세요."
                    :rules="validateAcc">
                </Field>
                <ErrorMessage class="error-message" name="acc" />
            </div>

            <div class="input-group">
                <label for="password" class="label">비밀번호</label>
                <Field
                    type="password"
                    name="password"
                    id="password"
                    class="input"
                    :rules="validatePassword">
                </Field>
                <ErrorMessage class="error-message" name="password" />
            </div>

            <div class="input-group">
                <label for="password_confirmation" class="label">비밀번호 확인</label>
                <Field
                    type="password"
                    name="confirmPassword"
                    id="password_confirmation"
                    class="input"
                    rules="confirmed:@password">
                </Field>
                <ErrorMessage class="error-message" name="confirmPassword" />
            </div>

            <div class="input-group">
                <label for="username" class="label">이름</label>
                <Field
                    type="text"
                    name="firstName"
                    id="username"
                    class="input"
                    placeholder="이름을 입력하세요."
                    :rules="validateName">
                </Field>
                <ErrorMessage class="error-message" name="firstName" />
            </div>

            <div class="input-group">
                <label for="birthDay" class="label">생년월일</label>
                <Field
                    type="text"
                    name="birthDay"
                    id="birthDay"
                    class="input"
                    maxlength="8"
                    placeholder="8자리 생년월일을 입력하세요."
                    :rules="validateBirthDay">
                </Field>
                <ErrorMessage class="error-message" name="birthDay" />
            </div>

            <div class="input-group">
                <label for="phoneNumber" class="label">휴대전화</label>
                <Field
                    type="text"
                    name="phoneNumber"
                    maxlength="11"
                    class="input"
                    placeholder="- 를 제외하고 입력하세요."
                    :rules="validatePhoneNumber">
                </Field>
                <ErrorMessage class="error-message" name="phoneNumber" />
            </div>

            <button class="button">회원 가입</button>

        </Form>
    </div>
</template>

<script>
import { Form ,Field, ErrorMessage, defineRule } from 'vee-validate';

    defineRule("confirmed", (value, [password]) => {
        if (!value) {
            return '비밀번호를 다시 입력하세요.';
        }
        if (value !== password) {
            return '비밀번호가 일치하지 않습니다.';
        }
        return true;
    })

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    methods: {
        OnSubmit(values) {
            console.log('values!!:', values);
            try {
                this.$store.dispatch('user/signup', values)
                .then(response => {
                    if (response.status == 200) {
                        this.$router.push('/');
                    }
                })
            } catch (error) {
                console.log('error on signup page:', error.response);
            }
        },
        validateAcc(value) {
            if (!value) {
                return '아이디를 입력하세요.';
            }
            const regex = /^[a-zA-Z0-9]{6,20}/g;
            if (!regex.test(value)) {
                return '6~20자의 영문과 숫자만 입력할 수 있습니다.';
            }
            return true;
        },
        validateName(value) {
            if (!value) {
                return '이름을 입력하세요.';
            }
            const regex = /^[가-힣a-zA-z]+$/;
            if (!regex.test(value)) {
                return '이름은 한글 또는 영문 대,소문자로 입력하세요.';
            }
            return true;
        },
        validatePassword(value) {
            if (!value) {
                return '비밀번호를 입력하세요.';
            }
            if (value.length < 8 || value.length > 16) {
                return '8~16자 이내로 입력하세요.'
            }
            return true;
        },
        validatePhoneNumber(value) {
            if (!value) {
                return '필수 정보입니다.'
            }
            const regex = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
            if (!regex.test(value)) {
                return '올바른 전화번호를 입력하세요.'
            }
            return true;
        },
        validateBirthDay(value) {
            if (!value) {
                return '필수 정보입니다.'
            } else {
                const year = Number(value.substr(0, 4));
                const month = Number(value.substr(4, 2));
                const day = Number(value.substr(6, 2));
                const thisYear = new Date().getFullYear();

                if (value.length == 8) {
                    if (1900 > year || year > thisYear) {
                        return '올바른 년도를 입력하세요.';
                    } else if (month < 1 || month > 12) {
                        return '올바른 월을 입력하세요.';
                    } else if (day < 1 || day > 31) {
                        return '올바른 날짜를 입력하세요.';
                    } else if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
                        return '올바른 날짜를 입력하세요.';
                    } else if (month == 2) {
                        const isLeap = (year % 4 == 0 && (year % 100 == 0 || year % 400 == 0));
                        if (day > 29 || (day == 29 && !isLeap)) {
                            return '올바른 날짜를 입력하세요.'
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                } else {
                    return '8자리 생년월일을 입력하세요.'
                }
            }
        }
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
    /* margin: 3rem auto; */
    padding: 3rem;
    /* border: 1px solid #ddd; */
    border-radius: .25rem;
    background-color: rgba(0, 0, 0, 0.04);
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