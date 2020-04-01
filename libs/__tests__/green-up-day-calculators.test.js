import moment from "moment";
import {
    getCurrentGreenUpDay,
    getGreenUpDayByYear,
    dateIsInCurrentEventWindow,
    daysUntilCurrentGreenUpDay
} from "../green-up-day-calucators";

const addDays = (date, days) => new Date(date).setDate(new Date(date).getDate() + days);

describe("getCurrentGreenUpDay", () => {
    it("returns this year's green up day if today if before Green Up Day", () => {
        const myGUDay = getCurrentGreenUpDay(new Date("2019-01-01"));
        const expectedDateString = moment("2019-05-04").toDate();
        expect(myGUDay).toMatchObject(expectedDateString);
    });
    it("returns the Green Up Day for next year if today is more than a week later than this year's Green Up Day", () => {
        const myGUDay = getCurrentGreenUpDay(new Date("2019-07-01"));
        const expectedDateString = moment("2020-05-30").toDate(); // remember 2020 changed due to covid-19
        expect(myGUDay).toMatchObject(expectedDateString);
    });
    it("returns this year's Green Up Day today less than a week later than this year's Green Up Day", () => {
        const myGUDay = getCurrentGreenUpDay(new Date("2019-05-07"));
        const expectedDateString = moment("2019-05-04").toDate();
        expect(myGUDay).toMatchObject(expectedDateString);
    });

});

describe("getGreenUpDayByYear", () => {
    it("returns the Green Up Day for the given year", () => {
        const gu2019 = getGreenUpDayByYear(2019);
        const expectedDateString = moment("2019-05-04").toDate();
        expect(gu2019).toMatchObject(expectedDateString);
    });
    it("returns the Green Up Day for a future year", () => {
        const gu2025 = getGreenUpDayByYear(2025);
        const expectedDateString = moment("2025-05-03").toDate();
        expect(gu2025).toMatchObject(expectedDateString);
    });
    it("returns the Green Up Day for a past year", () => {
        const gu2000 = getGreenUpDayByYear(2000);
        const expectedDateString = moment("2000-05-06").toDate();
        expect(gu2000).toMatchObject(expectedDateString);
    });
});

describe("daysUntilCurrentGreenUpDay", () => {
    it("returns zero on Green Up Day", () => {
        const guDay = getCurrentGreenUpDay();
        expect(daysUntilCurrentGreenUpDay(guDay)).toBe(0);
    });
    it("returns 1 the day before Green Up Day", () => {
        const guDay = getCurrentGreenUpDay();
        const daysBefore = addDays(guDay, -1);
        expect(daysUntilCurrentGreenUpDay(daysBefore)).toBe(1);
    });
    it("returns -1 the day after Green Up Day", () => {
        const guDay = getCurrentGreenUpDay();
        const daysBefore = addDays(guDay, 1);
        expect(daysUntilCurrentGreenUpDay(daysBefore)).toBe(-1);
    });
});

describe("dateIsInCurrentEventWindow", () => {
    it("return false for dates 3 or more days before Green Up Day", () => {
        const guDay = getCurrentGreenUpDay();
        const fakeToday = addDays(guDay, -3);
        expect(dateIsInCurrentEventWindow(fakeToday)).toBe(false);
    });
    it("return false for dates 4 or more days after Green Up Day", () => {
        const guDay = getCurrentGreenUpDay();
        const fakeToday = addDays(guDay, 4);
        expect(dateIsInCurrentEventWindow(fakeToday)).toBe(false);
    });
    it("return true for Green Up Day", () => {
        const guDay = getCurrentGreenUpDay();
        expect(dateIsInCurrentEventWindow(guDay)).toBe(true);
    });
    it("return true for dates 2 days or less before Green Up Day", () => {
        const guDay = getCurrentGreenUpDay();
        const fakeToday = addDays(guDay, -2);
        expect(dateIsInCurrentEventWindow(fakeToday)).toBe(true);
    });
    it("return true for dates 3 days or less after Green Up Day", () => {
        const guDay = getCurrentGreenUpDay();
        const fakeToday = addDays(guDay, 3);
        expect(dateIsInCurrentEventWindow(fakeToday)).toBe(true);
    });
});