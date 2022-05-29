import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OppurtunityDetailsRoutingModule } from './oppurtunity-details-routing.module';
import { OppurtunityDetailsComponent } from './oppurtunity-details.component';
import { IncludeModule } from 'src/app/includes/include.module';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [OppurtunityDetailsComponent],
  imports: [
    CommonModule,
    OppurtunityDetailsRoutingModule,
    IncludeModule,
    NgxSpinnerModule
  ]
})
export class OppurtunityDetailsModule { }
