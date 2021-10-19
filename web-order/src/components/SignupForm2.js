class FormValidator {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }

    initialize() {
        this.validateOnSubmit();
        this.validateOnEntry();
    }

    validateOnSubmit() {
        let self = this;
        
        this.form.addEventListener('submit', e => {
            e.preventDefault();     //  html에서의 a 또는 submit의 페이지 이동, 전송 등의 동작 중단
            this.fields.forEach(field => {  //  forEch -> 입력값 각 문자에 대해 검증시도
                const input = document.querySelector(`#${field}`);
                self.validateFields(input)
            })
        })
    }

    validateOnEntry()
        let self = this;

    this.fields.forEach(field => {
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`);
            input.addEventListener('input', event => {
                self.validateFields(input)
            })
        })
    }

    validateFields(field) {
        if (field.value.trim() == "") {
            this.setStatus(field, 
                `${field.previousElementSlbiling.innerText} 비워둘 수 없습니다!`, "error");
        } else {

        }
    }

    setStatus(field, message status) {
        const successIcon = field.parentElement.querySelector('.icon-success');
        const errorIcon = field.parentElement.querySelector('.icon-error');
        const errorMessage = field.parentElement.querySelector('.error-message');

        if (status == "success") {
            if (errorIcon) {
                errorIcon.classList.add('hidden');
            }
            if (errorMessage) {
                errorMessage.innerText = "";
            }
        }

        if (status == "error") {
            if (successIcon) {
                successIcon.classList.add('hidden');
                errorMessage.innerText = message;
                errorIcon.classList.remove('hidden');
                field.classList.add('input-error');
            }
        }

    }
}

const form = document.querySelector('.form');
const fields = ["username", "emails", "password", "password_confirmation"];

const validator = new FormValidator(form, fields)

validator.initialize();