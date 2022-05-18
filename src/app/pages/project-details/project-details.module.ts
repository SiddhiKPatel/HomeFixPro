import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { ProjectDetailsComponent } from './project-details.component';
import { IncludeModule } from 'src/app/includes/include.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProjectDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectDetailsRoutingModule,
    IncludeModule
  ]
})
export class ProjectDetailsModule { }
