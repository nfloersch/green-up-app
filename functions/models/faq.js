const deconstruct = require("./libs/deconstruct");

class FAQ {

    constructor(args) {
        this.question = (args || {}).question || "";
        this.answer = (args || {}).answer || "";
        this.image = (args || {}).image || "";
        this.sortOrder = (args || {}).sortOrder || 0;

    }

    static create(args = {}) {
        return deconstruct(new FAQ(args));
    }
}

module.exports = FAQ;