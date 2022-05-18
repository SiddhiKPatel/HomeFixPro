import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobPostPageRoutingModule } from './job-post-page-routing.module';
import { JobPostPageComponent } from './job-post-page.component';
import { IncludeModule } from 'src/app/includes/include.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [JobPostPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JobPostPageRoutingModule,
    IncludeModule
  ]
})
export class JobPostPageModule { }
