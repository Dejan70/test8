export default class Cookie {
    /** Cached cookies on first read */
    static cookieJar;

    /**
     * Get HTTP cookie
     * @param e
     * @returns {*}
     */
    static getCookie(e) {
        if (Cookie.cookieJar) {
            return Cookie.cookieJar[e];
        }
        let o;
        let i = document.cookie.split('; ');
        Cookie.cookieJar = {};
        for (let r = i.length - 1; r >= 0; --r) {
            o = i[r].split('='), Cookie.cookieJar[o[0]] = o[1];
        }
        return Cookie.cookieJar[e];
    }

    /**
     * Set HTTP cookie
     * @param name
     * @param value
     * @param time
     */
    static setCookie(name, value, time) {
        let r;
        if (time) {
            if (!Cookie.cookieJar) {
                Cookie.cookieJar = {};
            }
            let t = new Date();
            Cookie.cookieJar[name] = value;
            t.setTime(t.getTime() + 60 * time * 60 * 1e3), r = '; expires=' + t.toGMTString();
        } else {
            r = '';
        }
        document.cookie = name + '=' + value + r + ';domain=' + window.location.hostname + ';path=/';
    }

    /**
     * Erase HTTP cookie
     * @param e
     */
    static eraseCookie(e) {
        Cookie.setCookie(e, '', -1);
    }
}