const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                data: null,
                isLoading: true,
                error: false,
                errorMessage: null,
                logout: false
            });
        case 'DONE_LOGIN':
            return Object.assign({}, state, {
                data: action.data,
                isLoading: false,
                error: false,
                errorMessage: null
            });
        case 'ERROR_LOGIN':
            return Object.assign({}, state, {
                data: null,
                isLoading: false,
                error: true,
                errorMessage: action.data
            });
        case 'REGISTER':
            return Object.assign({}, state, {
                register: null,
                isLoading: true,
                error: false,
                errorMessage: null
            });
        case 'DONE_REGISTER':
            return Object.assign({}, state, {
                register: true,
                isLoading: false,
                error: false,
                errorMessage: null
            });
        case 'ERROR_REGISTER':
            return Object.assign({}, state, {
                register: null,
                isLoading: false,
                error: true,
                errorMessage: action.data
            });
        case 'RESET_PASSWORD':
            return Object.assign({}, state, {
                reset: null,
                isLoading: true,
                error: false,
                errorMessage: null
            });
        case 'DONE_RESET_PASSWORD':
            return Object.assign({}, state, {
                reset: true,
                isLoading: false,
                error: false,
                errorMessage: null
            });
        case 'ERROR_RESET_PASSWORD':
            return Object.assign({}, state, {
                reset: null,
                isLoading: false,
                error: true,
                errorMessage: action.data
            });
        case 'RESET_PASSWORD_CONFIRM':
            return Object.assign({}, state, {
                resetConfirm: null,
                isLoading: true,
                error: false,
                errorMessage: null
            });
        case 'DONE_RESET_PASSWORD_CONFIRM':
            return Object.assign({}, state, {
                resetConfirm: true,
                isLoading: false,
                error: false,
                errorMessage: null
            });
        case 'ERROR_RESET_PASSWORD_CONFIRM':
            return Object.assign({}, state, {
                resetConfirm: null,
                isLoading: false,
                error: true,
                errorMessage: action.data
            });
        case 'SEND_SUPPORT':
            return Object.assign({}, state, {
                support: null,
                isLoading: true,
                error: false,
                errorMessage: null
            });
        case 'DONE_SEND_SUPPORT':
            return Object.assign({}, state, {
                support: true,
                isLoading: false,
                error: false,
                errorMessage: null
            });
        case 'ERROR_SEND_SUPPORT':
            return Object.assign({}, state, {
                support: null,
                isLoading: false,
                error: true,
                errorMessage: action.data
            });

        case 'SEND_DEMO_REQUEST':
            return Object.assign({}, state, {
                requestDemo: null,
                isLoading: true,
                error: false,
                errorMessage: null
            });
        case 'DONE_SEND_DEMO_REQUEST':
            return Object.assign({}, state, {
                requestDemo: true,
                isLoading: false,
                error: false,
                errorMessage: null
            });
        case 'ERROR_SEND_DEMO_REQUEST':
            return Object.assign({}, state, {
                requestDemo: null,
                isLoading: false,
                error: true,
                errorMessage: action.data
            });
        case 'UPDATE_USER_INFO':
            return Object.assign({}, state, {
                data: action.data
            });
        case 'LOGOUT_ME':
            return Object.assign({}, state, {
                logout: true
            });
        case 'RESET_USER_MESSAGE':
            return Object.assign({}, state, {
                requestDemo: false,
                support: false,
                reset: false,
                error: false,
                errorMessage: null
            });
        default:
            return state;
    }
};

export default userReducer;