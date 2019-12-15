import {
    getCurrentGreenUpDay,
    getGreenUpDayByYear,
    dateIsInCurrentEventWindow,
    daysUntilCurrentGreenUpDay
} from "../green-up-day-calucators";

const addDays = (date, days) => new Date(date).setDate(new Date(date).getDate() + days);

describe("getCurrentGreenUpDay", () => {
    it("returns this year's green up day if today if before Green Up Day", () => {
        const myGUDay = getCurrentGreenUpDay(new Date("2019-01-01").toUTCString());
        const expectedDateString = (new Date("2019-05-04T00:00:00.000Z")).toUTCString();
        expect(myGUDay.toUTCString()).toBe(expectedDateString);
    });
    it("returns the Green Up Day for next year if today is more than a week later than this year's Green Up Day", () => {
        const myGUDay = getCurrentGreenUpDay(new Date("2019-07-01").toUTCString());
        const expectedDateString = (new Date("2020-05-02T00:00:00.000Z")).toUTCString();
        expect(myGUDay.toUTCString()).toBe(expectedDateString);
    });
    it("returns this year's Green Up Day today less than a week later than this year's Green Up Day", () => {
        const myGUDay = getCurrentGreenUpDay(new Date("2019-05-07").toUTCString());
        const expectedDateString = (new Date("2019-05-04T00:00:00.000Z")).toUTCString();
        expect(myGUDay.toUTCString()).toBe(expectedDateString);
    });

});

describe("getGreenUpDayByYear", () => {
    it("returns the Green Up Day for the given year", () => {
        expect(getGreenUpDayByYear(2019).toUTCString()).toBe(new Date("2019-05-04T00:00:00.000Z").toUTCString());
    });
    it("returns the Green Up Day for a future year", () => {
        expect(getGreenUpDayByYear(2025).toUTCString()).toBe(new Date("2025-05-03T00:00:00.000Z").toUTCString());
    });
    it("returns the Green Up Day for a past year", () => {
        expect(getGreenUpDayByYear(2000).toUTCString()).toBe(new Date("2000-05-06T00:00:00.000Z").toUTCString());
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