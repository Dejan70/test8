import {
    watchLoginCall,
    watchRegisterCall,
    watchResetPasswordCall,
    watchResetPasswordConfirmCall
} from "./userSaga";
import {all} from "redux-saga/effects";

/*
 * Single entry point to start all Sagas at once
 =========================================================================================*/
export default function *rootSaga() {
    yield all([
        watchLoginCall(),
        watchRegisterCall(),
        watchResetPasswordCall(),
        watchResetPasswordConfirmCall()
    ]);
}