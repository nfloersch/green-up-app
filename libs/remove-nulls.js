// @flow
// removes keys with null values
export function removeNulls(obj: Object): Object {
    return Object.keys(obj)
        .filter((key: string): boolean => obj[key] !== null)
        .reduce((newObj: Object, key: string): Object => ({ ...newObj, [key]: obj[key] }), {});
}