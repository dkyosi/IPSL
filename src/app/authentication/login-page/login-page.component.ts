import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';
import { passwordValidator } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup
  submitted: boolean = false
  loginProcessing: boolean = false;

  loginError: string = "";

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService,
    private mainService: MainService) {
    this.loginForm = this.formBuilder.group({
      emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), passwordValidator])],
      rememberMe: ['']
    })
  }

  ngOnInit() {
    if (localStorage.getItem("set")){
      let user = this.mainService.getRememberMeUser();
      this.loginForm.patchValue({
        emailAddress: user.emailAddress,
        password: user.password,
        rememberMe: true
      })
    }
  }

  get f() { return this.loginForm.controls }

  login() {

    this.submitted = true
    this.loginError = ""

    if (this.loginForm.invalid) {
      return
    }

    if(this.f.rememberMe.value){
      this.rememberMeCheck(this.f.emailAddress.value, this.f.password.value);
    } else{
      localStorage.removeItem("set")
    }

    this.loginProcessing = true

    let postData = {
      email: this.f.emailAddress.value,
      password: this.f.password.value
    }

    return this.authService.authServerCalls(postData, '/userapi/auth/login/ ').subscribe(results => {

      let data: any = results

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      this.loginProcessing = false

      this.router.navigate(['/main'])

    }, err => {
      this.loginProcessing = false;

      if (err.status == 400) {
        this.loginError = "You have entered incorrect email or password."
      } else {
        this.loginError = "Failed to communicate with the server. Please try again later."
      }

    })

  }

  rememberMeCheck(emailAddress:any, password:any){
    let user = {
      emailAddress: emailAddress,
      password: password
    }
    localStorage.setItem("set", this.mainService.encryptPassword(JSON.stringify(user)))
  }

}
