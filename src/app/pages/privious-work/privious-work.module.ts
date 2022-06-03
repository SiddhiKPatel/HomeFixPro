import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriviousWorkRoutingModule } from './privious-work-routing.module';
import { PriviousWorkComponent } from './privious-work.component';
import { IncludeModule } from 'src/app/includes/include.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [PriviousWorkComponent],
  imports: [
    CommonModule,
    PriviousWorkRoutingModule,
    IncludeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class PriviousWorkModule { }
