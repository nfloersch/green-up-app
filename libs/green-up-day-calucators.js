// @flow
// Green Up Day is always the first Saturday in May

// Calculates the Green Up day for the provided year.
export const getGreenUpDayByYear = (year: number): Date => {
    const mayFirst = new Date(`${ year }-05-01T12:00:09.770Z`); // compensating for timezone
    const day = (`0${ 6 - mayFirst.getDay() + mayFirst.getDate() }`).slice(-2);
    return new Date(`${ year }-05-${ day }`);
};

const addDays = (date: Date, days: number): number => new Date(date).setDate(new Date(date).getDate() + days);

type TodayType = Date | string;

// Calculate the current year's GreenUp Day if we are within 7 days
export const getCurrentGreenUpDay = (today: ?TodayType): Date => {
    const myToday = new Date(today || (new Date()).toUTCString());
    const currentYear = myToday.getUTCFullYear();
    return addDays(getGreenUpDayByYear(currentYear), 7) > myToday
        ? getGreenUpDayByYear(currentYear)
        : getGreenUpDayByYear(currentYear + 1);
};

// Calculate days until Green Up Day
export const daysUntilCurrentGreenUpDay = (today?: TodayType): number => {
    const myToday = new Date(today || (new Date()).toUTCString());
    const greenUpDay = getCurrentGreenUpDay();
    const differenceInTime = greenUpDay.getTime() - myToday.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
};

// Determine if we're in the Event period, Thur, Fri, Green Up Day (Sat), Sun, Mon, or Tue
export const dateIsInCurrentEventWindow = (today?: TodayType): boolean => {
    const myToday = new Date(today || (new Date()).toUTCString());
    const daysUntilGreenUpDay = daysUntilCurrentGreenUpDay(myToday);
    return daysUntilGreenUpDay <= 2 && daysUntilGreenUpDay >= -3;
};
