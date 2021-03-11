import {Component} from '@angular/core';
import { AppService } from './app.service';
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
