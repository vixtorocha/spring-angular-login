import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {RequestRegistration} from "./dto/request-registration";
import {ResponseData} from "./dto/response-data";
import {Router} from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders(
      {
        'Content-Type' : 'application/json',
      }
  )
}

@Injectable()
export class AppService {

  authenticated = false;
  baseUrl = "http://localhost:8080/api/v1";
  registrationUrl = "/registration"
  loginUrl = "/auth/login"
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    this.loggedIn.next(false);
    this.router.navigate(["/login"]);
  }

  authenticate(requestLoginDTO): Observable<ResponseData> {
    return this.http.post<ResponseData>(
        this.baseUrl+this.loginUrl,
        JSON.stringify(requestLoginDTO),
        httpOptions
    ).pipe(
      map(res => {
        if(res.responseCode == "200"){
          this.loggedIn.next(true);
        }
        return res
      }),
        catchError(() => {
          this.loggedIn.next(false);
          return this.handleError
        })
    )
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
