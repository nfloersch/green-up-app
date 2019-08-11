// @flow
// Green Up Day is always the first Saturday in May
export const getGreenUpDayByYear = year => {
    const mayFirst = new Date(`${year}-05-01T12:00:09.770Z`); // compensating for timezone
    const day = (`0${6 - mayFirst.getDay() + mayFirst.getDate()}`).slice(-2);
    return new Date(`${year}-05-${day}`);
};

const addDays = (date, days) => new Date(date).setDate(new Date(date).getDate() + days);

const currentYear = (new Date()).getYear() + 1900;

// Return the current year's GreenUp Day if we are within 7 days
export const getCurrentGreenUpDay = () => addDays(getGreenUpDayByYear(currentYear), 7) > new Date()
    ? getGreenUpDayByYear(currentYear)
    : getGreenUpDayByYear(currentYear + 1);