import { HasFormatter } from '../interfaces/HasFormatter.js'

export class Invoice implements HasFormatter{

    constructor(
        readonly type: string,
        readonly client: string,
        readonly details: string,
        readonly amount: number,
        readonly time: string
    ){};

    format() {
        return `${this.client} owes $${this.amount} for ${this.details}`
    }
}