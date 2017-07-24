// @flow

export function isDate(date) {
    return !isNaN(Date.parse(date));
}
