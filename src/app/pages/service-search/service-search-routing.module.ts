import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceSearchComponent } from './service-search.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceSearchComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceSearchRoutingModule { }
