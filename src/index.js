import {render} from "react-dom";
import {createElement} from "react";
import App from "./app";
import "./styles/style.css";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import Cookie from "./util/localStorage";

/*
 * Globals
 =========================================================================================*/
window._DEV_MODE = true;

/*
 * Locale data preload
 =====================================================================================*/
const locale = Cookie.has('locale')?Cookie.get('locale'):'en';
axios.get(`/locale/${locale}.json`)
    .then((response) => {
        if (response.status >= 400) {
            throw new Error('Bad response from server');
        }

        return response.data;
    })
    .then((localeData) => {
        render(
            createElement(App, {locale: locale, localeData: localeData}),
            window.document.getElementById('root')
        );
    })
    .catch((error) => {
        console.error(error);
    });
/*
 * Service worker
 ===================================================================================*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
