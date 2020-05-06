const R = require("ramda");
const isInRange = R.curry((min, max, value) => value <= max && value >= min);
const isInTeam = (teamMembers, email) => Object.values(teamMembers || {}).map(teamMember => (teamMember.email || "x").toLowerCase().trim()).indexOf(email.toLowerCase().trim()) > -1;
const isRequired = value => typeof value !== "undefined" && value !== null && value !== ""; // is Required;
const isString = myString => typeof myString === "string";
const isValidDate = param => (new Date(param || "invalid")).toString() !== "Invalid Date";
const isValidEmail = value => (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i).test(value);
const isValidHexColor = value => (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(value);
const isValidPhone = (value = "") => value.replace(/[^0-9]/g, "").length === 7 || value.replace(/[^0-9]/g, "").length > 9;
const isValidZIP = value => (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);

module.exports = {
    isString,
    isRequired,
    isValidDate,
    isValidEmail,
    isValidHexColor,
    isInRange,
    isInTeam,
    isValidPhone,
    isValidZIP
};