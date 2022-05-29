import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileRoutingModule } from './client-profile-routing.module';
import { ClientProfileComponent } from './client-profile.component';
import { IncludeModule } from 'src/app/includes/include.module';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [ClientProfileComponent],
  imports: [
    CommonModule,
    ClientProfileRoutingModule,
    IncludeModule,
    NgxSpinnerModule
  ]
})
export class ClientProfileModule { }
