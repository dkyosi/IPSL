import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
