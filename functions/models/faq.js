const deconstruct = require("./libs/deconstruct");

class FAQ {

    constructor(args) {
        this.id = (args || {}).id || null;
        this.question = (args || {}).question || "";
        this.answer = (args || {}).answer || "";
    }

    static create(args = {}) {

        return deconstruct(new FAQ(args));
    }
}

module.exports = FAQ;