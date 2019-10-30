function deconstruct(object) {
    return JSON.parse(JSON.stringify(object));
}

module.exports = deconstruct;
