export default class Translate {
    constructor(locale, localeData) {
        this.locale = locale;
        this.localeData = localeData;
    }

    translate(key, args = null) {
        if (this.localeData[key]) {
            if (args) {
                let lastArg = null;
                return this.localeData[key].replace(/{(\d+|s)}/g, function (match, number) {
                    switch (number) {
                        case 's':
                            return (lastArg && args[lastArg] !== 'undefined') ?
                                (args[lastArg] > 1 ? 's' : '') : '';
                        default:
                            lastArg = number;
                            return typeof args[number] !== 'undefined'
                                ? args[number]
                                : match
                                ;
                    }
                });
            }
            return this.localeData[key];
        }
        return key;
    }
}