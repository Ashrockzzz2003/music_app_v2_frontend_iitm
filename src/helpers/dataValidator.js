export function validateEmail(userEmail) {

    if (typeof(userEmail) == "string" && userEmail.length > 0) {
        return true;
    }
    return false;
}

export function validatePassword(userPassword) {
    if (typeof(userPassword) == "string" && userPassword.length >= 8 && userPassword.length <= 255) {
        return true;
    }

    return false;
}

export function validateUserFullName(userFullName) {
    if (typeof(userFullName) == "string" && userFullName.length > 0 && userFullName.length <= 255 && userFullName.match(/^[a-zA-Z\s]*$/)) {
        return true;
    }
    return false;
}

export function validateUserDob(userDob) {
    if (typeof(userDob) == "string" && userDob.length == 10 && userDob.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return true;
    }
    return false;
}

export function validateGender(userGender) {
    if (typeof(userGender) == "string" && userGender.length == 1 && ['M', 'F', 'O'].includes(userGender)) {
        return true;
    }
    return false;
}

export function validateOtp(otp) {
    if (typeof(otp) == "string" && otp.length == 6) {
        return true;
    }
    return false;
}