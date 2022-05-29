import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstimatorRoutingModule } from './estimator-routing.module';
import { EstimatorComponent } from './estimator.component';
import { IncludeModule } from 'src/app/includes/include.module';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [EstimatorComponent],
  imports: [
    CommonModule,
    EstimatorRoutingModule,
    IncludeModule,
    NgxSpinnerModule
  ]
})
export class EstimatorModule { }
