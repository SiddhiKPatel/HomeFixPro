import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { IncludeModule } from 'src/app/includes/include.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationRoutingModule,
    IncludeModule
  ]
})
export class NotificationModule { }
