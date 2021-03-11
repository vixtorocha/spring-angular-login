import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AppService} from "../app.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  userName : any;
  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.userName = localStorage.getItem("userName");
  }

  logout() {
    this.appService.logout();
  }
}

