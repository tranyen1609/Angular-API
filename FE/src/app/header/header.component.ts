import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: string = localStorage.getItem("user");
  idUser: number;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  logoutUser() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
    // this.router.navigate(['login']);
    
  }
}
