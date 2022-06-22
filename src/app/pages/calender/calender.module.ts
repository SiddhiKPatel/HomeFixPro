import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalenderRoutingModule } from './calender-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncludeModule } from 'src/app/includes/include.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CalenderComponent } from './calender.component';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  declarations: [CalenderComponent],
  imports: [
    CommonModule,
    CalenderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IncludeModule,
    NgxSpinnerModule,
    CalendarModule
  ]
})
export class CalenderModule { }
