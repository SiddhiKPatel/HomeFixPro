import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateSolutionComponent } from './user-create-solution.component';

const routes: Routes = [
  {
    path: '',
    component: UserCreateSolutionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCreateSolutionRoutingModule { }
