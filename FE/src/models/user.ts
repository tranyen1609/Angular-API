import { Error } from './error';

export class UserData {
    users: User[];
    error: Error;
    pagination: Pagination;
}

export class UserAddress {
    user: User;
    addresses: Address[];
    constructor( u: User, a: Array<Address> ){
        this.user = u;
        this.addresses = a;
    }
}

export class User {
    id: number;
    name: string;
    password: string;
    constructor( name: string = "", password: string = "") {
        this.name = name;
        this.password = password;
    }
}

export class Address {
    id: number;
    addressTypeId: number;
    countryId: number;
    cityId: number;
    districtId: number;
    street: string;
    constructor(addresstypeid: number, countryid: number, cityid: number, districtid: number, st: string) {
        this.addressTypeId = addresstypeid;
        this.countryId = countryid;
        this.cityId = cityid;
        this.districtId = districtid;
        this.street = st;
    }
}


export class UserAddressesDetail {
    user: User;
    addresses: Array<AddressDetail>;
}
export class AddressDetail {
    street: string;
    addressType: string;
    district: string;
    city: string;
    country: string;

}

export class Pagination {
    totalItems: number;
    pageSize: number;
    pageNumber: number;
    constructor() {

    }
}







