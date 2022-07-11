import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { ProjectDetailsComponent } from './project-details.component';
import { IncludeModule } from 'src/app/includes/include.module';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxSpinnerModule} from "ngx-spinner";
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
  declarations: [ProjectDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectDetailsRoutingModule,
    IncludeModule,
    NgxSpinnerModule,
    NgxStarRatingModule
  ]
})
export class ProjectDetailsModule { }
