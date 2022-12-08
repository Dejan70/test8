export function login(data) {
    return {
        type: 'LOGIN',
        data: data
    };
}

export function doneLogin(data) {
    return {
        type: 'DONE_LOGIN',
        data: data
    };
}

export function errorLogin(data) {
    return {
        type: 'ERROR_LOGIN',
        data: data
    };
}

export function logout(data) {
    return {
        type: 'LOGOUT_ME',
        data: data
    };
}

export function logoutClear(data) {
    return {
        type: 'LOGOUT',
        data: data
    };
}

export function resetPassword(data) {
    return {
        type: 'RESET_PASSWORD',
        data: data
    };
}

export function doneResetPassword(data) {
    return {
        type: 'DONE_RESET_PASSWORD',
        data: data
    };
}

export function errorResetPassword(data) {
    return {
        type: 'ERROR_RESET_PASSWORD',
        data: data
    };
}

export function resetPasswordConfirm(data) {
    return {
        type: 'RESET_PASSWORD_CONFIRM',
        data: data
    };
}

export function doneResetPasswordConfirm(data) {
    return {
        type: 'DONE_RESET_PASSWORD_CONFIRM',
        data: data
    };
}

export function errorResetPasswordConfirm(data) {
    return {
        type: 'ERROR_RESET_PASSWORD_CONFIRM',
        data: data
    };
}

export function resetUserMessage() {
    return {
        type: 'RESET_USER_MESSAGE'
    }
}

export function register(data) {
    return {
        type: 'REGISTER',
        data: data
    }
}

export function doneRegister(data) {
    return {
        type: 'DONE_REGISTER',
        data: data
    };
}

export function errorRegister(data) {
    return {
        type: 'ERROR_REGISTER',
        data: data
    };
}