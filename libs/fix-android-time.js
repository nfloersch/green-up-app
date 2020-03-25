// @flow
import moment from "moment";

// android returns 24hr time with leading zero and no am/pm designation so
// we fix it up here to display consistently with ios
export const fixAndroidTime = (time: string): string => moment(time, "HH:mm:ss").format("h:mm");