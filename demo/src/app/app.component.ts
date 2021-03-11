import { Component } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private app: AppService, private http: HttpClient, private router: Router) {
    this.app.authenticate(undefined);
  }
    logout() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        this.router.navigate(["/login"]);
    }

}
