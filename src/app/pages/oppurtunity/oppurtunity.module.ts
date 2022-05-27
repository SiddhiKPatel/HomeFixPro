import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OppurtunityRoutingModule } from './oppurtunity-routing.module';
import { OppurtunityComponent } from './oppurtunity.component';
import { IncludeModule } from 'src/app/includes/include.module';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [OppurtunityComponent],
  imports: [
    CommonModule,
    OppurtunityRoutingModule,
    IncludeModule,
    NgxSpinnerModule
  ]
})
export class OppurtunityModule { }
