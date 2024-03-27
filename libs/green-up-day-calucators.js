// @flow

import moment from "moment";
// import { getReleaseEnvironment } from "./releaseEnvironment.js";

const addDays = (date: Date, days: number): number => new Date(date).setDate(new Date(date).getDate() + days);
type TodayType = Date | string;
// const envString = getReleaseEnvironment();

// Calculates the Green Up day for the provided year (in format YYYY)
export const getGreenUpDayByYear = (year: number): Date => {
    // In 2020 Green Up day was held on May 30th due to the covid19 outbreak
    if(year === 2020) {
        const guDay2020 = "2020-05-30";
        return moment(guDay2020).toDate();
    }
    // Otherwise, Green Up Day is always the first Saturday in May
    // Note: get the monday at the beginning of the provided week with .startOf("isoWeek")
    // see: https://momentjs.com/docs/#/manipulating/start-of/
    //const mondayBeforeGUDay = moment(`${year}-05-01`).startOf("isoWeek"); // Prior to 2022 this worked?
    let firstSaturdayInMay = {};
    const firstOfMay = moment(`${year}-05-01`);
    if (firstOfMay == moment().day("Saturday")) {
        firstSaturdayInMay = firstOfMay;
    }
    else {
        const mondayBeforeGUDay = moment(`${year}-05-01`).startOf("week");
        firstSaturdayInMay = mondayBeforeGUDay.add(6, "days");
    }
    return firstSaturdayInMay.toDate();
};

/**
 * Returns the next Green Up day. If today is Green Up day, it returns today.
 * @param today Date    An optional date used only by tests
 * @returns Date        Date of the next Green Up day
 */
export function getNextGreenUpDay(today?: Date): Date {
    const myToday = today === null ? moment() : moment(today);
    const thisYear = myToday.get("year");
    const is2020 = thisYear === 2020;

    // in 2020 GUDay was on May 30th
    if(is2020) {
        const guDay2020 = "2020-05-30";
        const isBeforeGreenUpDay = myToday.isBefore(guDay2020) || myToday.isSame(guDay2020, "day");
        return isBeforeGreenUpDay
            ? moment(guDay2020).toDate()
            : getGreenUpDayByYear(2021);
    }
    // otherwise it is always the first weekend of May
    const guDay: Date = getGreenUpDayByYear(thisYear);
    const isBeforeGUDay = myToday.isBefore(guDay) || myToday.isSame(guDay, "day");
    return isBeforeGUDay
        ? guDay
        : getGreenUpDayByYear(thisYear + 1);
}

/** Calculate the current year's GreenUp Day if we are within 7 days
 *  @param today Date    An optional date used only by tests
 */
export const getCurrentGreenUpDay = (today?: Date): Date => {
    const myToday = new Date(today || (new Date()).toUTCString());
    const currentYear = myToday.getUTCFullYear();
    return addDays(getGreenUpDayByYear(currentYear), 7) > myToday
        ? getGreenUpDayByYear(currentYear)
        : getGreenUpDayByYear(currentYear + 1);
};

/** Calculate days until next Green Up Day
 *  @param today TodayType  An optional date used only by tests
 */
export const daysUntilCurrentGreenUpDay = (today?: TodayType): number => {
    const myToday = today === null ? moment() : moment(today);
    const greenUpDay = moment(getNextGreenUpDay());
    // if (envString !== 'Prod') return 0;
    return greenUpDay.diff(myToday, "days");
};

// Determine if we're in the Event period, Thur, Fri, Green Up Day (Sat), Sun, Mon, or Tue
export const dateIsInCurrentEventWindow = (today?: TodayType): boolean => {
    return true;
    // const myToday = new Date(today || (new Date()).toUTCString());
    // const daysUntilGreenUpDay = daysUntilCurrentGreenUpDay(myToday);
    // if (envString !== 'Prod') return true;    
    // return daysUntilGreenUpDay <= 2 && daysUntilGreenUpDay >= -3;
};

export const greenUpWindowStart = () => moment(getCurrentGreenUpDay()).subtract(1, "days").toDate();
export const greenUpWindowEnd = () => moment(getCurrentGreenUpDay()).add(4, "days").toDate();

export const isInGreenUpWindow = (date: ?Date) => {
    return true;
    // const myDate = date || new Date();
    // const guws = greenUpWindowStart();
    // const guwe = greenUpWindowEnd();
    // const afterStart = myDate >= guws;
    // const beforeEnd = myDate <= guwe;
    // if (envString !== 'Prod') return true;
    // return afterStart && beforeEnd;
};

