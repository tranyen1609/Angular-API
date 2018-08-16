import { Error } from './error';

export class CityData {
    cities: Cities[];
    error: Error;
    constructor() {
    }
}

export class Cities {
    id: number;
    name: string;
    countryId: number;
    constructor() {
    }
}