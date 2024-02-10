import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteComponent } from './site/site.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  { path: '', component: SiteComponent },
  { path: 'support', component: SupportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
