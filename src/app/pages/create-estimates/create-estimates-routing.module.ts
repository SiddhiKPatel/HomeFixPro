import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEstimatesComponent } from './create-estimates.component';

const routes: Routes = [
  {
    path: '',
    component: CreateEstimatesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEstimatesRoutingModule { }
