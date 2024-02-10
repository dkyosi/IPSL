import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  url: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private httpClient: HttpClient) { }

  mainPostCalls(postData:any, url:any) {
    return this.httpClient.post(this.url + url, postData, this.httpOptions)
      .pipe(retry(0),
        catchError(this.handleError))
  }

  mainGetCalls(url:any) {
    return this.httpClient.get(this.url + url, this.httpOptions)
      .pipe(retry(0),
        catchError(this.handleError))
  }
  
  mainPutCalls(postData:any, url:any) {
    return this.httpClient.put(this.url + url, postData, this.httpOptions)
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

  getDebtStatus(code: number){
    if (code == 1){
      return 'Pending'
    } else if (code == 0){
      return 'Paid'
    } else if (code == 2){
      return 'Partially Paid'
    } else if (code == 3){
      return 'Not Published'
    }
    return
  }

  formatMsisdn(msisdn:any){
    if (msisdn.startsWith("+254")){
      return msisdn.replace("+254", "254");
    } else if (msisdn.startsWith("254")){
      return msisdn;
    } else if (msisdn.startsWith("07")){
      return msisdn.replace("07", "2547");
    } else if (msisdn.startsWith("7")){
      return msisdn.replace("7", "2547")
    } else{
      return msisdn;
    }
  }

  encryptPassword(password:any) {
    let _key = CryptoJS.enc.Utf8.parse("VoQgEGXj0aJkCWR2");
    let _iv = CryptoJS.enc.Utf8.parse("VoQgEGXj0aJkCWR2");
    let encrypted = CryptoJS.AES.encrypt(
      password, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });

    let decrypted = this.decryptUsingAES256(encrypted);

    return encrypted.toString();
  }

  decryptUsingAES256(encrypted:any) {
    let _key = CryptoJS.enc.Utf8.parse("VoQgEGXj0aJkCWR2");
    let _iv = CryptoJS.enc.Utf8.parse("VoQgEGXj0aJkCWR2");

    let decrypted = CryptoJS.AES.decrypt(
      encrypted, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);

    return decrypted;

  }

  getRememberMeUser(){
    let user = localStorage.getItem("set");
    if (user)
      return JSON.parse(this.decryptUsingAES256(user));
  }
}
