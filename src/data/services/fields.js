import moment from "moment";
import {numberWithCommasInputChange} from "../../util/util";

export class Field {
    constructor(name, value = '', validate = ['empty'], disabled = false) {
        this.name = name;
        this.value = !!value ? value : "";
        this.errorMessage = null;
        this.validate = validate;
        this.isEmpty = !this.value || this.value.length === 0;
        this.disabled = disabled;
    }
}

export class FieldsManager {
    static updateField(fields, name, newValue) {
        let clone = Object.assign({}, fields);
        clone[name].value = FieldsManager.formatValue(newValue, clone[name].validate);
        return clone;
    }

    static formatValue(value, validate) {
        if (
            (validate.indexOf('float') > -1)
            || (validate.indexOf('float_or_empty') > -1)
        ) {
            return numberWithCommasInputChange(value);
        }

        return value;
    }

    static updateAndValidateField(fields, name, newValue) {
        let clone = Object.assign({}, fields);
        clone[name].value = FieldsManager.formatValue(newValue, clone[name].validate);
        clone[name] = FieldsManager.validateField(clone[name]);
        return clone;
    }

    static validateFields(fields, list = []) {
        return Object.keys(fields)
            .reduce((memo, key) => {
                if (list.length === 0 || !!~list.indexOf(key)) {
                    memo[key] = FieldsManager.validateField(fields[key]);
                } else {
                    memo[key] = fields[key];
                }
                return memo;
            }, {});
    }

    static validateField(field) {
        const errorMessage = field.validate.reduce((memo, type) => {
            switch (type) {
                case 'empty':
                    if (!field.value) {
                        memo.push('fields.errors.empty');
                    }
                    break;
                case 'email':
                    if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gi.test(field.value)) {
                        memo.push('fields.errors.email');
                    }
                    break;
                case 'password':
                    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#\$%\^&\*]{8,}$/g.test(field.value)) {
                        memo.push('fields.errors.password');
                    }
                    break;
                case 'pin_four_digits':
                    if (!/^\d{4}$/g.test(field.value)) {
                        memo.push('fields.errors.pin_four_digits');
                    }
                    break;
                case 'date':
                    if (!field.value) {
                        // Just pass, empty is fine
                    } else if (!FieldsManager.checkDateFormat(field.value)) {
                        memo.push('fields.error.date_format');
                    }
                    break;
                case 'future_date':
                    if (!field.value) {
                        // Just pass, empty is fine
                    } else if (!FieldsManager.checkDateFormat(field.value)) {
                        memo.push('fields.error.date_format');
                    } else if (!FieldsManager.checkDateDigits(field.value)) {
                        memo.push('fields.error.date_format_digits');
                    } else if (!FieldsManager.isDateInTheFuture(field.value)) {
                        memo.push('fields.error.outdated_date');
                    }
                    break;
                case 'integer_or_empty':
                    if ((field.value !== "") && !/^[0-9]+$/g.test(field.value)) {
                        memo.push('fields.errors.integer');
                    }
                    break;
                case 'integer':
                    if (!/^[0-9]+$/g.test(field.value)) {
                        memo.push('fields.errors.integer');
                    }
                    break;
                case 'integer_up_to_100':
                    if ((field.value !== "") && (!/^[0-9]+$/g.test(field.value)) || (field.value > 100)) {
                        memo.push('fields.errors.integer_up_to_100');
                    }
                    break;
                case 'float_or_empty':
                    if ((field.value !== "") && !/\d+(\.\d+)?/g.test(field.value)) {
                        memo.push('fields.errors.float');
                    }
                    break;
                case 'float':
                    if (!/\d+(\.\d+)?/g.test(field.value)) {
                        memo.push('fields.errors.float');
                    }
                    break;
                case 'float_up_to_100':
                    if ((field.value !== "") && !/\d+(\.\d+)?/g.test(field.value)) {
                        memo.push('fields.errors.float_up_to_100');
                    } else if ((field.value !== "") && parseFloat(field.value) > 100) {
                        memo.push('fields.errors.float_up_to_100');
                    }
                    break;
                default:
                    break;
            }
            return memo;
        }, []);
        field.isEmpty = !field || !field.value || field.value.length === 0;

        return Object.assign({}, field, {
            errorMessage: errorMessage.length ? errorMessage : null
        });
    }

    static checkFieldsForErrors(fields, list = []) {
        return Object.keys(fields)
            .reduce((memo, key) => {
                if (list.length === 0 || !!~list.indexOf(key)) {
                    return memo && (!fields[key].errorMessage);
                } else {
                    return memo;
                }
            }, true);
    }

    static disableFields(fields, list = []) {
        return Object.keys(fields)
            .reduce((memo, key) => {
                if (list.length === 0 || !!~list.indexOf(key)) {
                    fields[key].disabled = true;
                    memo[key] = fields[key];
                } else {
                    memo[key] = fields[key];
                }
                return memo;
            }, {});
    }

    static checkDateFormat(dateString) {
        // First check for the pattern
        return /^\d{1,2} \/ \d{4}$/.test(dateString);
    }

    static checkDateDigits(dateString) {
        // Parse the date parts to integers
        const parts = dateString.split('/');
        const month = parseInt(parts[0].trim(), 10);
        const year = parseInt((parts[1].trim()), 10);

        // Check the ranges of month and year
        return !(year < 1000 || year > 3000 || month === 0 || month > 12);
    }

    static isDateInTheFuture(dateString) {
        const expDate = moment(dateString, 'MM / YYYY').toDate();
        const now = moment(moment().format('MM / YYYY'), 'MM / YYYY').toDate();
        return !((expDate - now) < 0);
    }

    static getFieldKeyValues(fields) {
        return Object.keys(fields)
            .reduce((memo, key) => {
                memo[key] = fields[key].value;
                return memo;
            }, {});
    }
}