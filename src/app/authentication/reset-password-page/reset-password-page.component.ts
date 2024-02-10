import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { passwordValidator } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {

  currentStage: string = "emailStage";

  emailForm: FormGroup;
  codeForm: FormGroup;
  passwordForm: FormGroup;
  submitted: boolean = false;

  emailProcessing: boolean = false;
  successMessage: string = "";
  errorMessage: string = "";

  codeProcessing: boolean = false;
  passwordProcessing: boolean = false;
  passwordsMatch: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.emailForm = this.formBuilder.group({
      emailAddress: ['', Validators.compose([Validators.required, Validators.email])]
    })

    this.codeForm = this.formBuilder.group({
      verificationCode: ['', Validators.compose([Validators.required])]
    })

    this.passwordForm = this.formBuilder.group({
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), passwordValidator])],
      passwordConfirmation: ['', Validators.compose([Validators.required, Validators.minLength(8), passwordValidator])]
    })

  }

  ngOnInit() {
  }

  get ef() { return this.emailForm.controls }
  get cf() { return this.codeForm.controls }
  get pf() { return this.passwordForm.controls }

  vaidateEmail() {
    this.submitted = true;
    this.successMessage = "";
    this.errorMessage = "";

    if (this.emailForm.invalid) {
      return;
    }

    this.emailProcessing = true;

    let postData = {
      email_address: this.ef.emailAddress.value
    }

    return this.authService.authServerCalls(postData, '/userapi/reset-password/').subscribe(results => {

      let data: any = results

      this.emailProcessing = false;

      this.successMessage = "Email address verified successfully.";

      setTimeout(() => {
        this.successMessage = "";
        this.submitted = false;
        this.currentStage = "codeVerification";
      }, 2000);


    }, err => {
      this.emailProcessing = false;

      if (err.status == 404) {
        this.errorMessage = "The email address was not found. Please try again.";
      } else {
        this.errorMessage = "Failed to verify email address. Please try again.";
      }

    })

  }

  resendCode(){
    this.successMessage = "";
    this.errorMessage = "";

    this.codeForm.reset();

    if (this.emailForm.invalid) {
      return;
    }

    this.codeProcessing = true;

    let postData = {
      email_address: this.ef.emailAddress.value
    }

    return this.authService.authServerCalls(postData, '/userapi/reset-password/').subscribe(results => {

      let data: any = results

      this.codeProcessing = false;

      this.successMessage = "Verification code has been resent successfully.";

      setTimeout(() => {
        this.successMessage = "";
        this.submitted = false;
      }, 3000);


    }, err => {
      this.codeProcessing = false;

      if (err.status == 404) {
        this.errorMessage = "The email address was not found. Please try again.";
      } else {
        this.errorMessage = "Failed to resend the verification code. Please try again.";
      }

    })
  }

  verifyCode() {
    this.submitted = true;
    this.successMessage = "";
    this.errorMessage = "";

    if (this.codeForm.invalid) {
      return;
    }

    this.codeProcessing = true;

    let postData = {
      email_address: this.ef.emailAddress.value,
      code: this.cf.verificationCode.value,
    }

    return this.authService.authServerCalls(postData, '/userapi/verify-code/').subscribe(results => {

      let data: any = results

      this.codeProcessing = false;

      this.successMessage = "Code verified successfully";

      setTimeout(() => {
        this.successMessage = "";
        this.submitted = false;
        this.currentStage = "passwordStage";
      }, 2000);


    }, err => {
      this.codeProcessing = false;

      if (err.status == 400) {
        this.errorMessage = "You have entered an incorrect code. Please try again.";
      } else if (err.status == 404) {
        this.errorMessage = "The email address entered was not found. Please try again.";
      } else {
        this.errorMessage = "Failed to verify the code. Please try again.";
      }

    })

  }

  setPassword() {
    this.submitted = true;
    this.successMessage = "";
    this.errorMessage = "";

    if (this.passwordForm.invalid) {
      return;
    }

    this.passwordProcessing = true;

    let postData = {
      email_address: this.ef.emailAddress.value,
      password: this.pf.newPassword.value
    }

    return this.authService.authServerCalls(postData, '/userapi/set-password/').subscribe(results => {

      let data: any = results

      this.passwordProcessing = false;

      this.successMessage = "Your password has been reset successfully.";

      setTimeout(() => {
        this.successMessage = "";
        this.router.navigate(['/auth/login'])
      }, 2500);


    }, err => {
      this.passwordProcessing = false;

      this.errorMessage = "Failed to reset your password. Please try again.";

    })

  }

  comparePasswords() {
    let password = this.pf.newPassword.value;
    let passConf = this.pf.passwordConfirmation.value;
    this.passwordsMatch = this.authService.comparePasswords(password, passConf);
  }

}
