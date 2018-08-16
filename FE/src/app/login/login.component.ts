import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { User, UserData } from '../../models/user';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myName: string;
  myPassword: string;
  status: string = "";
  userdata: UserData = new UserData();
  constructor(private http: Http, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.VerifyAccess();
  }

  private VerifyAccess() {
    if (localStorage.getItem("user") != null) {
      this.router.navigate(['main']);
    }
  }

  loginUser() {
    //Tạo user truyền 2 tham số nhập vào
    let user: User = new User(this.myName, this.myPassword);
    //Gọi hàm loginUser truyền tham số vào và Subcribe là thực hiện các lệnh
    return this.userService.loginUser(user).subscribe(data => {
      this.userdata = data;
      localStorage.setItem("token", data["token"]);
      if (localStorage.getItem("token") != "") {
        localStorage.setItem("user", this.myName);
        this.router.navigate(['main']);
        window.location.reload();
      }
      else {
        this.status = this.userdata.error.message;
      }
    });
  }

}
