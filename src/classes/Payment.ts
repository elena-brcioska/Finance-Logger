import { HasFormatter } from '../interfaces/HasFormatter.js'

export class Payment implements HasFormatter{

    constructor(
        readonly type: string,
        readonly recipient: string,
        readonly details: string,
        readonly amount: number,
        readonly time: string
    ){};

    format() {
        return `${this.recipient} is owed $${this.amount} for ${this.details}`
    }
}