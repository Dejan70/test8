const uiReducer = (state = {}, action) => {
    switch (action.type) {
        case 'HIDE_MODALS':
            return Object.assign({}, state, {});
        default:
            return state;
    }
};

export default uiReducer;