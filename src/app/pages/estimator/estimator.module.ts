import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstimatorRoutingModule } from './estimator-routing.module';
import { EstimatorComponent } from './estimator.component';
import { IncludeModule } from 'src/app/includes/include.module';


@NgModule({
  declarations: [EstimatorComponent],
  imports: [
    CommonModule,
    EstimatorRoutingModule,
    IncludeModule
  ]
})
export class EstimatorModule { }
