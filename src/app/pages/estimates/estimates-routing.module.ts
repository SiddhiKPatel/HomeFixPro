import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstimatesComponent } from './estimates.component';

const routes: Routes = [
  {
    path: '',
    component: EstimatesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstimatesRoutingModule { }
