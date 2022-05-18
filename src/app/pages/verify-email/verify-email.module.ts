import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyEmailRoutingModule } from './verify-email-routing.module';
import { VerifyEmailComponent } from './verify-email.component';
import { IncludeModule } from 'src/app/includes/include.module';


@NgModule({
  declarations: [VerifyEmailComponent],
  imports: [
    CommonModule,
    VerifyEmailRoutingModule,
    IncludeModule
  ]
})
export class VerifyEmailModule { }
