import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OppurtunityDetailsComponent } from './oppurtunity-details.component';

const routes: Routes = [
  {
    path: '',
    component: OppurtunityDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OppurtunityDetailsRoutingModule { }
