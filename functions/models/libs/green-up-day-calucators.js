// Green Up Day is always the first Saturday in May

// Calculates the Green Up day for the provided year.
const getGreenUpDayByYear = (year) => {
    const mayFirst = new Date(`${ year }-05-01T12:00:09.770Z`); // compensating for timezone
    const day = (`0${ 6 - mayFirst.getDay() + mayFirst.getDate() }`).slice(-2);
    return new Date(`${ year }-05-${ day }`);
};

const addDays = (date, days) => new Date(date).setDate(new Date(date).getDate() + days);

const _today = new Date().toUTCString();
type TodayType = Date | string;

// Calculate the current year's GreenUp Day if we are within 7 days
const getCurrentGreenUpDay = (today = _today) => {
    const myToday = new Date(today);
    const currentYear = myToday.getUTCFullYear();
    return addDays(getGreenUpDayByYear(currentYear), 7) > myToday
        ? getGreenUpDayByYear(currentYear)
        : getGreenUpDayByYear(currentYear + 1);
};


module.exports = { getCurrentGreenUpDay, getGreenUpDayByYear };
