import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(private app: AppService) {
    }
}
