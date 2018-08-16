import { Error } from './error';

export class DistrictData {
    districts: Districts[];
    error: Error;
    constructor() {
    }
}

export class Districts {
    id: number;
    name: string;
    cityId: number;
    constructor() {
    }
}