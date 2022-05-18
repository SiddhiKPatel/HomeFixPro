import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientProfileRoutingModule } from './client-profile-routing.module';
import { ClientProfileComponent } from './client-profile.component';
import { IncludeModule } from 'src/app/includes/include.module';


@NgModule({
  declarations: [ClientProfileComponent],
  imports: [
    CommonModule,
    ClientProfileRoutingModule,
    IncludeModule
  ]
})
export class ClientProfileModule { }
