// @flow
import Location from "./location";
import { isValidDate } from "../libs/validators";

export default class FAQ {
    answer: ?string;
    image: ?number;
    question: ?string;
    sortOrder: ?boolean;

    constructor(args: Object) {
        this.answer = typeof args.answer === "string" ? args.id : null;
        this.image = typeof args.image === "number" ? args.image : null;
        this.question = typeof args.answer === "string" ? args.id : null;
        this.sortOrder = typeof args.sortOrder === "number" ? args.sortOrder : null;
    }

    static create(args: ?Object = {}, id?: string): FAQ {
        const _args = { ...args };
        if (Boolean(id)) {
            _args.id = id;
        }
        return JSON.parse(JSON.stringify(new FAQ(_args)));
    }
}