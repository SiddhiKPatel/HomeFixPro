import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';
import { IncludeModule } from 'src/app/includes/include.module';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [ServiceComponent],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    IncludeModule,
    NgxSpinnerModule
  ]
})
export class ServiceModule { }
