// @flow
import * as R from "ramda";

export const isRequired = (value: any): boolean => typeof value !== "undefined" && value !== null && value !== ""; // is Required;
export const isInRange = R.curry<number, number, number, boolean>((min: number, max: number, value: number): boolean => value <= max && value >= min);
export const isValidZIP = (value: string): boolean => (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);
export const isValidPhone = (value: string = ""): boolean => value.replace(/[^0-9]/g, "").length === 7 || value.replace(/[^0-9]/g, "").length > 9;
export const isValidEmail = (value: string): boolean => (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i).test((value || "").trim());
export const isValidDate = (param: ?any): boolean => ((param || "invalid").toString() !== "Invalid Date" && (param instanceof Date));
export const isValidHexColor = (value: string): boolean => (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(value);
export const isInTeam = (teamMembers: Object, address: ?string): boolean => {
    const _email = (address || "").toLowerCase().trim();
    return Object
        .values(teamMembers || {})
        .map((teamMember: Object): string => (teamMember.email || "x").toLowerCase().trim())
        .indexOf(_email) > -1;
};
