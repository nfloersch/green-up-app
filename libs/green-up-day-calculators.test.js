/* global describe expect it jest */
import React from "react";
import { getCurrentGreenUpDay, getGreenUpDayByYear } from "./green-up-day-calucators";

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