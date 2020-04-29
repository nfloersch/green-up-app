const deconstruct = require("./libs/deconstruct");

class ContactUs {

    constructor(args) {
        this.city = (args || {}).city || "";
        this.notes = (args || {}).notes || "";
        this.state = (args || {}).state || "";
        this.street = (args || {}).street || "";
        this.street2 = (args || {}).street2 || "";
        this.zip = (args || {}).zip || "";
        this.phoneNumber = (args || {}).phoneNumber || "";
    }

    static create(args = {}) {
        return deconstruct(new ContactUs(args));
    }
}


class EventSettings {

    constructor(args) {
        this.contactUs = ContactUs.create(args.contactUs);
        this.description = (args || {}).description || "";
        this.name = (args || {}).name || "";
        this.eventDate = (args || {}).eventDate || "";
        this.eventWindowStart = (args || {}).eventWindowStart || "";
        this.eventWindowEnd = (args || {}).eventWindowEnd || "";
    }

    static create(args = {}) {
        return deconstruct(new EventSettings(args));
    }
}

module.exports = EventSettings;