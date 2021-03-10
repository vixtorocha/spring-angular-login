import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {RequestRegistration} from "../dto/request-registration";
import {ResponseData} from "../dto/response-data";

@Component({
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {

  userInfo = {firstName: '', lastName: '', password: '', email:''};
  private registrationData : RequestRegistration;

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }

  registerUser() {
    this.registrationData = new RequestRegistration();
    this.registrationData.setFirstName(this.userInfo.firstName);
    this.registrationData.setLastName(this.userInfo.lastName);
    this.registrationData.setPassword(this.userInfo.password);
    this.registrationData.setEmail(this.userInfo.email);

    this.app.register(this.registrationData).subscribe((data: ResponseData) => {
      console.log("RESPONSE DATA "+JSON.stringify(data))
      if (data.responseCode == '200') {
        this.router.navigate(["/login"]);
      }
      window.alert(data.responseMsg);
    }), error => {
      console.log("An Error Occured "+error);
    };
  }

}
