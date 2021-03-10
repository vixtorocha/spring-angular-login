import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {RequestRegistration} from "./dto/request-registration";
import {ResponseData} from "./dto/response-data";

const httpOptions = {
  headers: new HttpHeaders(
      {
        'Content-Type' : 'application/json'
      }
  )
}

@Injectable()
export class AppService {

  authenticated = false;
  baseUrl = "http://localhost:8080/api/v1";
  registrationUrl = "/registration"
  loginUrl = "/login/user"

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {
    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get(this.baseUrl + this.loginUrl, {headers: headers}).subscribe(response => {
      if (response['name']) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });
  }

  register(requestRegistrationDTO: RequestRegistration): Observable<ResponseData> {
    return this.http.post<ResponseData>(
        this.baseUrl+this.registrationUrl,
        requestRegistrationDTO,
        httpOptions
    ).pipe(
        catchError(this.handleError)
    )
  }

  handleError(error) {
    let errorMessage = `Erro: ${error.error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
