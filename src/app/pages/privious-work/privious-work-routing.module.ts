import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriviousWorkComponent } from './privious-work.component';

const routes: Routes = [
  {
    path: '',
    component: PriviousWorkComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriviousWorkRoutingModule { }
