// @flow
// Green Up Day is always the first Saturday in May

// Calculates the Green Up day for the provided year.
export const getGreenUpDayByYear = (year: number): Date => {
    const mayFirst = new Date(`${year}-05-01T12:00:09.770Z`); // compensating for timezone
    const day = (`0${6 - mayFirst.getDay() + mayFirst.getDate()}`).slice(-2);
    return new Date(`${year}-05-${day}`);
};

const addDays = (date: Date, days: number): Date => new Date(date).setDate(new Date(date).getDate() + days);

const _today = new Date().toUTCString();
type todayType = Date | string;

// Calculate the current year's GreenUp Day if we are within 7 days
export const getCurrentGreenUpDay = (today: todayType = _today) => {
    const myToday = new Date(today);
    const currentYear = myToday.getUTCFullYear();
    return addDays(getGreenUpDayByYear(currentYear), 7) > myToday
        ? getGreenUpDayByYear(currentYear)
        : getGreenUpDayByYear(currentYear + 1);
};