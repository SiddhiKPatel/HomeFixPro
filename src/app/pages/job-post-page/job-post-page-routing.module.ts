import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobPostPageComponent } from './job-post-page.component';

const routes: Routes = [
  {
    path: '',
    component: JobPostPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobPostPageRoutingModule { }
