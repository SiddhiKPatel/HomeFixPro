import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetailsRoutingModule } from './service-details-routing.module';
import { ServiceDetailsComponent } from './service-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncludeModule } from 'src/app/includes/include.module';


@NgModule({
  declarations: [ServiceDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceDetailsRoutingModule,
    IncludeModule
  ]
})
export class ServiceDetailsModule { }
