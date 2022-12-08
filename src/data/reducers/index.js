import {combineReducers} from "redux";
import userReducer from "./user";
import uiReducer from "./ui";

const appReducer = combineReducers({
    user: userReducer,
    ui: uiReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        return {
            ui: {},
            user: {}
        }
    }
    return appReducer(state, action);
};

export default rootReducer;