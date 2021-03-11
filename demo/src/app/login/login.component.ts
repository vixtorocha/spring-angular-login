import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import {RequestLogin} from "../dto/request-login";
import {ResponseData} from "../dto/response-data";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {

  credentials = {email: '', password: ''};
  private loginData : RequestLogin;

  constructor(private app: AppService, private router: Router) {
  }

  login() {
    this.loginData = new RequestLogin();
    this.loginData.setUserName(this.credentials.email)
    this.loginData.setPassword(this.credentials.password)

    this.app.authenticate(this.credentials).subscribe((data: ResponseData) => {
      console.log("RESPONSE DATA "+JSON.stringify(data))
      if (data.responseCode == '200') {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", this.loginData.getUserName());
        this.router.navigate(["/dashboard"]);
      }
      window.alert(data.responseMsg);
    }), error => {
      console.log("Ocorreu um erro "+ error);
    };
  }

}
