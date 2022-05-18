import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstimatesRoutingModule } from './estimates-routing.module';
import { EstimatesComponent } from './estimates.component';
import { IncludeModule } from 'src/app/includes/include.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EstimatesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EstimatesRoutingModule,
    IncludeModule
  ]
})
export class EstimatesModule { }
