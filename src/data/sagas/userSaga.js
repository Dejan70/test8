import {call, put, takeLatest} from "redux-saga/effects";
import {
    doneLogin,
    doneRegister,
    doneResetPassword,
    doneResetPasswordConfirm,
    errorLogin,
    errorRegister,
    errorResetPassword,
    errorResetPasswordConfirm
} from "../actions/user";
import Api from "../services/api";
import LocalStorage from "../../util/localStorage";
import {getCurrentTimeSeconds} from "../../util/util";

export function *loginCall(action) {
    const result = yield call(Api.login, action.data.username, action.data.password);

    if (result && result.status === 0) {
        const infoResult = yield call(Api.userInfo, result.data);

        if (infoResult && infoResult.status === 0) {
            let user = Object.assign(result.data, infoResult.data);
            user.obtain_time = getCurrentTimeSeconds();

            LocalStorage.set('user', user);
            yield put(doneLogin(user));

        } else {
            yield put(errorLogin(infoResult.data));
        }
    } else {
        yield put(errorLogin(result.data));
    }
}

export function* watchLoginCall() {
    yield takeLatest('LOGIN', loginCall);
}

export function *resetPasswordCall(action) {
    const result = yield call(Api.resetPassword, action.data.username);

    if (result && result.status === 0) {
        yield put(doneResetPassword(result.data));
    } else {
        yield put(errorResetPassword(result.data));
    }
}

export function* watchResetPasswordCall() {
    yield takeLatest('RESET_PASSWORD', resetPasswordCall);
}

export function *resetPasswordConfirmCall(action) {
    const result = yield call(Api.resetPasswordConfirm, action.data.username, action.data.token, action.data.password);

    if (result && result.status === 0) {
        yield put(doneResetPasswordConfirm(result.data));
    } else {
        yield put(errorResetPasswordConfirm(result.data));
    }
}

export function* watchResetPasswordConfirmCall() {
    yield takeLatest('RESET_PASSWORD_CONFIRM', resetPasswordConfirmCall);
}

export function *registerCall(action) {

    const result = yield call(Api.register, action.data.params);

    if (result && result.status === 0) {
        yield put(doneRegister(result.data));
    } else {
        yield put(errorRegister(result.data));
    }
}

export function* watchRegisterCall() {
    yield takeLatest('REGISTER', registerCall);
}