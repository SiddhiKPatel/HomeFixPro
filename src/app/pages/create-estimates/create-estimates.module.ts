import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEstimatesRoutingModule } from './create-estimates-routing.module';
import { CreateEstimatesComponent } from './create-estimates.component';
import { IncludeModule } from 'src/app/includes/include.module';


@NgModule({
  declarations: [CreateEstimatesComponent],
  imports: [
    CommonModule,
    CreateEstimatesRoutingModule,
    IncludeModule
  ]
})
export class CreateEstimatesModule { }
