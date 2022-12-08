import React, {PureComponent} from "react";
import moment from "moment";
import {Provider as Redux} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import appDataReducers from "./data/reducers";
import rootSaga from "./data/sagas";
import Translate from "./data/services/translate";
import routes from "./routes";
import loggerMiddleware from "./middleware/logger";
import eventsMiddleware from "./middleware/events";
import LocalStorage from "./util/localStorage";

/**
 * App is using redux-saga for handling side effects (async calls)
 =========================================================================================*/
const sagaMiddleware = createSagaMiddleware();

/**
 * Store is single source of truth for the app, it is hub for all the data and data events
 =========================================================================================*/
const initialStoreState = {
    user: {
        data: LocalStorage.has('user') ? LocalStorage.get('user') : {}
    }
};

let store = createStore(
    appDataReducers,
    initialStoreState,
    compose(
        applyMiddleware(
            sagaMiddleware,
            eventsMiddleware,
            loggerMiddleware
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

sagaMiddleware.run(rootSaga);

/**
 * Root App Component
 =========================================================================================*/
export default class App extends PureComponent {

    constructor(props) {
        super(props);
        moment.locale(props.locale);
    }

    render() {
        const {locale, localeData} = this.props;
        const translator = new Translate(locale, localeData);

        return (
            <Redux store={store}>
                {routes(store, translator)}
            </Redux>
        );
    }
}