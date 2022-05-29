import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { EditProfileComponent } from './edit-profile.component';
import { IncludeModule } from 'src/app/includes/include.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [EditProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditProfileRoutingModule,
    NgSelectModule,
    IncludeModule,
    NgxSpinnerModule
  ]
})
export class EditProfileModule { }
