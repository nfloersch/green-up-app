const {isString, isValidDate} = require('./validators');
const Location = require('./location');
const TeamMember = require('./team-member');
const uuid = require('uuid');

// Green Up Day is always the first Saturday in May
const getGreenUpDayByYear = year => {
    const mayFirst = new Date(`${year}-05-01T12:00:09.770Z`); // compensating for timezone
    const day = (`0${6 - mayFirst.getDay() + mayFirst.getDate()}`).slice(-2);
    return new Date(`${year}-05-${day}`);
};

const addDays = (date, days) => new Date(date).setDate(new Date(date).getDate() + days);

const currentYear = (new Date()).getYear() + 1900;

// Return the current year's GreenUp Day if we are within 7 days
const getGreenUpDay = () => addDays(getGreenUpDayByYear(currentYear), 7) > new Date()
    ? getGreenUpDayByYear(currentYear)
    : getGreenUpDayByYear(currentYear + 1);


// TODO : Make this default date configurable on Firebase.
const defaultDate = getGreenUpDay();

class Team {
    constructor(args= {}) {
        this.id = isString(args.id) ? args.id : null;
        this.name = isString(args.name)
            ? args.name
            : null;
        this.town = isString(args.town)
            ? args.town
            : null;
        this.location = isString(args.location)
            ? args.location
            : null;
        this.description = isString(args.description)
            ? args.description
            : null;
        this.notes = isString(args.notes)
            ? args.notes
            : null;
        this.date = isString(args.date)
            ? args.date
            : defaultDate;
        this.start = isString(args.start)
            ? args.start
            : null;
        this.end = isString(args.end)
            ? args.end
            : null;
        this.active = typeof args.active === 'boolean'
            ? args.active
            : true;
        this.locations = Array.isArray(args.locations)
            ? args.locations.map((location) => Location.create(location))
            : [];
        this.isPublic = typeof args.isPublic === 'boolean'
            ? args.isPublic
            : true;
        this.created = isValidDate(new Date(args.created))
            ? new Date(args.created)
            : new Date();
        this.owner = TeamMember.create(args.owner);
        this.members = Object.keys(args.members || {})
            .map(key => TeamMember.create({...args.members[key], uid: key}))
            .reduce((obj, member) => ({...obj, [member.uid || uuid()]: member}), {});
    }

    static create(args= {}, id) {
        const _args = {...args};
        if (id) {
            _args.id = id;
        }
        return JSON.parse(JSON.stringify(new Team(_args)));
    }

}


module.exports = Team;