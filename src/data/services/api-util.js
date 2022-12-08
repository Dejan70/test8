import {call, put} from "redux-saga/effects";
import Api from "./api";
import {logout} from "../actions/user";
import LocalStorage from "../../util/localStorage";
import {getCurrentTimeSeconds} from "../../util/util";

export function* checkUserHelper(user) {
    const expires = Math.round(user.expires_in * (8 / 10));
    const currTime = getCurrentTimeSeconds();

    if ((user.obtain_time + expires) < currTime) {
        let result = yield call(Api.refresh, user.refresh_token);

        if (result && result.status === 0) {
            result.data.obtain_time = currTime;
            if (LocalStorage.get('user') && LocalStorage.get('user').Contact) {
                const newUser = Object.assign({}, LocalStorage.get('user'), result.data);
                LocalStorage.set('user', newUser);
            }
        } else {
            yield put(logout());
        }
    }

    return user;
}

export function processResponse(response) {
    return {
        'status': 0,
        'data': response.data.data
    };
}

export function processError(error) {
    if (error.response) {
        return {
            'status': 2,
            'data': error.response.data.error ? error.response.data.error : (error.response.data.message ? error.response.data.message : "API_ERROR")
        }
    } else if (error.request) {
        return {
            'status': 3,
            'data': 'NO_RESPONSE'
        }
    } else {
        return {
            'status': 3,
            'data': error.message
        }
    }
}