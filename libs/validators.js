// @flow
import { curry } from "ramda";

export const isRequired = (value: any) => typeof value !== "undefined" && value !== null && value !== ""; // is Required;
export const isInRange = curry((min: number, max: number, value: number) => value <= max && value >= min);
export const isValidZIP = (value: string) => (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);
export const isValidPhone = (value: string = "") => value.replace(/[^0-9]/g, "").length === 7 || value.replace(/[^0-9]/g, "").length > 9;
export const isValidEmail = (value: string) => (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i).test(value);
export const isValidDate = (param: any): boolean => ((param || "invalid").toString() !== "Invalid Date" && (param instanceof Date));
export const isValidHexColor = (value: string) => (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(value);
export function isInTeam(teamMembers: Object, address: string) {
    const _email = address.toLowerCase().trim();
    return Object.values(teamMembers || {}).map(teamMember => (teamMember.email || "x").toLowerCase().trim()).indexOf(_email) > -1;
}
