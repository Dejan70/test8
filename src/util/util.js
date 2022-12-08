import LocalStorage from "./localStorage";

export const READ_PERM = 1;
export const CREATE_PERM = 2;
export const UPDATE_PERM = 4;
export const DELETE_PERM = 8;


export function checkPerm(key, check) {
    const perm = parseInt(getProp(LocalStorage.get('user'), 'permissions.' + key, 0));
    return (perm & check) !== 0;
}

export function getProp(object, keys, defaultVal) {
    if (object === undefined || object === null) {
        return defaultVal;
    }
    keys = Array.isArray(keys) ? keys : keys.split('.');
    object = object[keys[0]];
    if (object && keys.length > 1) {
        return getProp(object, keys.slice(1), defaultVal);
    }
    return (object === undefined || object === null) ? defaultVal : object;
}

export function getCurrentTimeSeconds() {
    const d = new Date();
    return Math.round(d.getTime() / 1000);
}

export function numberWithCommasInputChange(n) {
    if (n) {
        let original = n.toString().split(".");
        if (original[1] && original[1].length > 1) {
            return original[0] + (original[1] ? "." + original[1].charAt(0) + original[1].charAt(1) : "");
        } else {
            n = n.replace(/[^0-9.]/g, '');
            n = n.replace(/,/g, "");
            n = n.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return n;
        }
    }
}