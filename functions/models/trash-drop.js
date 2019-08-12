const Coordinates =require('./coordinates');
const validators = require('./validators');

class TrashDrop {

    constructor(args) {
        this.id = validators.isString(args.id) ? args.id : null;
        this.bagCount = typeof args.bagCount === 'number' ? args.bagCount : null;
        this.tags = Array.isArray(args.tags) ? args.tags.filter((tag) => typeof tag === 'string') : [];
        this.status = validators.isString(args.status) ? args.status : null;
        this.active = typeof args.active === 'boolean' ? args.active : true;
        this.location = Coordinates.create(args.location);
        this.created = validators.isValidDate(new Date(args.created)) ? new Date(args.created) : new Date();
        this.wasCollected = typeof args.wasCollected === 'boolean' ? args.wasCollected : false;
        this.createdBy = typeof args.createdBy === 'object' ? args.createdBy : null;
        this.collectedBy = typeof args.collectedBy === 'object' ? args.collectedBy : null;
    }

    static create(args = {}, id) {
        const _args = {...args};
        if (id) {
            _args.id = id;
        }
        return  JSON.parse(JSON.stringify(new TrashDrop(_args)));
    }
}

module.exports =  TrashDrop;