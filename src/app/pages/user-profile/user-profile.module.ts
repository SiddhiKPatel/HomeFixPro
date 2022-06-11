import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { IncludeModule } from 'src/app/includes/include.module';
import {NgxSpinnerModule} from "ngx-spinner";
import { CameraModule } from '../camera/camera.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    IncludeModule,
    NgxSpinnerModule,
    CameraModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UserProfileModule { }
