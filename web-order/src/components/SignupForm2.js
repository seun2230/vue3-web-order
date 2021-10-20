class FormValidator {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }

    initialize() {
        this.validateOnEntry();
        this.validateOnSubmit();
    }

    validateOnSubmit() {
        let self = this;
        
        self.form.addEventListener('submit', e => {
            e.preventDefault();     //  html에서의 a 또는 submit의 페이지 이동, 전송 등의 동작 중단
            self.fields.forEach(field => {  //  forEch -> 입력값 각 문자에 대해 검증시도
                const input = document.querySelector(`#${field}`);
                self.validateFields(input)
            })
        })
    }

    validateOnEntry() {
        let self = this;

        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`);
            input.addEventListener('input', event => {
                self.validateFields(input)
            })
        })
    }

    validateFields(field) {

        //  값 존재 여부 확인
        if (field.value.trim() === "") {
            if (field.id === "username") { 
                this.setStatus(field, `${field.previousElementSibling.innerText}을 입력하세요.`, "error");
            } else {
                this.setStatus(field, `${field.previousElementSibling.innerText}를 입력하세요.`, "error");
            }
        } else {
            this.setStatus(field, null, "success");
        }

        //  이메일 주소 유효성 검사
        if (field.type === "email") {   
            const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            if (re.test(field.value)) {
                this.setStatus(field, null, "success");
            } else {
                this.setStatus(field, "유효한 이메일 주소를 입력하세요.", "error");
            }
        }

        //  비밀번호 확인 edge case - 경계 조건
        if (field.id === "password_confirmation") {
            const passwordField = this.form.querySelector('#password');

            if (field.value.trim() == "") {
                this.setStatus(field, "비밀번호를 한 번 더 입력하세요.", "error");
            } else if (field.value != passwordField.value) {
                this.setStatus(field, "비밀번호가 일치하지 않습니다.", "error");
            } else {
                this.setStatus(field, null, "success");
            }
        }   
    }

    setStatus(field, message, status) {
        const successIcon = field.parentElement.querySelector('.icon-success');
        const errorIcon = field.parentElement.querySelector('.icon-error');
        const errorMessage = field.parentElement.querySelector('.error-message');

        if (status === "success") {
            if (errorIcon) {
                errorIcon.classList.add('hidden');
            }
            if (errorMessage) {
                errorMessage.innerText = "";
            }
            successIcon.classList.remove('hidden');
            field.classList.remove('input-error');
        }
        
        if (status === "error") {
            if (successIcon) {
                successIcon.classList.add('hidden');
            }
            field.parentElement.querySelector('.error-message').innerText = message;
            errorIcon.classList.remove('hidden');
            field.classList.add('input-error');
        }
    }
}

const form = document.querySelector('.form');
const fields = ["username", "email", "password", "password_confirmation"];

const validator = new FormValidator(form, fields)

validator.initialize();