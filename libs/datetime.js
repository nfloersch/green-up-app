import { format } from 'date-fns';

const dateFormatting = 'EEEE, MMMM do, yyyy'; // Saturday, May 4th 2024
const timeFormatting = 'h:mm a'; // 9:00 AM

/*
* @param {Date} date
* @returns {string}
*/
const localeDate = (date) => {
    if (!(date instanceof Date)) {
        throw new Error("date must be a Date object");
    }
    return format(date, dateFormatting);
}

/*
* @param {Date} date
* @returns {string}
*/
const localeTime = (date) => {
    if (!(date instanceof Date)) {
        throw new Error("date must be a Date object");
    }
    return format(date, timeFormatting);
}

export { localeDate, localeTime }