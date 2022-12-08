import axios from "axios";
import Env from "../../util/env";
import {processError, processResponse} from "./api-util";

export default class Api {
static login(username, password) {
        return axios.post(
            Env.getApiUrl('token'),
            ('grant_type=password&username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password)),
            {
                headers: {
                    'Authorization': 'Basic ' + Env.getPublicToken(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
            .then((response) => {
                return {
                    'status': 0,
                    'data': response.data
                };
            })
            .catch((error) => {
                return processError(error);
            });
    }

    static refresh(token) {
        return axios.post(
            Env.getApiUrl('refresh'),
            'grant_type=refresh_token&refresh_token=' + token,
            {
                headers: {
                    'Authorization': 'Basic ' + Env.getPublicToken(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
            .then((response) => {
                return {
                    'status': 0,
                    'data': response.data
                };
            })
            .catch((error) => {
                return processError(error);
            });
    }

    static register(params) {
        return axios.post(
            Env.getApiUrl('api_pub/register'),
            params,
            {}
        )
            .then((response) => {
                return processResponse(response);
            })
            .catch((error) => {
                return processError(error);
            })
    }

    static userInfo(user) {
        return axios.get(
            Env.getApiUrl('api/user'),
            {
                headers: {
                    'Authorization': 'Bearer ' + user.access_token
                }
            }
        )
            .then((response) => {
                return processResponse(response)
            })
            .catch((error) => {
                return processError(error);
            });
    }

    static resetPassword(username) {
        return axios.post(
            Env.getApiUrl('api_pub/reset-password'),
            {
                username: username
            }
        )
            .then((response) => {
                return processResponse(response);
            })
            .catch((error) => {
                return processError(error);
            });
    }

    static resetPasswordConfirm(username, token, password) {
        return axios.post(
            Env.getApiUrl('api_pub/reset-password-confirm'),
            {
                username: username,
                token: token,
                password: password
            }
        )
            .then((response) => {
                return processResponse(response);
            })
            .catch((error) => {
                return processError(error);
            });
    }
}