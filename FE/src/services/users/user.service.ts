import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { User, UserAddress, Address } from '../../models/user';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5000/api/users';
  private apiLogin = 'http://localhost:5000/api/token';
  private apiCountry = 'http://localhost:5000/api/countries';
  private apiCity = 'http://localhost:5000/api/cities/country/';
  private apiDistrict = 'http://localhost:5000/api/districts/city/';
  private apiUserAddress = 'http://localhost:5000/api/Addresses';
  

  
  constructor( private http: Http, private router: Router ) {    }
  getCountries() {
    let options = {headers: new Headers( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    return this.http.get(this.apiCountry, options).pipe(
      map ( Response => Response.json() ),
      catchError(error) );
  }

  getCitiesFromId(id: number) {
    let options = {headers: new Headers( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= this.apiCity + id;
    return this.http.get(url, options).pipe(
      map ( Response => Response.json() ),
      catchError(error) );
  }

  getDistrictsFromId(id: number) {
    let options = {headers: new Headers( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= this.apiDistrict + id;
    return this.http.get(url, options).pipe(
      map ( Response => Response.json() ),
      catchError(error) );
  }

  loginUser(user) {
    //Gửi về server cần có Headers và RequestOptions
    //C1:
    //let header1 = new Headers( { 'Content-Type': 'application/json' } );
    //let options = new RequestOptions({headers: header1});
    //C2:
    let options = {headers: new Headers( { 'Content-Type': 'application/json' } )};
    //Sử dụng post truyền dữ liệu xuống Server, tham số của post cần: link api, tài khoản login và options
    return this.http.post(this.apiLogin, user, options)
    //Nếu có kết quả sẽ map kết quả thành json, ngược lại sẽ xuất lỗi
      .pipe(map ( Response => Response.json() ),
          catchError(error) );
  }

  getUsers(pS: number, pN: number) {
    let options = {headers: new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUrl) + '/page?size=' + pS + '&current=' + pN ;
    return this.http.get(url, options).pipe(
      map ( Response => Response.json() ),
      catchError(error) );
  }

  getUserFromId(id: number) {
    let options = {headers: new Headers( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUserAddress) + '/user/' + (id);
    return this.http.get(url, options).pipe(
      map ( Response => Response.json() ),
      catchError(error) );
  }

  deleteUser (id: number) {
    let options = {headers: new Headers( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUrl) + '/' + (id);
    return this.http.delete(url, options).pipe(
      map ( Response => Response.json() ),
      catchError(error) );
  }

  updateUser (id: number, username: string, pass: string) {
    let user: User = new User( username, pass);
    const url= (this.apiUrl) + '/' + (id);
    let options = {headers: new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    console.log(user);
    return this.http.put(url, user, options).pipe(
      map ( Response => Response.json() ),
      catchError(error) );
  }

  // createUser (username: string, pass: string) {
  //   let user: User = new User( username, pass );
  //   let options = {headers: new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
  //   return this.http.post(this.apiUrl, user, options).pipe(
  //     map ( Response => Response.json() ),
  //     catchError(error) );
  // }
  createUser (u: User, a: Array<Address>) {
    let useradd: UserAddress = new UserAddress( u, a );
    let options = {headers: new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    return this.http.post(this.apiUserAddress, useradd, options).pipe(
      map ( Response => Response.json() ),
      catchError(error) );
  }
}
