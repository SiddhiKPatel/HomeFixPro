import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyEmailRoutingModule } from './verify-email-routing.module';
import { VerifyEmailComponent } from './verify-email.component';
import { IncludeModule } from 'src/app/includes/include.module';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [VerifyEmailComponent],
  imports: [
    CommonModule,
    VerifyEmailRoutingModule,
    IncludeModule,
    NgxSpinnerModule
  ]
})
export class VerifyEmailModule { }
