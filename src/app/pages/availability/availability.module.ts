import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailabilityRoutingModule } from './availability-routing.module';
import { AvailabilityComponent } from './availability.component';
import { IncludeModule } from 'src/app/includes/include.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [AvailabilityComponent],
  imports: [
    CommonModule,
    AvailabilityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IncludeModule,
    NgxSpinnerModule
  ]
})
export class AvailabilityModule { }
