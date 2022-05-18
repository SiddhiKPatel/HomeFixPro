import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyPostDetailsComponent } from './my-post-details.component';

const routes: Routes = [
  {
    path: '',
    component: MyPostDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPostDetailsRoutingModule { }
