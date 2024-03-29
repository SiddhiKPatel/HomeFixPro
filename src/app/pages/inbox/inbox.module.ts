import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncludeModule } from 'src/app/includes/include.module';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [InboxComponent],
  imports: [
    CommonModule,
    InboxRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IncludeModule,
    NgxSpinnerModule
  ]
})
export class InboxModule { }
