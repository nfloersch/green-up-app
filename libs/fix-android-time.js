// @flow

// android returns 24hr time with leading zero and no am/pm designation so
// we fix it up here to display consistently with ios
export const fixAndroidTime = (time: string): string => {
    console.log("fixAndroidTime");
    const orig = time.split(":");
    const hour = orig[0];
    const hourNum = parseInt(hour, 10);
    const ampm = hourNum > 11 ? "PM" : "AM";
    const hr = hour[0] === "0" ? hour[1] : hourNum > 12 ? hourNum - 12 : hour; // TODO: Refactor this nested ternary :-(
    const result = `${ hr }:${ orig[1] }`;
    console.log("Result",result);
    return result;
};