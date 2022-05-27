import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetailsRoutingModule } from './service-details-routing.module';
import { ServiceDetailsComponent } from './service-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncludeModule } from 'src/app/includes/include.module';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [ServiceDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceDetailsRoutingModule,
    IncludeModule,
    NgxSpinnerModule
  ]
})
export class ServiceDetailsModule { }
