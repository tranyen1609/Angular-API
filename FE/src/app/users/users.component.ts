import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/users/user.service';
import { UserData, Address, User } from '../../models/user';
import { CountryData } from '../../models/country';
import { CityData } from '../../models/city';
import { DistrictData } from '../../models/district';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userdata: UserData = new UserData();
  countryData: CountryData = new CountryData();
  cityData: CityData = new CityData();
  districtData: DistrictData = new DistrictData();
  newUser: string;
  newPass: string;
  newStreet: string;
  p = 1;
  totalItems: number;
  totalPages : number;
  idCountry = 0;
  idCity = 0;
  idDistrict = 0;
  formUsers: FormGroup;
  constructor(private http: Http, private router: Router, private userService: UserService, private fb: FormBuilder) { 
    this.formUsers = new FormGroup({
      Country: new FormControl()
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  pageChanged(page) {
    this.p = page;
    this.getUsers();
  }

  edit(id: number){
    this.router.navigate(['/detail/'+id]);
  }
  // setPage(i,event:any){
  //   event.preventDefault();
  //   this.currentPage = i+1;
  //   this.getUsers();
    
  // }

  // onPre(event:any){
  //   event.preventDefault();
  //   this.currentPage -= 1;
  //   this.getUsers();
  // }

  // onNext(event:any){
  //   event.preventDefault();
  //   this.currentPage += 1;
  //   this.getUsers();
  // }
  getCountries(){
    return this.userService.getCountries().subscribe(data => {
      this.countryData=data;
      
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

  getUsers() {
    return this.userService.getUsers(4,this.p).subscribe(data => {
      if(Object.keys(data).length > 0){
        this.userdata = data;
        this.totalItems = this.userdata.pagination.totalItems;
        this.totalPages = Math.ceil(this.totalItems/4);
        // this.pages = new Array(this.totalPages);
      }
      else
      {
        this.router.navigate(['login']);
      }
    });
  }

  createUser(){
    let user: User = new User( this.newUser,this.newPass );
    let address: Address = new Address(1,+this.idCountry,+this.idCity,+this.idDistrict,this.newStreet);
    let addresses: Array<Address>;
    return this.userService.createUser( user, Array(address) ).subscribe(data => {
        this.newUser="";
        this.newPass="";
        this.p = this.totalPages;
        alert(this.userdata.error.message);
        this.getUsers();
    });
  }

  deleteUser(id: number) {
    return this.userService.deleteUser(id).subscribe(data =>
      this.getUsers());
  }
}
