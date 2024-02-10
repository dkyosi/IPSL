import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private httpClient: HttpClient) { }

  authServerCalls(postData:any, url:any) {
    return this.httpClient.post(this.url + url, postData, this.httpOptions)
      .pipe(retry(0),
        catchError(this.handleError))
  }

  handleError(error:any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage:${error.message}`;
    }

    return throwError(error);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getUserData(){
    const user:any = localStorage.getItem('user')
    return JSON.parse(user)
  }

  comparePasswords(password:any, passwordConfirmation:any) {
    if (password != passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  }

}
