import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceSearchRoutingModule } from './service-search-routing.module';
import { ServiceSearchComponent } from './service-search.component';
import { IncludeModule } from 'src/app/includes/include.module';


@NgModule({
  declarations: [ServiceSearchComponent],
  imports: [
    CommonModule,
    ServiceSearchRoutingModule,
    IncludeModule
  ]
})
export class ServiceSearchModule { }
