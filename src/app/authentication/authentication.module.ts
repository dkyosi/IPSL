import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegistrationPageComponent,
    ResetPasswordPageComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
