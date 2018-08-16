import { Component, OnInit } from '@angular/core';
import { UserAddress, Address } from '../../models/user';
import { CountryData } from '../../models/country';
import { CityData } from '../../models/city';
import { DistrictData } from '../../models/district';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  name: string = localStorage.getItem("user");
  myId: number;
  myUser: string;
  myPass: string;

  addressesDetail: UserAddress;
  addresses: Address[];
  address1: Address;
  myStreet: string;
  myAddressType: string;
  myDistrict: string;
  myCity: string;
  myCountry: string;
  countryData: CountryData = new CountryData();
  cityData: CityData = new CityData();
  districtData: DistrictData = new DistrictData();
  idCountry = 0;
  idCity = 0;
  idDistrict = 0;

  constructor(private location: Location, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getUserDetail();
  }

  

  getUserDetail() {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.userService.getUserFromId(id).subscribe(data => {
      if (Object.keys(data).length > 0) {
        this.addressesDetail = data[0];
        this.myId = id;
        this.myUser = this.addressesDetail.user.name;
        this.myPass = this.addressesDetail.user.password;
        this.addresses = this.addressesDetail.addresses;
        this.address1 = this.addressesDetail.addresses[0];
        
        this.idCountry = this.address1.countryId;
        this.idCity = this.address1.cityId;
        this.idDistrict = this.address1.districtId;
        this.myStreet = this.address1.street;
        
        this.getCountries();
      }
    });
  }

  getCountries(){
    return this.userService.getCountries().subscribe(data => {
      this.countryData=data;
      this.getCitiesFromId();
      console.log(this.idCity);
    });
  }

  getCitiesFromId(){
    return this.userService.getCitiesFromId(this.idCountry).subscribe(data => {
      this.cityData=data;
      this.idCity=0;
      this.idDistrict=0;
      this.getDistrictsFromId();
    });
  }

  getDistrictsFromId(){
    return this.userService.getDistrictsFromId(this.idCity).subscribe(data => {
      this.districtData=data;
    });
  }

  updateUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.userService.updateUser(id, this.myUser, this.myPass).subscribe(data =>
      this.router.navigate(['main']));
  }

  goBack() {
    this.location.back();
  }
}
