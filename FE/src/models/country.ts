import { Error } from './error';

export class CountryData {
    countries: Countries[];
    error: Error;
    constructor() {
    }
}

export class Countries {
    id: number;
    name: string;
    constructor() {
    }
}