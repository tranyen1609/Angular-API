import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  a=true;
  title = 'FE';
  constructor(private location: Location) { }
  ngOnInit() {
    if (localStorage.getItem("token") == null) {
      this.a=false;
    }
    else{
      this.a=true;
    }
  }
}
