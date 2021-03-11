import {Component, OnChanges, OnInit} from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{

  isLoggedIn$: Observable<boolean>;

  constructor(private app: AppService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.app.isLoggedIn;
  }

  onLogout(){
    this.app.logout();
  }
}
