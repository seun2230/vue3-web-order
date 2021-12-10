export default {
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
}
