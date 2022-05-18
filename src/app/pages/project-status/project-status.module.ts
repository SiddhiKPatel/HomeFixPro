import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectStatusRoutingModule } from './project-status-routing.module';
import { ProjectStatusComponent } from './project-status.component';
import { IncludeModule } from 'src/app/includes/include.module';


@NgModule({
  declarations: [ProjectStatusComponent],
  imports: [
    CommonModule,
    ProjectStatusRoutingModule,
    IncludeModule
  ]
})
export class ProjectStatusModule { }
