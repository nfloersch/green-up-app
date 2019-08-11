// @flow
const R = require('ramda');

const isInRange = R.curry((min: number, max: number, value: number) => value <= max && value >= min);
const isInTeam = (teamMembers: Object, email: string) => Object.values(teamMembers || {}).map(teamMember => (teamMember.email || 'x').toLowerCase().trim()).indexOf(email.toLowerCase().trim()) > -1;
const isRequired = (value: any) => typeof value !== 'undefined' && value !== null && value !== ''; // is Required;
const isString = (myString: any): Boolean => typeof myString === 'string';
const isValidDate = (param: any): boolean => ((param || 'invalid').toString() !== 'Invalid Date' && (param instanceof Date));
const isValidEmail = (value: string) => (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i).test(value);
const isValidHexColor = (value: string) => (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(value);
const isValidPhone = (value: string = '') => value.replace(/[^0-9]/g, '').length === 7 || value.replace(/[^0-9]/g, '').length > 9;
const isValidZIP = (value: string) => (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);

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