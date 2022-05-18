import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OppurtunityComponent } from './oppurtunity.component';

const routes: Routes = [
  {
    path: '',
    component: OppurtunityComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OppurtunityRoutingModule { }
