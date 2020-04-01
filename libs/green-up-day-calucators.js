// @flow

import moment from "moment";

const addDays = (date: Date, days: number): number => new Date(date).setDate(new Date(date).getDate() + days);
type TodayType = Date | string;

/**
 * Returns the next Green Up day. If today is Green Up day, it returns today.
 */
export function getNextGreenUpDay() {
    const today = moment();
    const thisYear = today.get('year');
    const is2020 = thisYear === 2020;
    
    // in 2020 GUDay was on May 30th
    if(is2020){
        const guDay2020 = '2020-05-30';
        const isBeforeGreenUpDay = today.isBefore(guDay2020) || today.isSame(guDay2020, 'day')
        return isBeforeGreenUpDay
            ? moment(guDay2020).toDate()
            : getGreenUpDayByYear(2021);
    }
    // otherwise it is always the first weekend of May
    else {
        const guDay = getGreenUpDayByYear(thisYear);
        const isBeforeGUDay = today.isBefore(guDay) || today.isSame(guDay, 'day')
        return isBeforeGUDay
            ? guDay.toDate()
            : getGreenUpDayByYear(2021);
    }        
}

// Calculates the Green Up day for the provided year (in format YYYY)
export const getGreenUpDayByYear = (year: number): Date => {
    // In 2020 Green Up day was held on May 30th due to the covid19 outbreak
    if(year === 2020){
        const guDay2020 = '2020-05-30';
        return moment(guDay2020).toDate();
    } 
    // Otherwise, Green Up Day is always the first Saturday in May
    else {
        // get the monday at the beginning of the provided week with .startOf('isoWeek') 
        // see: https://momentjs.com/docs/#/manipulating/start-of/
        const mondayBeforeGUDay = moment(`${year}-05-01`).startOf('isoWeek');
        const firstSaturdayInMay = mondayBeforeGUDay.add(5, 'days');
        return firstSaturdayInMay.toDate();
    }
};

/** Calculate the current year's GreenUp Day if we are within 7 days
 *  @param today An optional date used only by tests
 */
export const getCurrentGreenUpDay = (today?: Date): Date => {
    const myToday = new Date(today || (new Date()).toUTCString());
    const currentYear = myToday.getUTCFullYear();
    return addDays(getGreenUpDayByYear(currentYear), 7) > myToday
        ? getGreenUpDayByYear(currentYear)
        : getGreenUpDayByYear(currentYear + 1);
};

/** Calculate days until next Green Up Day
 *  @param today An optional date used only by tests
 */
export const daysUntilCurrentGreenUpDay = (today?: TodayType): number => {
    const myToday = today == null ? moment() : moment(today);
    const greenUpDay = moment(getNextGreenUpDay());
    return greenUpDay.diff(myToday, 'days');
};

// Determine if we're in the Event period, Thur, Fri, Green Up Day (Sat), Sun, Mon, or Tue
export const dateIsInCurrentEventWindow = (today?: TodayType): boolean => {
    const myToday = new Date(today || (new Date()).toUTCString());
    const daysUntilGreenUpDay = daysUntilCurrentGreenUpDay(myToday);
    return daysUntilGreenUpDay <= 2 && daysUntilGreenUpDay >= -3;
};

export const greenUpWindowStart = () => moment(getCurrentGreenUpDay()).subtract(1, "days").toDate();
export const greenUpWindowEnd = () => moment(getCurrentGreenUpDay()).add(4, "days").toDate();

export const isInGreenUpWindow = (date: ?Date) => {
    const myDate = date || new Date();
    return myDate >= greenUpWindowStart() && myDate <= greenUpWindowEnd();
};

