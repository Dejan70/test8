import {logout} from "../data/actions/user";

const eventsMiddleware = store => next => action => {

    if (action.data === "invalid_token") {
        store.dispatch(logout());
        return store.getState();
    }

    return next(action);
};

export default eventsMiddleware