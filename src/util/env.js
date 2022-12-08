export default class Env {
    static getApiUrl(path, query = null) {
        return encodeURI(process.env.REACT_APP_API_URL+ path + Env.addQuery(query));
    }

    static addQuery(path) {
        if (!!path) {
            let result = ('?' +
                (
                    Object.keys(path).reduce(
                        (memo, key) => {
                            memo += (key + "=" + path[key] + "&");
                            return memo;
                        }
                        , "")
                )
            );
            return result.substring(0, result.length - 1);
        }
        return "";
    }

    static getPublicToken() {
        return 'dGVzdGNsaWVudDp0ZXN0cGFzcw=';
    }
}