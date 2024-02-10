import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { SiteComponent } from './site/site.component';
import { SupportComponent } from './support/support.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SiteComponent,
    SupportComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class LandingModule { }
